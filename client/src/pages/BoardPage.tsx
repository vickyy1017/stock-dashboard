import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { ThumbsUp, ExternalLink, Send, TrendingUp, RefreshCw } from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────
interface StockRequest {
  id: string;
  ticker: string;
  companyName: string;
  reason: string;
  authorName: string;
  likes: number;
  createdAt: number;
}

// ── Persistence helpers (localStorage) ────────────────────────────────────
const STORAGE_KEY = "stock_requests_v1";
const LIKED_KEY   = "stock_liked_v1";
const FP_KEY      = "stock_fp_v1";

function getFingerprint(): string {
  let fp = localStorage.getItem(FP_KEY);
  if (!fp) {
    fp = Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem(FP_KEY, fp);
  }
  return fp;
}

function loadRequests(): StockRequest[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveRequests(reqs: StockRequest[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reqs));
}

function getLikedSet(): Set<string> {
  try {
    const raw = localStorage.getItem(LIKED_KEY);
    return new Set(raw ? JSON.parse(raw) : []);
  } catch { return new Set(); }
}

function addLiked(id: string) {
  const s = getLikedSet();
  s.add(id);
  localStorage.setItem(LIKED_KEY, JSON.stringify(Array.from(s)));
}

// ── Component ──────────────────────────────────────────────────────────────
export default function BoardPage() {
  const [requests, setRequests] = useState<StockRequest[]>([]);
  const [likedSet, setLikedSet] = useState<Set<string>>(new Set());
  const [form, setForm] = useState({ ticker: "", companyName: "", reason: "", authorName: "" });
  const [submitting, setSubmitting] = useState(false);

  const refresh = useCallback(() => {
    const reqs = loadRequests().sort((a, b) => b.likes - a.likes || b.createdAt - a.createdAt);
    setRequests(reqs);
    setLikedSet(getLikedSet());
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.ticker.trim() || !form.authorName.trim()) {
      toast.error("股票代码和你的名字是必填项");
      return;
    }
    setSubmitting(true);
    const newReq: StockRequest = {
      id: Math.random().toString(36).slice(2) + Date.now().toString(36),
      ticker: form.ticker.trim().toUpperCase(),
      companyName: form.companyName.trim(),
      reason: form.reason.trim(),
      authorName: form.authorName.trim(),
      likes: 0,
      createdAt: Date.now(),
    };
    const updated = [newReq, ...loadRequests()];
    saveRequests(updated);
    setForm({ ticker: "", companyName: "", reason: "", authorName: "" });
    toast.success("申请已提交！感谢你的建议 🎉");
    setSubmitting(false);
    refresh();
  };

  const handleLike = (id: string) => {
    if (likedSet.has(id)) { toast.info("你已经点赞过了"); return; }
    const reqs = loadRequests().map(r => r.id === id ? { ...r, likes: r.likes + 1 } : r);
    saveRequests(reqs);
    addLiked(id);
    refresh();
    toast.success("点赞成功！");
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 rounded-sm bg-blue-500" />
          <div>
            <h2 className="text-lg font-bold text-zinc-100">股票申请留言板</h2>
            <p className="text-xs text-zinc-500 mt-0.5">想看哪只股票的分析？在这里提交申请，点赞支持你最想要的！</p>
          </div>
        </div>
        <button onClick={refresh} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700 text-xs text-zinc-400 hover:text-zinc-200 transition-colors">
          <RefreshCw size={12} /> 刷新
        </button>
      </div>

      {/* Submit form */}
      <form onSubmit={handleSubmit} className="bg-zinc-900 border border-zinc-700 rounded-2xl p-5 mb-6">
        <div className="text-sm font-semibold text-zinc-200 mb-4 flex items-center gap-2">
          <TrendingUp size={16} className="text-blue-400" />
          提交新的股票申请
        </div>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="text-xs text-zinc-500 mb-1 block">股票代码 <span className="text-red-400">*</span></label>
            <input
              value={form.ticker}
              onChange={e => setForm(p => ({ ...p, ticker: e.target.value.toUpperCase() }))}
              placeholder="例如：NVDA"
              maxLength={20}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-blue-500 transition-colors uppercase"
            />
          </div>
          <div>
            <label className="text-xs text-zinc-500 mb-1 block">公司名称（可选）</label>
            <input
              value={form.companyName}
              onChange={e => setForm(p => ({ ...p, companyName: e.target.value }))}
              placeholder="例如：NVIDIA Corporation"
              maxLength={200}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>
        <div className="mb-3">
          <label className="text-xs text-zinc-500 mb-1 block">申请理由（可选）</label>
          <textarea
            value={form.reason}
            onChange={e => setForm(p => ({ ...p, reason: e.target.value }))}
            placeholder="为什么想分析这只股票？有什么特别关注的点？"
            maxLength={1000}
            rows={2}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-blue-500 transition-colors resize-none"
          />
        </div>
        <div className="flex gap-3 items-end">
          <div className="flex-1">
            <label className="text-xs text-zinc-500 mb-1 block">你的名字 <span className="text-red-400">*</span></label>
            <input
              value={form.authorName}
              onChange={e => setForm(p => ({ ...p, authorName: e.target.value }))}
              placeholder="昵称或真名"
              maxLength={100}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-700 disabled:text-zinc-500 text-white rounded-lg text-sm font-semibold transition-all active:scale-95"
          >
            <Send size={14} />
            {submitting ? "提交中..." : "提交申请"}
          </button>
        </div>
      </form>

      {/* List */}
      <div className="space-y-3">
        {requests.length === 0 ? (
          <div className="text-center py-16 text-zinc-600">
            <TrendingUp size={40} className="mx-auto mb-3 opacity-30" />
            <div className="text-sm">还没有申请，成为第一个！</div>
          </div>
        ) : (
          requests.map((req, i) => {
            const hasLiked = likedSet.has(req.id);
            return (
              <div key={req.id}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex items-start gap-4 hover:border-zinc-700 transition-colors">
                <div className="text-2xl font-black text-zinc-700 w-8 text-center shrink-0 mt-0.5">{i + 1}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-base font-black text-blue-400">{req.ticker}</span>
                    {req.companyName && <span className="text-xs text-zinc-400">{req.companyName}</span>}
                    <a
                      href={`https://www.tradingview.com/chart/?symbol=${req.ticker}`}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-zinc-500 hover:text-blue-400 transition-colors"
                    >
                      <ExternalLink size={11} /> TradingView
                    </a>
                  </div>
                  {req.reason && <p className="text-xs text-zinc-400 leading-relaxed mb-2">{req.reason}</p>}
                  <div className="flex items-center gap-2 text-xs text-zinc-600">
                    <span>by {req.authorName}</span>
                    <span>·</span>
                    <span>{new Date(req.createdAt).toLocaleDateString("zh-CN")}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleLike(req.id)}
                  className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl border transition-all active:scale-95 shrink-0 ${
                    hasLiked
                      ? "bg-blue-950 border-blue-700 text-blue-400 cursor-default"
                      : "bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-blue-600 hover:text-blue-400"
                  }`}
                >
                  <ThumbsUp size={14} className={hasLiked ? "fill-blue-400" : ""} />
                  <span className="text-xs font-bold">{req.likes}</span>
                </button>
              </div>
            );
          })
        )}
      </div>

      <div className="mt-6 p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl text-xs text-zinc-600 leading-relaxed">
        💡 留言数据保存在你的浏览器本地存储中。每位访客看到的是自己提交的申请记录。
      </div>
    </div>
  );
}
