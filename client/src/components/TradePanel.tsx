import { useState } from "react";
import type { TradeAnalysis } from "@/lib/tradeAnalysis";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-3 mt-5">
      <div className="w-1 h-4 rounded-sm bg-blue-500 shrink-0" />
      <span className="text-sm font-bold text-zinc-100">{children}</span>
    </div>
  );
}

function InfoRow({ label, value, valueClass }: { label: string; value: string; valueClass?: string }) {
  return (
    <div className="flex items-start justify-between py-2 border-b border-zinc-800/50 last:border-0">
      <span className="text-xs text-zinc-500 shrink-0 w-28">{label}</span>
      <span className={`text-xs text-right ml-2 ${valueClass ?? "text-zinc-200"}`}>{value}</span>
    </div>
  );
}

function Badge({ children, color }: { children: React.ReactNode; color: string }) {
  const colorMap: Record<string, string> = {
    green:  "bg-green-950 text-green-300 border-green-700/40",
    yellow: "bg-yellow-950 text-yellow-300 border-yellow-700/40",
    red:    "bg-red-950 text-red-300 border-red-700/40",
    blue:   "bg-blue-950 text-blue-300 border-blue-700/40",
    orange: "bg-orange-950 text-orange-300 border-orange-700/40",
    purple: "bg-purple-950 text-purple-300 border-purple-700/40",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold border ${colorMap[color] ?? colorMap.blue}`}>
      {children}
    </span>
  );
}

function CANSLIMBar({ letter, score, desc }: { letter: string; score: number; desc: string }) {
  const color = score >= 4 ? "#4ade80" : score >= 3 ? "#f59e0b" : "#f87171";
  return (
    <div className="flex items-center gap-2 mb-2">
      <span className="w-5 text-xs font-black text-center shrink-0" style={{ color }}>{letter}</span>
      <div className="flex-1 bg-zinc-800 rounded-full h-2">
        <div className="h-2 rounded-full transition-all" style={{ width: `${score / 5 * 100}%`, background: color }} />
      </div>
      <span className="text-xs font-bold w-6 text-right shrink-0" style={{ color }}>{score}/5</span>
      <span className="text-xs text-zinc-500 w-40 shrink-0 truncate">{desc}</span>
    </div>
  );
}

const CANSLIM_LABELS: Record<string, string> = {
  C: "当季盈利增速",
  A: "年度盈利增速",
  N: "新产品/催化剂",
  S: "量价配合",
  L: "领头股地位",
  I: "机构持股",
  M: "市场方向",
};

export default function TradePanel({ data }: { data: TradeAnalysis }) {
  const [activeSection, setActiveSection] = useState<"entry" | "exit" | "risk" | "canslim">("entry");

  const riskColor = { 低: "green", 中: "yellow", 高: "orange", 极高: "red" }[data.riskLevel] ?? "yellow";
  const signalColor = { 强烈: "green", 中等: "yellow", 弱: "orange", 无: "red" }[data.overallSignal] ?? "yellow";
  const qualityColor = { 标准: "green", 有缺陷: "orange", 待观察: "yellow" }[data.baseQuality] ?? "yellow";

  const tabs = [
    { key: "entry" as const, label: "📈 买入点" },
    { key: "exit"  as const, label: "📉 卖出点" },
    { key: "risk"  as const, label: "⚠️ 风险点" },
    { key: "canslim" as const, label: "📊 CANSLIM" },
  ];

  return (
    <div>
      {/* 顶部概览 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3">
          <div className="text-xs text-zinc-500 mb-1">底部类型</div>
          <div className="text-xs font-semibold text-zinc-200 leading-tight">{data.baseType}</div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3">
          <div className="text-xs text-zinc-500 mb-1">底部阶段</div>
          <div className="text-sm font-black" style={{ color: data.baseStage <= 2 ? "#4ade80" : "#f87171" }}>
            第 {data.baseStage} 阶段
            <span className="text-xs font-normal text-zinc-500 ml-1">{data.baseStage <= 2 ? "（可买入）" : "（谨慎）"}</span>
          </div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3">
          <div className="text-xs text-zinc-500 mb-1">底部质量</div>
          <Badge color={qualityColor}>{data.baseQuality}</Badge>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3">
          <div className="text-xs text-zinc-500 mb-1">综合信号</div>
          <div className="flex items-center gap-2">
            <Badge color={signalColor}>{data.overallSignal}</Badge>
            <Badge color={riskColor}>风险{data.riskLevel}</Badge>
          </div>
        </div>
      </div>

      {/* 关键价位 */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-4 rounded-sm bg-yellow-500 shrink-0" />
          <span className="text-sm font-bold text-zinc-100">关键价位一览</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
          <div>
            <div className="text-xs text-zinc-500 mb-1">当前价格</div>
            <div className="text-lg font-black text-yellow-300">${data.currentPrice}</div>
          </div>
          <div>
            <div className="text-xs text-zinc-500 mb-1">关键突破点</div>
            <div className="text-lg font-black text-blue-400">${data.pivotPoint}</div>
            <div className="text-xs text-zinc-500">{data.distFromPivot > 0 ? `+${data.distFromPivot}%` : `${data.distFromPivot}%`}</div>
          </div>
          <div>
            <div className="text-xs text-zinc-500 mb-1">止损价格</div>
            <div className="text-lg font-black text-red-400">${data.stopLoss.price}</div>
            <div className="text-xs text-red-500">{data.stopLoss.pct}%</div>
          </div>
          <div>
            <div className="text-xs text-zinc-500 mb-1">风险回报比</div>
            <div className="text-sm font-bold text-green-400">{data.riskRewardRatio}</div>
          </div>
        </div>
      </div>

      {/* 底部质量说明 */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-5 text-xs text-zinc-300 leading-relaxed">
        <span className="font-semibold text-zinc-100">底部分析：</span>{data.baseQualityNote}
      </div>

      {/* 分区标签 */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setActiveSection(t.key)}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold border transition-all ${activeSection === t.key ? "bg-zinc-700 border-blue-500 text-blue-300" : "bg-zinc-900 border-zinc-700 text-zinc-400 hover:text-zinc-200"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* 买入点 */}
      {activeSection === "entry" && (
        <div>
          {data.entries.map((e, i) => (
            <div key={i} className={`bg-zinc-900 border rounded-xl p-4 mb-3 ${e.priority === "主要" ? "border-green-700/50" : "border-zinc-700"}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-zinc-100">{e.type}</span>
                <Badge color={e.priority === "主要" ? "green" : e.priority === "加仓" ? "blue" : "yellow"}>{e.priority}</Badge>
              </div>
              {e.price > 0 ? (
                <>
                  <div className="flex gap-4 mb-2">
                    <div>
                      <div className="text-xs text-zinc-500">买入价格</div>
                      <div className="text-xl font-black text-green-400">${e.price}</div>
                    </div>
                    {e.maxEntry > 0 && (
                      <div>
                        <div className="text-xs text-zinc-500">最晚追买价（+5%）</div>
                        <div className="text-xl font-black text-yellow-400">${e.maxEntry}</div>
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-zinc-400 mb-1"><span className="text-zinc-500">价格说明：</span>{e.priceDesc}</div>
                  <div className="text-xs text-zinc-400"><span className="text-zinc-500">触发条件：</span>{e.condition}</div>
                </>
              ) : (
                <div className="text-xs text-zinc-400">{e.priceDesc}</div>
              )}
            </div>
          ))}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            <div className="text-xs text-zinc-500 mb-1">仓位管理建议</div>
            <div className="text-xs text-zinc-300 leading-relaxed">{data.positionSizing}</div>
          </div>
        </div>
      )}

      {/* 卖出点 */}
      {activeSection === "exit" && (
        <div>
          {/* 止盈目标 */}
          <div className="bg-zinc-900 border border-green-700/40 rounded-xl p-4 mb-3">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-bold text-green-300">止盈目标</span>
              <Badge color="green">分批止盈</Badge>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <div className="text-xs text-zinc-500 mb-1">目标一</div>
                <div className="text-xl font-black text-green-400">${data.takeProfit.target1}</div>
                <div className="text-xs text-green-600">+{data.takeProfit.target1Pct}%</div>
              </div>
              <div>
                <div className="text-xs text-zinc-500 mb-1">目标二</div>
                <div className="text-xl font-black text-green-300">${data.takeProfit.target2}</div>
                <div className="text-xs text-green-600">+{data.takeProfit.target2Pct}%</div>
              </div>
              {data.takeProfit.target3 && (
                <div>
                  <div className="text-xs text-zinc-500 mb-1">目标三</div>
                  <div className="text-xl font-black text-green-200">${data.takeProfit.target3}</div>
                  <div className="text-xs text-green-600">+{data.takeProfit.target3Pct}%</div>
                </div>
              )}
            </div>
          </div>

          {/* 止损 */}
          <div className="bg-zinc-900 border border-red-700/40 rounded-xl p-4 mb-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-bold text-red-300">止损规则（M2规则）</span>
              <Badge color="red">必须执行</Badge>
            </div>
            <div className="flex items-center gap-4 mb-2">
              <div>
                <div className="text-xs text-zinc-500">止损价格</div>
                <div className="text-2xl font-black text-red-400">${data.stopLoss.price}</div>
              </div>
              <div>
                <div className="text-xs text-zinc-500">亏损幅度</div>
                <div className="text-2xl font-black text-red-400">{data.stopLoss.pct}%</div>
              </div>
            </div>
            <div className="text-xs text-zinc-400 leading-relaxed">{data.stopLoss.rule}</div>
          </div>

          {/* 卖出信号 */}
          {data.exits.map((e, i) => (
            <div key={i} className={`bg-zinc-900 border rounded-xl p-4 mb-3 ${e.signal === "进攻性" ? "border-yellow-700/40" : "border-purple-700/40"}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-zinc-100">{e.type}</span>
                <Badge color={e.signal === "进攻性" ? "yellow" : "purple"}>{e.signal}卖出</Badge>
              </div>
              <div className="text-xl font-black mb-1" style={{ color: e.signal === "进攻性" ? "#fbbf24" : "#c084fc" }}>${e.price}</div>
              <div className="text-xs text-zinc-400 mb-1"><span className="text-zinc-500">触发条件：</span>{e.condition}</div>
            </div>
          ))}
        </div>
      )}

      {/* 风险点 */}
      {activeSection === "risk" && (
        <div>
          <div className="bg-zinc-900 border border-orange-700/40 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-bold text-orange-300">主要风险点</span>
              <Badge color={riskColor}>风险等级：{data.riskLevel}</Badge>
            </div>
            <ul className="space-y-2">
              {data.risks.map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                  <span className="text-orange-400 shrink-0 mt-0.5">▸</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            <div className="text-xs text-zinc-500 mb-2 font-semibold">综合交易建议</div>
            <div className="text-xs text-zinc-300 leading-relaxed">{data.tradeNote}</div>
          </div>
        </div>
      )}

      {/* CANSLIM评分 */}
      {activeSection === "canslim" && (
        <div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm font-bold text-zinc-100">CANSLIM评分</span>
              <span className="text-xs text-zinc-500">（基于ZST炒股与禅心CANSLIM体系）</span>
            </div>
            {Object.entries(data.canslimScore).map(([letter, score]) => (
              <CANSLIMBar key={letter} letter={letter} score={score} desc={CANSLIM_LABELS[letter] ?? ""} />
            ))}
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-4">
            <div className="text-xs text-zinc-500 mb-2 font-semibold">CANSLIM详细说明</div>
            <div className="text-xs text-zinc-300 leading-relaxed">{data.canslimNote}</div>
          </div>
          <div className="bg-zinc-900 border border-blue-700/40 rounded-xl p-4">
            <div className="text-xs text-zinc-500 mb-2 font-semibold">M因子说明（市场方向）</div>
            <div className="text-xs text-zinc-300 leading-relaxed">
              当前市场处于反弹阶段（M评分3/5）。根据CANSLIM规则，Base Breakout交易方法只在强上涨趋势市场才有效。建议先判断市场周期（大盘是否出现Follow Through Day），再决定是否建仓。熊市或震荡市中所有突破信号赢率极低。
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
