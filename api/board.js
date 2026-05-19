// Vercel Serverless Function: /api/board
// Handles GET (list), POST (submit), PATCH (like)
import { neon } from "@neondatabase/serverless";

function getDb() {
  const url = process.env.POSTGRES_URL;
  if (!url) throw new Error("POSTGRES_URL not set");
  return neon(url);
}

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const sql = getDb();

  try {
    // ── GET: list all requests sorted by likes desc ──────────────────────
    if (req.method === "GET") {
      const rows = await sql`
        SELECT id, ticker, company_name, reason, author_name, likes,
               created_at::text AS created_at
        FROM stock_requests
        ORDER BY likes DESC, created_at DESC
        LIMIT 100
      `;
      return res.status(200).json({ ok: true, data: rows });
    }

    // ── POST: submit new request ─────────────────────────────────────────
    if (req.method === "POST") {
      const { ticker, companyName, reason, authorName } = req.body || {};
      if (!ticker || !authorName) {
        return res.status(400).json({ ok: false, message: "ticker 和 authorName 为必填项" });
      }
      const clean = (s) => (s || "").toString().trim().slice(0, 500);
      const rows = await sql`
        INSERT INTO stock_requests (ticker, company_name, reason, author_name)
        VALUES (
          ${clean(ticker).toUpperCase().slice(0, 20)},
          ${clean(companyName).slice(0, 200) || null},
          ${clean(reason) || null},
          ${clean(authorName).slice(0, 100)}
        )
        RETURNING id, ticker, company_name, reason, author_name, likes, created_at::text AS created_at
      `;
      return res.status(201).json({ ok: true, data: rows[0] });
    }

    // ── PATCH: like a request ────────────────────────────────────────────
    if (req.method === "PATCH") {
      const { requestId, fingerprint } = req.body || {};
      if (!requestId || !fingerprint) {
        return res.status(400).json({ ok: false, message: "requestId 和 fingerprint 为必填项" });
      }

      // Check duplicate
      const existing = await sql`
        SELECT id FROM stock_request_likes
        WHERE request_id = ${requestId} AND fingerprint = ${fingerprint.slice(0, 128)}
      `;
      if (existing.length > 0) {
        return res.status(200).json({ ok: false, message: "已点赞" });
      }

      // Insert like record
      await sql`
        INSERT INTO stock_request_likes (request_id, fingerprint)
        VALUES (${requestId}, ${fingerprint.slice(0, 128)})
        ON CONFLICT DO NOTHING
      `;

      // Increment counter
      const updated = await sql`
        UPDATE stock_requests
        SET likes = likes + 1
        WHERE id = ${requestId}
        RETURNING likes
      `;

      return res.status(200).json({ ok: true, likes: updated[0]?.likes ?? 0 });
    }

    return res.status(405).json({ ok: false, message: "Method not allowed" });
  } catch (err) {
    console.error("[board API error]", err);
    return res.status(500).json({ ok: false, message: err.message });
  }
}
