export type Lang = "zh" | "en";

export const T = {
  // ── App shell ──────────────────────────────────────────────────────────
  appTitle:       { zh: "股票综合分析", en: "Stock Analysis" },
  appSubtitle:    { zh: "基本面 · 技术面 · 形态识别", en: "Fundamentals · Technicals · Patterns" },
  searchPlaceholder: { zh: "搜索股票代码或名称...", en: "Search ticker or name..." },
  requestBoard:   { zh: "💬 申请新股票分析", en: "💬 Request a Stock" },

  // ── Tabs ───────────────────────────────────────────────────────────────
  tabFundamental: { zh: "基本面", en: "Fundamentals" },
  tabTechnical:   { zh: "技术面", en: "Technicals" },
  tabTrade:       { zh: "交易分析", en: "Trade Analysis" },
  tabCompare:     { zh: "横向对比", en: "Compare" },
  tabRanking:     { zh: "综合排名", en: "Ranking" },

  // ── Metric labels ──────────────────────────────────────────────────────
  marketCap:      { zh: "市值规模", en: "Market Cap" },
  peRatio:        { zh: "PE估值（TTM）", en: "P/E Ratio (TTM)" },
  netMargin:      { zh: "净利润率", en: "Net Margin" },
  revenueGrowth:  { zh: "营收增速（YoY）", en: "Revenue Growth (YoY)" },
  revenue:        { zh: "年度营收", en: "Annual Revenue" },
  netIncome:      { zh: "净利润", en: "Net Income" },
  fcf:            { zh: "自由现金流", en: "Free Cash Flow" },
  roe:            { zh: "ROE（净资产收益率）", en: "ROE" },
  usd:            { zh: "美元", en: "USD" },

  // ── Metric sub-labels ──────────────────────────────────────────────────
  valuationFair:  { zh: "✓ 估值合理", en: "✓ Fair Valuation" },
  valuationHigh:  { zh: "⚠ 估值偏高", en: "⚠ Elevated Valuation" },
  valuationVHigh: { zh: "⚠ 估值极高", en: "⚠ Very High Valuation" },
  profitStrong:   { zh: "✓ 盈利能力强", en: "✓ Strong Profitability" },
  profitMid:      { zh: "中等盈利", en: "Moderate Profitability" },
  profitWeak:     { zh: "⚠ 盈利偏弱", en: "⚠ Weak Profitability" },
  growthHigh:     { zh: "✓ 高速增长", en: "✓ High Growth" },
  growthMid:      { zh: "稳健增长", en: "Steady Growth" },
  growthSlow:     { zh: "增速偏慢", en: "Slow Growth" },
  capitalEff:     { zh: "✓ 资本效率高", en: "✓ High Capital Efficiency" },
  moderate:       { zh: "中等", en: "Moderate" },
  na:             { zh: "N/A", en: "N/A" },

  // ── Score section ──────────────────────────────────────────────────────
  compositeScore: { zh: "综合评分分析", en: "Composite Score" },
  scoreOf25:      { zh: "综合评分（满分25分）", en: "Score (out of 25)" },
  profitability:  { zh: "盈利能力", en: "Profitability" },
  growth:         { zh: "成长性", en: "Growth" },
  valuation:      { zh: "估值合理", en: "Valuation" },
  scale:          { zh: "市值规模", en: "Scale" },
  cashFlow:       { zh: "现金流", en: "Cash Flow" },

  // ── Pattern section ────────────────────────────────────────────────────
  patternTitle:   { zh: "技术形态识别", en: "Pattern Recognition" },
  patternSub:     { zh: "日线 + 周线综合识别结果：", en: "Daily + Weekly combined signals:" },
  summaryTitle:   { zh: "综合分析摘要", en: "Analysis Summary" },

  // ── Technical panel ────────────────────────────────────────────────────
  dailyChart:     { zh: "📅 日线图（近1年）", en: "📅 Daily Chart (1Y)" },
  weeklyChart:    { zh: "📆 周线图（近3年）", en: "📆 Weekly Chart (3Y)" },
  viewOnTV:       { zh: "在 TradingView 查看实时图表", en: "View Live Chart on TradingView" },

  // ── Compare panel ──────────────────────────────────────────────────────
  compareTitle:   { zh: "13只股票横向对比", en: "13-Stock Comparison" },
  compareSub:     { zh: "（点击表头排序，点击行查看详情）", en: "(Click header to sort, row to view)" },
  colTicker:      { zh: "代码", en: "Ticker" },
  colCompany:     { zh: "公司", en: "Company" },
  colMarketCap:   { zh: "市值", en: "Mkt Cap" },
  colPE:          { zh: "PE估值", en: "P/E" },
  colNetMargin:   { zh: "净利润率", en: "Net Margin" },
  colRevGrowth:   { zh: "营收增速", en: "Rev Growth" },
  colScore:       { zh: "综合评分", en: "Score" },
  colPattern:     { zh: "技术形态", en: "Patterns" },
  colRating:      { zh: "评级", en: "Rating" },
  colChart:       { zh: "图表", en: "Chart" },

  // ── Ranking panel ──────────────────────────────────────────────────────
  rankingTitle:   { zh: "综合排名（基本面 + 技术面）", en: "Overall Ranking (Fundamentals + Technicals)" },
  viewOnTVShort:  { zh: "在 TradingView 查看", en: "View on TradingView" },

  // ── Trade panel ────────────────────────────────────────────────────────
  baseType:       { zh: "底部类型", en: "Base Type" },
  baseStage:      { zh: "底部阶段", en: "Base Stage" },
  baseQuality:    { zh: "底部质量", en: "Base Quality" },
  overallSignal:  { zh: "综合信号", en: "Signal" },
  stageCanBuy:    { zh: "（可买入）", en: "(Buyable)" },
  stageCaution:   { zh: "（谨慎）", en: "(Caution)" },
  stage:          { zh: "第", en: "Stage " },
  stageUnit:      { zh: " 阶段", en: "" },
  keyPrices:      { zh: "关键价位一览", en: "Key Price Levels" },
  currentPrice:   { zh: "当前价格", en: "Current Price" },
  pivotPoint:     { zh: "关键突破点", en: "Pivot Point" },
  stopLossPrice:  { zh: "止损价格", en: "Stop Loss" },
  riskReward:     { zh: "风险回报比", en: "Risk/Reward" },
  baseAnalysis:   { zh: "底部分析：", en: "Base Analysis: " },
  tabEntry:       { zh: "📈 买入点", en: "📈 Entry Points" },
  tabExit:        { zh: "📉 卖出点", en: "📉 Exit Points" },
  tabRisk:        { zh: "⚠️ 风险点", en: "⚠️ Risk Factors" },
  tabCANSLIM:     { zh: "📊 CANSLIM", en: "📊 CANSLIM" },
  entryType:      { zh: "买入价格", en: "Entry Price" },
  maxEntry:       { zh: "最晚追买价（+5%）", en: "Max Chase Price (+5%)" },
  priceDesc:      { zh: "价格说明：", en: "Note: " },
  trigger:        { zh: "触发条件：", en: "Trigger: " },
  positionSizing: { zh: "仓位管理建议", en: "Position Sizing" },
  takeProfitLbl:  { zh: "止盈目标", en: "Profit Targets" },
  batchProfit:    { zh: "分批止盈", en: "Scale Out" },
  target1:        { zh: "目标一", en: "Target 1" },
  target2:        { zh: "目标二", en: "Target 2" },
  target3:        { zh: "目标三", en: "Target 3" },
  stopLossRule:   { zh: "止损规则（M2规则）", en: "Stop Loss (M2 Rule)" },
  mustExecute:    { zh: "必须执行", en: "Must Execute" },
  lossAmt:        { zh: "亏损幅度", en: "Loss %" },
  exitCondition:  { zh: "触发条件：", en: "Trigger: " },
  offensiveSell:  { zh: "进攻性卖出", en: "Offensive Sell" },
  defensiveSell:  { zh: "防守性卖出", en: "Defensive Sell" },
  riskLevel:      { zh: "风险等级：", en: "Risk Level: " },
  mainRisks:      { zh: "主要风险点", en: "Key Risk Factors" },
  tradeNote:      { zh: "综合交易建议", en: "Trade Recommendation" },
  canslimScore:   { zh: "CANSLIM评分", en: "CANSLIM Score" },
  canslimBasis:   { zh: "（基于ZST炒股与禅心CANSLIM体系）", en: "(Based on ZST CANSLIM Framework)" },
  canslimDetail:  { zh: "CANSLIM详细说明", en: "CANSLIM Details" },
  mFactor:        { zh: "M因子说明（市场方向）", en: "M Factor (Market Direction)" },
  mFactorNote:    { zh: "当前市场处于反弹阶段（M评分3/5）。根据CANSLIM规则，Base Breakout交易方法只在强上涨趋势市场才有效。建议先判断市场周期（大盘是否出现Follow Through Day），再决定是否建仓。熊市或震荡市中所有突破信号赢率极低。",
                    en: "Market is in a recovery phase (M score 3/5). Per CANSLIM rules, base breakout strategies only work in strong uptrends. Confirm a Follow Through Day before entering. All breakout signals have low win rates in bear or choppy markets." },
  noTradeData:    { zh: "暂无该股票的交易分析数据", en: "No trade analysis data for this stock." },

  // ── Board page ─────────────────────────────────────────────────────────
  boardTitle:     { zh: "股票申请留言板", en: "Stock Request Board" },
  boardSub:       { zh: "想看哪只股票的分析？提交申请，点赞支持你最想要的！", en: "Which stock should we analyze next? Submit a request and vote!" },
  boardShared:    { zh: "· 所有访客共享同一份留言板", en: "· Shared by all visitors" },
  refresh:        { zh: "刷新", en: "Refresh" },
  submitTitle:    { zh: "提交新的股票申请", en: "Submit a New Request" },
  tickerLabel:    { zh: "股票代码", en: "Ticker Symbol" },
  tickerPlaceholder: { zh: "例如：NVDA", en: "e.g. NVDA" },
  companyLabel:   { zh: "公司名称（可选）", en: "Company Name (optional)" },
  companyPlaceholder: { zh: "例如：NVIDIA Corporation", en: "e.g. NVIDIA Corporation" },
  reasonLabel:    { zh: "申请理由（可选）", en: "Reason (optional)" },
  reasonPlaceholder: { zh: "为什么想分析这只股票？有什么特别关注的点？", en: "Why do you want this stock analyzed?" },
  authorLabel:    { zh: "你的名字", en: "Your Name" },
  authorPlaceholder: { zh: "昵称或真名", en: "Nickname or real name" },
  required:       { zh: "*", en: "*" },
  submitBtn:      { zh: "提交申请", en: "Submit" },
  submitting:     { zh: "提交中...", en: "Submitting..." },
  loading:        { zh: "加载中...", en: "Loading..." },
  noRequests:     { zh: "还没有申请，成为第一个！", en: "No requests yet — be the first!" },
  byAuthor:       { zh: "by", en: "by" },
  boardFooter:    { zh: "💾 留言数据存储在云端数据库，所有访客看到的是同一份留言板。", en: "💾 Data is stored in a cloud database shared by all visitors." },
  likeSuccess:    { zh: "点赞成功！", en: "Liked!" },
  alreadyLiked:   { zh: "你已经点赞过了", en: "Already liked" },
  submitSuccess:  { zh: "申请已提交！感谢你的建议 🎉", en: "Request submitted! Thanks for your suggestion 🎉" },
  submitError:    { zh: "提交失败：", en: "Submit failed: " },
  loadError:      { zh: "加载失败：", en: "Load failed: " },
  likeError:      { zh: "点赞失败：", en: "Like failed: " },
  requiredFields: { zh: "股票代码和你的名字是必填项", en: "Ticker and your name are required" },

  // ── Ratings ────────────────────────────────────────────────────────────
  ratingExcellent: { zh: "极优质", en: "Excellent" },
  ratingGood:      { zh: "优质",   en: "Quality" },
  ratingFair:      { zh: "良好",   en: "Good" },
  ratingAvg:       { zh: "一般",   en: "Average" },
  ratingWeak:      { zh: "较弱",   en: "Weak" },

  // ── Signals ────────────────────────────────────────────────────────────
  signalStrong:    { zh: "强烈", en: "Strong" },
  signalMid:       { zh: "中等", en: "Moderate" },
  signalWeak:      { zh: "弱",   en: "Weak" },
  signalNone:      { zh: "无",   en: "None" },
  riskLow:         { zh: "低",   en: "Low" },
  riskMid:         { zh: "中",   en: "Medium" },
  riskHigh:        { zh: "高",   en: "High" },
  riskVHigh:       { zh: "极高", en: "Very High" },

  // ── Pattern tags ───────────────────────────────────────────────────────
  patNone:         { zh: "暂无明显形态", en: "No clear pattern" },
} as const;

export type TKey = keyof typeof T;

export function t(key: TKey, lang: Lang): string {
  return T[key][lang];
}
