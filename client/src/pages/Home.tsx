import { useState, useMemo } from "react";
import { ExternalLink, Rocket } from "lucide-react";
import { STOCKS, TICKER_ORDER, getScoreColor, getRatingStyle, getPatternClass } from "@/lib/stockData";
import type { StockData } from "@/lib/stockData";
import { TRADE_ANALYSIS } from "@/lib/tradeAnalysis";
import TradePanel from "@/components/TradePanel";
import BoardPage from "./BoardPage";
import SpaceXPage from "./SpaceXPage";

type TabType = "fundamental" | "technical" | "trade" | "compare" | "ranking" | "board" | "spacex";
type SortKey = "pe" | "net_margin" | "revenue_growth" | "score" | null;

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

function ScoreBar({ label, val, max, color }: { label: string; val: number; max: number; color: string }) {
  return (
    <div className="flex items-center gap-3 mb-2">
      <span className="w-20 text-xs text-zinc-400 text-right shrink-0">{label}</span>
      <div className="flex-1 bg-zinc-800 rounded-full h-2">
        <div className="h-2 rounded-full transition-all duration-500" style={{ width: `${(val / max) * 100}%`, background: color }} />
      </div>
      <span className="w-8 text-xs font-bold text-right shrink-0" style={{ color }}>{val}/{max}</span>
    </div>
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

function FundamentalPanel({ ticker, data }: { ticker: string; data: StockData }) {
  const scoreColor = getScoreColor(data.score);
  const allPatterns = [...data.daily_patterns, ...data.weekly_patterns];
  const marginClass = data.net_margin > 20 ? "text-green-400" : data.net_margin > 5 ? "text-yellow-400" : "text-red-400";
  const growthClass = data.revenue_growth > 25 ? "text-green-400" : data.revenue_growth > 10 ? "text-yellow-400" : "text-zinc-400";
  const peClass = data.pe < 35 ? "text-green-400" : data.pe < 80 ? "text-yellow-400" : "text-red-400";
  const scoreItems = [
    { label: "盈利能力", val: data.net_margin > 30 ? 5 : data.net_margin > 20 ? 4 : data.net_margin > 10 ? 3 : data.net_margin > 5 ? 2 : data.net_margin > 0 ? 1 : 0, color: "#4ade80" },
    { label: "成长性",   val: data.revenue_growth > 40 ? 5 : data.revenue_growth > 25 ? 4 : data.revenue_growth > 15 ? 3 : data.revenue_growth > 10 ? 2 : data.revenue_growth > 5 ? 1 : 0, color: "#60a5fa" },
    { label: "估值合理", val: data.pe < 20 ? 5 : data.pe < 35 ? 4 : data.pe < 60 ? 3 : data.pe < 100 ? 2 : data.pe < 200 ? 1 : 0, color: "#f59e0b" },
    { label: "市值规模", val: parseFloat(data.market_cap) > 5000 ? 5 : parseFloat(data.market_cap) > 1000 ? 4 : parseFloat(data.market_cap) > 500 ? 3 : parseFloat(data.market_cap) > 200 ? 2 : 1, color: "#a78bfa" },
    { label: "现金流",   val: 3, color: "#34d399" },
  ];
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        <MetricCard label="市值规模" value={data.market_cap} sub="美元" />
        <MetricCard label="PE估值（TTM）" value={`${data.pe}x`} sub={data.pe < 35 ? "✓ 估值合理" : data.pe < 80 ? "⚠ 估值偏高" : "⚠ 估值极高"} valueClass={peClass} />
        <MetricCard label="净利润率" value={`${data.net_margin}%`} sub={data.net_margin > 20 ? "✓ 盈利能力强" : data.net_margin > 5 ? "中等盈利" : "⚠ 盈利偏弱"} valueClass={marginClass} />
        <MetricCard label="营收增速（YoY）" value={`${data.revenue_growth}%`} sub={data.revenue_growth > 25 ? "✓ 高速增长" : data.revenue_growth > 10 ? "稳健增长" : "增速偏慢"} valueClass={growthClass} />
        <MetricCard label="年度营收" value={data.revenue} sub="美元" />
        <MetricCard label="净利润" value={data.net_income} sub="美元" />
        <MetricCard label="自由现金流" value={data.fcf} sub="美元" />
        <MetricCard label="ROE（净资产收益率）" value={data.roe ? `${data.roe}%` : "N/A"} sub={data.roe && data.roe > 20 ? "✓ 资本效率高" : "中等"} valueClass={data.roe && data.roe > 20 ? "text-green-400" : "text-yellow-400"} />
      </div>
      <div className="flex items-center gap-2 mb-3"><div className="w-1 h-4 rounded-sm bg-blue-500" /><span className="text-sm font-bold text-zinc-100">综合评分分析</span></div>
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-5">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-5xl font-black" style={{ color: scoreColor }}>{data.score}</span>
          <div>
            <div className="text-xs text-zinc-500">综合评分（满分25分）</div>
            <span className="text-lg font-bold px-2 py-0.5 rounded text-sm" style={{ background: getRatingStyle(data.rating).bg, color: getRatingStyle(data.rating).text }}>{data.rating}</span>
          </div>
        </div>
        {scoreItems.map(s => <ScoreBar key={s.label} label={s.label} val={s.val} max={5} color={s.color} />)}
      </div>
      <div className="flex items-center gap-2 mb-3"><div className="w-1 h-4 rounded-sm bg-blue-500" /><span className="text-sm font-bold text-zinc-100">技术形态识别</span></div>
      <div className="text-xs text-zinc-500 mb-2">日线 + 周线综合识别结果：</div>
      <div className="flex flex-wrap gap-2 mb-5">{allPatterns.map((p, i) => <PatternTag key={i} pattern={p} />)}</div>
      <div className="flex items-center gap-2 mb-3"><div className="w-1 h-4 rounded-sm bg-blue-500" /><span className="text-sm font-bold text-zinc-100">综合分析摘要</span></div>
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-sm text-zinc-300 leading-relaxed">{data.summary}</div>
    </div>
  );
}

function TechnicalPanel({ ticker, data }: { ticker: string; data: StockData }) {
  const [tf, setTf] = useState<"daily" | "weekly">("daily");
  const allPatterns = [...data.daily_patterns, ...data.weekly_patterns];
  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">{allPatterns.map((p, i) => <PatternTag key={i} pattern={p} />)}</div>
      <div className="flex gap-3 mb-4 flex-wrap">
        <button onClick={() => setTf("daily")} className={`px-5 py-2 rounded-lg text-sm font-medium border transition-all ${tf === "daily" ? "bg-zinc-700 border-blue-500 text-blue-400" : "bg-zinc-900 border-zinc-700 text-zinc-400 hover:text-zinc-200"}`}>📅 日线图（近1年）</button>
        <button onClick={() => setTf("weekly")} className={`px-5 py-2 rounded-lg text-sm font-medium border transition-all ${tf === "weekly" ? "bg-zinc-700 border-blue-500 text-blue-400" : "bg-zinc-900 border-zinc-700 text-zinc-400 hover:text-zinc-200"}`}>📆 周线图（近3年）</button>
        <a href={tvUrl(ticker)} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm font-medium border border-zinc-700 bg-zinc-900 text-zinc-400 hover:text-blue-400 hover:border-blue-600 transition-all">
          <ExternalLink size={14} /> 在 TradingView 查看实时图表
        </a>
      </div>
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden">
        <img src={data.charts[tf]} alt={`${ticker} ${tf}`} className="w-full block" />
      </div>
    </div>
  );
}

function ComparePanel({ onSelectTicker }: { onSelectTicker: (t: string) => void }) {
  const [sortKey, setSortKey] = useState<SortKey>(null);
  const [sortAsc, setSortAsc] = useState(false);
  const rows = useMemo(() => {
    const entries = Object.entries(STOCKS).map(([t, d]) => ({ ticker: t, ...d }));
    if (!sortKey) return entries;
    return [...entries].sort((a, b) => {
      const va = (a as any)[sortKey] ?? -9999; const vb = (b as any)[sortKey] ?? -9999;
      return sortAsc ? va - vb : vb - va;
    });
  }, [sortKey, sortAsc]);
  const maxMargin = Math.max(...rows.map(r => r.net_margin));
  const maxGrowth = Math.max(...rows.map(r => r.revenue_growth));
  const handleSort = (key: SortKey) => { if (sortKey === key) setSortAsc(p => !p); else { setSortKey(key); setSortAsc(false); } };
  const thClass = "px-3 py-3 text-left text-xs font-semibold text-zinc-400 bg-zinc-900 border-b border-zinc-800 whitespace-nowrap";
  const thSortClass = `${thClass} cursor-pointer hover:text-zinc-200 select-none`;
  return (
    <div>
      <div className="flex items-center gap-2 mb-4"><div className="w-1 h-4 rounded-sm bg-blue-500" /><span className="text-sm font-bold text-zinc-100">13只股票横向对比</span><span className="text-xs text-zinc-500 ml-1">（点击表头排序，点击行查看详情）</span></div>
      <div className="overflow-x-auto rounded-xl border border-zinc-800">
        <table className="w-full text-xs">
          <thead>
            <tr>
              <th className={thClass}>代码</th><th className={thClass}>公司</th><th className={thClass}>市值</th>
              <th className={thSortClass} onClick={() => handleSort("pe")}>PE估值 {sortKey === "pe" ? (sortAsc ? "↑" : "↓") : "↕"}</th>
              <th className={thSortClass} onClick={() => handleSort("net_margin")}>净利润率 {sortKey === "net_margin" ? (sortAsc ? "↑" : "↓") : "↕"}</th>
              <th className={thSortClass} onClick={() => handleSort("revenue_growth")}>营收增速 {sortKey === "revenue_growth" ? (sortAsc ? "↑" : "↓") : "↕"}</th>
              <th className={thSortClass} onClick={() => handleSort("score")}>综合评分 {sortKey === "score" ? (sortAsc ? "↑" : "↓") : "↕"}</th>
              <th className={thClass}>技术形态</th><th className={thClass}>评级</th><th className={thClass}>图表</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => {
              const sc = getScoreColor(r.score); const rs = getRatingStyle(r.rating);
              const allPat = [...r.daily_patterns, ...r.weekly_patterns].slice(0, 2);
              return (
                <tr key={r.ticker} onClick={() => onSelectTicker(r.ticker)} className="border-b border-zinc-800/50 hover:bg-zinc-800/40 cursor-pointer transition-colors">
                  <td className="px-3 py-2.5"><span className="px-2 py-0.5 rounded text-xs font-bold" style={{ background: `${r.color}22`, color: r.color, border: `1px solid ${r.color}44` }}>{r.ticker}</span></td>
                  <td className="px-3 py-2.5 text-zinc-400">{r.name}</td>
                  <td className="px-3 py-2.5 text-zinc-300">{r.market_cap}</td>
                  <td className="px-3 py-2.5"><span className={r.pe < 35 ? "text-green-400" : r.pe < 80 ? "text-yellow-400" : "text-red-400"}>{r.pe}x</span></td>
                  <td className="px-3 py-2.5"><div className="flex items-center gap-2"><div className="h-1.5 rounded-full" style={{ width: `${(r.net_margin / maxMargin) * 60}px`, background: r.net_margin > 20 ? "#4ade80" : r.net_margin > 5 ? "#fbbf24" : "#f87171", minWidth: 2 }} /><span className={r.net_margin > 20 ? "text-green-400" : r.net_margin > 5 ? "text-yellow-400" : "text-red-400"}>{r.net_margin}%</span></div></td>
                  <td className="px-3 py-2.5"><div className="flex items-center gap-2"><div className="h-1.5 rounded-full bg-blue-500" style={{ width: `${(r.revenue_growth / maxGrowth) * 60}px`, minWidth: 2 }} /><span className="text-blue-400">{r.revenue_growth}%</span></div></td>
                  <td className="px-3 py-2.5"><div className="flex items-center gap-2"><div className="h-1.5 rounded-full" style={{ width: `${(r.score / 25) * 60}px`, background: sc }} /><span className="font-bold" style={{ color: sc }}>{r.score}</span></div></td>
                  <td className="px-3 py-2.5"><div className="flex flex-wrap gap-1">{allPat.map((p, i) => <PatternTag key={i} pattern={p.length > 12 ? p.slice(0, 12) + "…" : p} />)}</div></td>
                  <td className="px-3 py-2.5"><span className="px-2 py-0.5 rounded text-xs font-semibold" style={{ background: rs.bg, color: rs.text }}>{r.rating}</span></td>
                  <td className="px-3 py-2.5" onClick={e => e.stopPropagation()}><a href={tvUrl(r.ticker)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-zinc-500 hover:text-blue-400 transition-colors"><ExternalLink size={11} /> TV</a></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RankingPanel({ onSelectTicker }: { onSelectTicker: (t: string) => void }) {
  const ranked = useMemo(() => Object.entries(STOCKS).map(([t, d]) => ({ ticker: t, ...d })).sort((a, b) => b.score - a.score), []);
  return (
    <div>
      <div className="flex items-center gap-2 mb-4"><div className="w-1 h-4 rounded-sm bg-blue-500" /><span className="text-sm font-bold text-zinc-100">综合排名（基本面 + 技术面）</span></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {ranked.map((d, i) => {
          const sc = getScoreColor(d.score); const rs = getRatingStyle(d.rating);
          const allPat = [...d.daily_patterns, ...d.weekly_patterns].slice(0, 3);
          return (
            <div key={d.ticker} onClick={() => onSelectTicker(d.ticker)} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 cursor-pointer hover:border-blue-500/50 hover:bg-zinc-800/60 transition-all group">
              <div className="flex justify-between items-start mb-1">
                <span className="text-xl font-black" style={{ color: d.color }}>{d.ticker}</span>
                <span className="text-3xl font-black text-zinc-800 group-hover:text-zinc-700 transition-colors">#{i + 1}</span>
              </div>
              <div className="text-xs text-zinc-500 mb-2">{d.name} · {d.sector}</div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl font-black" style={{ color: sc }}>{d.score}<span className="text-sm text-zinc-500 font-normal">/25</span></span>
                <span className="px-2 py-0.5 rounded text-xs font-semibold" style={{ background: rs.bg, color: rs.text }}>{d.rating}</span>
              </div>
              <div className="flex flex-wrap gap-1 mb-3">{allPat.map((p, j) => <PatternTag key={j} pattern={p.length > 14 ? p.slice(0, 14) + "…" : p} />)}</div>
              <a href={tvUrl(d.ticker)} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="flex items-center gap-1 text-xs text-zinc-600 hover:text-blue-400 transition-colors"><ExternalLink size={11} /> 在 TradingView 查看</a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Home() {
  const [selectedTicker, setSelectedTicker] = useState<string>("LLY");
  const [activeTab, setActiveTab] = useState<TabType>("fundamental");
  const [search, setSearch] = useState("");

  const filteredTickers = useMemo(() =>
    TICKER_ORDER.filter(t => {
      const d = STOCKS[t]; const q = search.toLowerCase();
      return t.toLowerCase().includes(q) || d.name.toLowerCase().includes(q) || d.sector.includes(q);
    }), [search]);

  const handleSelectTicker = (t: string) => { setSelectedTicker(t); setActiveTab("fundamental"); };
  const currentData = STOCKS[selectedTicker];

  const mainTabs: { key: TabType; label: string }[] = [
    { key: "fundamental", label: "基本面" },
    { key: "technical",   label: "技术面" },
    { key: "trade",       label: "交易分析" },
    { key: "compare",     label: "横向对比" },
    { key: "ranking",     label: "综合排名" },
  ];

  const isSpaceX = activeTab === "spacex";
  const isBoard = activeTab === "board";
  const isMainStock = !isSpaceX && !isBoard;

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-100 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 bg-zinc-900 border-r border-zinc-800 flex flex-col">
        <div className="p-4 border-b border-zinc-800 bg-zinc-950">
          <h1 className="text-sm font-bold text-zinc-100 mb-0.5">📊 股票综合分析</h1>
          <p className="text-xs text-zinc-500">基本面 · 技术面 · 形态识别</p>
        </div>
        <div className="px-3 py-2.5 border-b border-zinc-800/60">
          <input type="text" placeholder="搜索股票代码或名称..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 outline-none focus:border-blue-500 transition-colors" />
        </div>

        {/* Category buttons */}
        <div className="px-2 py-2 border-b border-zinc-800/60 flex gap-1.5">
          <button onClick={() => { setActiveTab("fundamental"); }}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${isMainStock ? "bg-blue-600 text-white" : "bg-zinc-800 text-zinc-400 hover:text-zinc-200"}`}>
            持仓股
          </button>
          <button onClick={() => setActiveTab("spacex")}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1 ${isSpaceX ? "bg-blue-600 text-white" : "bg-zinc-800 text-zinc-400 hover:text-zinc-200"}`}>
            <Rocket size={11} /> SpaceX
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filteredTickers.map(t => {
            const d = STOCKS[t]; const sc = getScoreColor(d.score); const rs = getRatingStyle(d.rating);
            const isActive = selectedTicker === t && isMainStock;
            return (
              <button key={t} onClick={() => handleSelectTicker(t)}
                className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg border text-left transition-all ${isActive ? "bg-zinc-700/60 border-blue-500/50" : "border-transparent hover:bg-zinc-800/60 hover:border-zinc-700/50"}`}>
                <div className="flex items-center gap-2 min-w-0">
                  <span className="shrink-0 text-xs font-bold px-1.5 py-0.5 rounded" style={{ background: `${d.color}22`, color: d.color, border: `1px solid ${d.color}44` }}>{t}</span>
                  <span className="text-xs text-zinc-400 truncate">{d.name}</span>
                </div>
                <div className="flex flex-col items-end gap-0.5 shrink-0 ml-1">
                  <span className="text-xs font-semibold" style={{ color: sc }}>{d.score}分</span>
                  <span className="text-xs px-1 py-0 rounded" style={{ background: rs.bg, color: rs.text }}>{d.rating}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom buttons */}
        <div className="p-2 border-t border-zinc-800 space-y-1.5">
          <button onClick={() => setActiveTab("board")}
            className={`w-full px-3 py-2.5 rounded-lg text-xs font-semibold border transition-all ${isBoard ? "bg-blue-950 border-blue-600 text-blue-300" : "bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:border-zinc-600"}`}>
            💬 申请新股票分析
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-zinc-900 border-b border-zinc-800 px-5 py-3 flex items-center justify-between shrink-0">
          {isBoard ? (
            <div className="flex items-center gap-3">
              <span className="text-xl font-black text-blue-400">💬</span>
              <div><div className="text-sm font-bold text-zinc-100">股票申请留言板</div><div className="text-xs text-zinc-500">告诉我们你想分析哪只股票</div></div>
            </div>
          ) : isSpaceX ? (
            <div className="flex items-center gap-3">
              <Rocket size={20} className="text-blue-400" />
              <div><div className="text-sm font-bold text-zinc-100">🚀 SpaceX 相关股分析</div><div className="text-xs text-zinc-500">GLW · AXTI · TSEM · STM · ADI · IFNNY · TXN · ARM</div></div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-2xl font-black" style={{ color: currentData.color }}>{selectedTicker}</span>
              <div>
                <div className="text-sm text-zinc-400">{currentData.name}</div>
                <div className="text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded inline-block">{currentData.sector}</div>
              </div>
              <span className="text-xl font-bold text-yellow-300">${currentData.price.toFixed(2)}</span>
              <a href={tvUrl(selectedTicker)} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700 text-xs text-zinc-400 hover:text-blue-400 hover:border-blue-600 transition-all">
                <ExternalLink size={12} /> TradingView
              </a>
            </div>
          )}
          {isMainStock && (
            <nav className="flex bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden">
              {mainTabs.map(tab => (
                <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                  className={`px-4 py-2 text-sm transition-all font-medium ${activeTab === tab.key ? "bg-zinc-700 text-zinc-100" : "text-zinc-400 hover:text-zinc-200"}`}>
                  {tab.label}
                </button>
              ))}
            </nav>
          )}
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-5">
          {isBoard   && <BoardPage />}
          {isSpaceX  && <SpaceXPage />}
          {isMainStock && activeTab === "fundamental" && <FundamentalPanel ticker={selectedTicker} data={currentData} />}
          {isMainStock && activeTab === "technical"   && <TechnicalPanel ticker={selectedTicker} data={currentData} />}
          {isMainStock && activeTab === "trade"       && (TRADE_ANALYSIS[selectedTicker] ? <TradePanel data={TRADE_ANALYSIS[selectedTicker]} /> : <div className="text-center py-16 text-zinc-500">暂无该股票的交易分析数据</div>)}
          {isMainStock && activeTab === "compare"     && <ComparePanel onSelectTicker={t => { handleSelectTicker(t); }} />}
          {isMainStock && activeTab === "ranking"     && <RankingPanel onSelectTicker={t => { handleSelectTicker(t); }} />}
        </main>
      </div>
    </div>
  );
}
