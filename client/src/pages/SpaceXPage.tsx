import { useState, useMemo } from "react";
import { ExternalLink, Rocket } from "lucide-react";
import { SPACEX_STOCKS, SPACEX_TICKER_ORDER, getSpaceXScoreColor } from "@/lib/spacexData";
import { getRatingStyle, getPatternClass } from "@/lib/stockData";

function tvUrl(ticker: string) {
  return `https://www.tradingview.com/chart/?symbol=${ticker}`;
}

function PatternTag({ pattern }: { pattern: string }) {
  const cls = getPatternClass(pattern);
  const styles: Record<string, string> = {
    cup:      "bg-yellow-950 text-yellow-300 border-yellow-700/40",
    flat:     "bg-green-950 text-green-300 border-green-700/40",
    breakout: "bg-orange-950 text-orange-300 border-orange-700/40",
    pullback: "bg-purple-950 text-purple-300 border-purple-700/40",
    vcp:      "bg-cyan-950 text-cyan-300 border-cyan-700/40",
    none:     "bg-zinc-900 text-zinc-400 border-zinc-700/40",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold border ${styles[cls]}`}>
      {pattern}
    </span>
  );
}

function MetricCard({ label, value, sub, valueClass }: { label: string; value: string; sub?: string; valueClass?: string }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
      <div className="text-xs text-zinc-500 mb-1.5">{label}</div>
      <div className={`text-xl font-bold ${valueClass ?? "text-zinc-100"}`}>{value}</div>
      {sub && <div className="text-xs text-zinc-500 mt-1">{sub}</div>}
    </div>
  );
}

function StockDetail({ ticker }: { ticker: string }) {
  const [tf, setTf] = useState<"daily" | "weekly">("daily");
  const [tab, setTab] = useState<"fundamental" | "technical">("fundamental");
  const d = SPACEX_STOCKS[ticker];
  if (!d) return null;

  const sc = getSpaceXScoreColor(d.score);
  const rs = getRatingStyle(d.rating);
  const allPatterns = [...d.daily_patterns, ...d.weekly_patterns];
  const peClass = d.pe < 35 ? "text-green-400" : d.pe < 80 ? "text-yellow-400" : "text-red-400";
  const marginClass = d.net_margin > 20 ? "text-green-400" : d.net_margin > 5 ? "text-yellow-400" : "text-red-400";
  const growthClass = d.revenue_growth > 20 ? "text-green-400" : d.revenue_growth > 5 ? "text-yellow-400" : "text-red-400";

  return (
    <div>
      {/* SpaceX connection banner */}
      <div className="bg-gradient-to-r from-zinc-900 to-zinc-900/50 border border-zinc-700 rounded-xl p-4 mb-5 flex items-start gap-3">
        <Rocket size={18} className="text-blue-400 shrink-0 mt-0.5" />
        <div>
          <div className="text-xs font-bold text-blue-400 mb-1">🚀 SpaceX 关联：{d.spacex_role}</div>
          <div className="text-xs text-zinc-400 leading-relaxed">{d.spacex_supply}</div>
        </div>
      </div>

      {/* Tab switcher */}
      <div className="flex gap-2 mb-4">
        {(["fundamental", "technical"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold border transition-all ${tab === t ? "bg-zinc-700 border-blue-500 text-blue-300" : "bg-zinc-900 border-zinc-700 text-zinc-400 hover:text-zinc-200"}`}>
            {t === "fundamental" ? "📊 基本面" : "📈 技术面"}
          </button>
        ))}
        <a href={tvUrl(ticker)} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold border border-zinc-700 bg-zinc-900 text-zinc-400 hover:text-blue-400 hover:border-blue-600 transition-all ml-auto">
          <ExternalLink size={12} /> TradingView
        </a>
      </div>

      {tab === "fundamental" && (
        <div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
            <MetricCard label="市值规模" value={d.market_cap} sub="美元" />
            <MetricCard label="PE估值（TTM）" value={d.pe > 0 ? `${d.pe}x` : "亏损"} sub={d.pe < 35 ? "✓ 估值合理" : d.pe < 80 ? "⚠ 估值偏高" : d.pe > 0 ? "⚠ 估值极高" : "暂无盈利"} valueClass={peClass} />
            <MetricCard label="净利润率" value={`${d.net_margin}%`} sub={d.net_margin > 20 ? "✓ 盈利能力强" : d.net_margin > 5 ? "中等盈利" : "⚠ 盈利偏弱"} valueClass={marginClass} />
            <MetricCard label="营收增速（YoY）" value={`${d.revenue_growth}%`} sub={d.revenue_growth > 20 ? "✓ 高速增长" : d.revenue_growth > 5 ? "稳健增长" : "增速偏慢"} valueClass={growthClass} />
            <MetricCard label="年度营收" value={d.revenue} sub="美元" />
            <MetricCard label="净利润" value={d.net_income} sub="美元" />
            <MetricCard label="自由现金流" value={typeof d.fcf === 'number' ? `${d.fcf}亿` : d.fcf} sub="美元" />
            <MetricCard label="ROE" value={d.roe ? `${d.roe}%` : "N/A"} sub={d.roe && d.roe > 15 ? "✓ 资本效率高" : "中等"} valueClass={d.roe && d.roe > 15 ? "text-green-400" : "text-yellow-400"} />
          </div>

          {/* Score */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-5">
            <div className="flex items-center gap-4 mb-2">
              <span className="text-4xl font-black" style={{ color: sc }}>{d.score}</span>
              <div>
                <div className="text-xs text-zinc-500">CANSLIM综合评分（满分25分）</div>
                <span className="text-sm font-bold px-2 py-0.5 rounded" style={{ background: rs.bg, color: rs.text }}>{d.rating}</span>
              </div>
            </div>
          </div>

          {/* Patterns */}
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1 h-4 rounded-sm bg-blue-500" />
            <span className="text-sm font-bold text-zinc-100">技术形态识别</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-5">
            {allPatterns.length > 0 ? allPatterns.map((p, i) => <PatternTag key={i} pattern={p} />) : <PatternTag pattern="暂无明显形态" />}
          </div>

          {/* Summary */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-4 rounded-sm bg-blue-500" />
            <span className="text-sm font-bold text-zinc-100">综合分析摘要</span>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-sm text-zinc-300 leading-relaxed">
            {d.summary}
          </div>
        </div>
      )}

      {tab === "technical" && (
        <div>
          <div className="flex flex-wrap gap-2 mb-4">
            {allPatterns.length > 0 ? allPatterns.map((p, i) => <PatternTag key={i} pattern={p} />) : <PatternTag pattern="暂无明显形态" />}
          </div>
          <div className="flex gap-3 mb-4">
            <button onClick={() => setTf("daily")}
              className={`px-5 py-2 rounded-lg text-sm font-medium border transition-all ${tf === "daily" ? "bg-zinc-700 border-blue-500 text-blue-400" : "bg-zinc-900 border-zinc-700 text-zinc-400 hover:text-zinc-200"}`}>
              📅 日线图（近1年）
            </button>
            <button onClick={() => setTf("weekly")}
              className={`px-5 py-2 rounded-lg text-sm font-medium border transition-all ${tf === "weekly" ? "bg-zinc-700 border-blue-500 text-blue-400" : "bg-zinc-900 border-zinc-700 text-zinc-400 hover:text-zinc-200"}`}>
              📆 周线图（近3年）
            </button>
          </div>
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden">
            <img src={d.charts[tf]} alt={`${ticker} ${tf}`} className="w-full block" />
          </div>
        </div>
      )}
    </div>
  );
}

export default function SpaceXPage() {
  const [selectedTicker, setSelectedTicker] = useState<string>("ADI");
  const [sortKey, setSortKey] = useState<"score" | "pe" | "net_margin" | "revenue_growth" | null>("score");
  const [sortAsc, setSortAsc] = useState(false);

  const sorted = useMemo(() => {
    const entries = SPACEX_TICKER_ORDER.map(t => ({ ticker: t, ...SPACEX_STOCKS[t] }));
    if (!sortKey) return entries;
    return [...entries].sort((a, b) => {
      const va = (a as any)[sortKey] ?? -9999;
      const vb = (b as any)[sortKey] ?? -9999;
      return sortAsc ? va - vb : vb - va;
    });
  }, [sortKey, sortAsc]);

  const handleSort = (key: typeof sortKey) => {
    if (sortKey === key) setSortAsc(p => !p);
    else { setSortKey(key); setSortAsc(false); }
  };

  const thClass = "px-3 py-3 text-left text-xs font-semibold text-zinc-400 bg-zinc-900 border-b border-zinc-800 whitespace-nowrap";
  const thSortClass = `${thClass} cursor-pointer hover:text-zinc-200 select-none`;
  const maxMargin = Math.max(...sorted.map(r => r.net_margin));
  const maxGrowth = Math.max(...sorted.filter(r => r.revenue_growth > 0).map(r => r.revenue_growth));

  return (
    <div className="flex gap-5 h-full">
      {/* Left: overview table */}
      <div className="w-96 shrink-0 flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <Rocket size={16} className="text-blue-400" />
          <span className="text-sm font-bold text-zinc-100">SpaceX 相关股（8只）</span>
        </div>
        <div className="overflow-x-auto rounded-xl border border-zinc-800 flex-1 overflow-y-auto">
          <table className="w-full text-xs">
            <thead>
              <tr>
                <th className={thClass}>代码</th>
                <th className={thSortClass} onClick={() => handleSort("score")}>评分 {sortKey === "score" ? (sortAsc ? "↑" : "↓") : "↕"}</th>
                <th className={thSortClass} onClick={() => handleSort("pe")}>PE {sortKey === "pe" ? (sortAsc ? "↑" : "↓") : "↕"}</th>
                <th className={thSortClass} onClick={() => handleSort("net_margin")}>利润率 {sortKey === "net_margin" ? (sortAsc ? "↑" : "↓") : "↕"}</th>
                <th className={thClass}>图表</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map(r => {
                const sc = getSpaceXScoreColor(r.score);
                const rs = getRatingStyle(r.rating);
                const isActive = selectedTicker === r.ticker;
                return (
                  <tr key={r.ticker} onClick={() => setSelectedTicker(r.ticker)}
                    className={`border-b border-zinc-800/50 cursor-pointer transition-colors ${isActive ? "bg-zinc-800/60" : "hover:bg-zinc-800/30"}`}>
                    <td className="px-3 py-2.5">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-bold text-xs" style={{ color: r.color }}>{r.ticker}</span>
                        <span className="text-zinc-600 text-xs">{r.name.split(' ')[0]}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-1.5">
                        <div className="h-1.5 rounded-full" style={{ width: `${(r.score / 20) * 40}px`, background: sc, minWidth: 2 }} />
                        <span className="font-bold" style={{ color: sc }}>{r.score}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5">
                      <span className={r.pe < 35 ? "text-green-400" : r.pe < 80 ? "text-yellow-400" : r.pe > 0 ? "text-red-400" : "text-zinc-500"}>
                        {r.pe > 0 ? `${r.pe}x` : "N/A"}
                      </span>
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-1.5">
                        <div className="h-1.5 rounded-full" style={{ width: `${Math.max(0, r.net_margin) / maxMargin * 40}px`, background: r.net_margin > 20 ? "#4ade80" : r.net_margin > 5 ? "#fbbf24" : "#f87171", minWidth: 2 }} />
                        <span className={r.net_margin > 20 ? "text-green-400" : r.net_margin > 5 ? "text-yellow-400" : "text-red-400"}>{r.net_margin}%</span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5" onClick={e => e.stopPropagation()}>
                      <a href={tvUrl(r.ticker)} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1 text-zinc-500 hover:text-blue-400 transition-colors">
                        <ExternalLink size={11} /> TV
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right: detail */}
      <div className="flex-1 overflow-y-auto">
        {selectedTicker && SPACEX_STOCKS[selectedTicker] && (
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="text-2xl font-black" style={{ color: SPACEX_STOCKS[selectedTicker].color }}>{selectedTicker}</span>
              <div>
                <div className="text-sm text-zinc-300 font-semibold">{SPACEX_STOCKS[selectedTicker].name}</div>
                <div className="text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded inline-block">{SPACEX_STOCKS[selectedTicker].sector}</div>
              </div>
              <span className="text-xl font-bold text-yellow-300">${SPACEX_STOCKS[selectedTicker].price}</span>
            </div>
            <StockDetail ticker={selectedTicker} />
          </div>
        )}
      </div>
    </div>
  );
}
