export interface StockData {
  name: string;
  sector: string;
  price: number;
  market_cap: string;
  pe: number;
  ps: number;
  revenue: string;
  net_income: string;
  net_margin: number;
  revenue_growth: number;
  fcf: string;
  roe: number | null;
  de: number | null;
  score: number;
  rating: string;
  color: string;
  daily_patterns: string[];
  weekly_patterns: string[];
  summary: string;
  charts: { daily: string; weekly: string };
}

export const STOCKS: Record<string, StockData> = {
  LLY: {
    name: "Eli Lilly", sector: "医疗·制药", price: 987.18,
    market_cap: "8458亿", pe: 33.7, ps: 11.8,
    revenue: "722.5亿", net_income: "252.8亿", net_margin: 35.0,
    revenue_growth: 56.0, fcf: "91.6亿", roe: 107.5, de: 1.39,
    score: 22, rating: "极优质", color: "#8b5cf6",
    daily_patterns: ["暂无明显形态"],
    weekly_patterns: ["杯柄形态（深度34.5%）✓ 已突破", "回踩20周均线"],
    summary: "周线级别完成了一个深度34.5%的大型杯柄形态并突破，目前正在回踩20周均线，是经典的突破后回踩买点。GLP-1药物驱动营收增速高达56%，ROE高达107.5%，是组合中基本面综合评分最高的股票之一。",
    charts: { daily: "/manus-storage/LLY_daily_7cdaf773.png", weekly: "/manus-storage/LLY_weekly_09891000.png" }
  },
  V: {
    name: "Visa Inc", sector: "金融·支付", price: 332.90,
    market_cap: "6063亿", pe: 27.8, ps: 16.1,
    revenue: "430.3亿", net_income: "220.3亿", net_margin: 51.7,
    revenue_growth: 17.1, fcf: "208.4亿", roe: 60.4, de: 0.67,
    score: 22, rating: "极优质", color: "#1d4ed8",
    daily_patterns: ["杯柄形态（深度12.7%）✓ 已突破", "平底整理（振幅10.7%）"],
    weekly_patterns: ["回踩50日均线"],
    summary: "日线出现杯柄突破叠加平底整理（振幅仅10.7%），是极为紧密的VCP收缩形态，暗示大资金在此区间吸筹。基本面是组合中最强之一：净利润率51.7%，自由现金流208亿美元，PE仅27.8倍，堪称完美。",
    charts: { daily: "/manus-storage/V_daily_033938fd.png", weekly: "/manus-storage/V_weekly_383433ef.png" }
  },
  FSLR: {
    name: "First Solar", sector: "清洁能源", price: 232.97,
    market_cap: "236亿", pe: 14.2, ps: 4.4,
    revenue: "54.2亿", net_income: "16.7亿", net_margin: 30.7,
    revenue_growth: 24.1, fcf: "11.5亿", roe: 18.4, de: 0.06,
    score: 19, rating: "优质", color: "#10b981",
    daily_patterns: ["杯柄形态（深度19.2%）✓ 已突破"],
    weekly_patterns: ["暂无明显形态"],
    summary: "日线出现标准杯柄形态（深度19.2%），已确认突破，是教科书级别的买点形态。基本面优秀，PE仅14.2倍，净利润率30.7%，负债极低（D/E仅0.06），是组合中估值最便宜的优质股之一。",
    charts: { daily: "/manus-storage/FSLR_daily_53c4be69.png", weekly: "/manus-storage/FSLR_weekly_a4d52ef5.png" }
  },
  DUOL: {
    name: "Duolingo", sector: "科技·教育", price: 113.40,
    market_cap: "50亿", pe: 12.4, ps: 4.8,
    revenue: "11亿", net_income: "4.2亿", net_margin: 38.4,
    revenue_growth: 26.5, fcf: "3.1亿", roe: 37.0, de: 6.6,
    score: 18, rating: "优质", color: "#f59e0b",
    daily_patterns: ["暂无明显形态"],
    weekly_patterns: ["杯柄形态（深度13.2%）", "回踩20日均线"],
    summary: "日线处于长期下跌趋势后的底部反弹阶段，周线出现杯柄形态并回踩20周均线，若均线支撑有效可关注反弹机会。基本面极佳，净利润率38.4%，估值仅12.4倍PE，性价比突出。",
    charts: { daily: "/manus-storage/DUOL_daily_a613f140.png", weekly: "/manus-storage/DUOL_weekly_88742def.png" }
  },
  FTNT: {
    name: "Fortinet", sector: "网络安全", price: 126.50,
    market_cap: "899亿", pe: 47.6, ps: 13.1,
    revenue: "71.1亿", net_income: "19.5亿", net_margin: 27.5,
    revenue_growth: 20.1, fcf: "18.1亿", roe: 132.4, de: 0.57,
    score: 17, rating: "优质", color: "#84cc16",
    daily_patterns: ["杯柄形态（深度23.7%）✓ 已突破", "向上突破 +45.3%"],
    weekly_patterns: ["向上突破+放量 +45.5%"],
    summary: "日线和周线均出现强势突破，周线放量突破幅度高达45.5%。在三只网络安全股中，FTNT基本面最扎实：净利润率27.5%，ROE高达132.4%，PE仅47.6倍，是网络安全板块中估值最合理的优质股。",
    charts: { daily: "/manus-storage/FTNT_daily_5d21793e.png", weekly: "/manus-storage/FTNT_weekly_6067f0fb.png" }
  },
  NDAQ: {
    name: "Nasdaq Inc", sector: "金融服务", price: 92.51,
    market_cap: "515亿", pe: 27.4, ps: 6.2,
    revenue: "82.6亿", net_income: "17.9亿", net_margin: 21.6,
    revenue_growth: 11.6, fcf: "15.6亿", roe: 16.2, de: 0.79,
    score: 16, rating: "良好", color: "#3b82f6",
    daily_patterns: ["杯柄形态（深度18.0%）✓ 已突破", "平底整理（振幅11.4%）"],
    weekly_patterns: ["回踩50日均线"],
    summary: "日线同时出现杯柄突破和平底整理两个信号，价格在极窄区间（11.4%振幅）内收缩，是典型的VCP特征。基本面稳健，净利润率21.6%，PE估值合理（27.4倍）。",
    charts: { daily: "/manus-storage/NDAQ_daily_67614755.png", weekly: "/manus-storage/NDAQ_weekly_6badb375.png" }
  },
  VRT: {
    name: "Vertiv Holdings", sector: "工业·数据中心", price: 340.93,
    market_cap: "1306亿", pe: 85.4, ps: 12.3,
    revenue: "108.4亿", net_income: "15.6亿", net_margin: 14.4,
    revenue_growth: 30.1, fcf: "19.6亿", roe: 45.1, de: 0.77,
    score: 16, rating: "良好", color: "#0891b2",
    daily_patterns: ["向上突破+放量 +3.4%", "回踩20日均线"],
    weekly_patterns: ["杯柄形态（深度44.0%）✓ 已突破", "向上突破 +31.3%"],
    summary: "周线完成了一个深度44%的大型杯柄形态并大幅突破（+31.3%），日线目前正在回踩20日均线，是经典的回踩确认买点。受益于AI数据中心建设大周期，营收增速30.1%，ROE高达45.1%。",
    charts: { daily: "/manus-storage/VRT_daily_6bf2f011.png", weekly: "/manus-storage/VRT_weekly_c41e8e0b.png" }
  },
  PANW: {
    name: "Palo Alto Networks", sector: "网络安全", price: 247.55,
    market_cap: "2008亿", pe: 137.5, ps: 21.4,
    revenue: "92.2亿", net_income: "11.3亿", net_margin: 13.0,
    revenue_growth: 14.9, fcf: "34.7亿", roe: 15.5, de: 1.66,
    score: 15, rating: "良好", color: "#f43f5e",
    daily_patterns: ["杯柄形态（深度35.0%）✓ 已突破", "向上突破+放量 +35.3%"],
    weekly_patterns: ["杯柄形态（深度18.5%）✓ 已突破", "向上突破 +12.4%"],
    summary: "日线和周线双重杯柄突破确认，技术面极强。自由现金流高达34.7亿美元，是网络安全中现金流最强的公司。PE高达137倍，估值偏贵，但强劲的现金流提供了一定支撑。",
    charts: { daily: "/manus-storage/PANW_daily_13bf6e49.png", weekly: "/manus-storage/PANW_weekly_0e33758a.png" }
  },
  PWR: {
    name: "Quanta Services", sector: "工业·基础设施", price: 725.19,
    market_cap: "1155亿", pe: 59.7, ps: 4.1,
    revenue: "236.7亿", net_income: "13.5亿", net_margin: 5.7,
    revenue_growth: 13.4, fcf: "12亿", roe: 14.8, de: 0.85,
    score: 13, rating: "一般", color: "#f97316",
    daily_patterns: ["回踩20日均线"],
    weekly_patterns: ["杯柄形态（深度15.4%）✓ 已突破", "向上突破+放量 +28.4%"],
    summary: "周线级别已完成杯柄突破并大幅上涨（+28.4%），日线目前回踩20日均线，是潜在的回踩买点。受益于美国电网基础设施投资大周期。基本面净利润率偏低（5.7%），但营收规模庞大。",
    charts: { daily: "/manus-storage/PWR_daily_f35e6a72.png", weekly: "/manus-storage/PWR_weekly_33a0bfd9.png" }
  },
  CRWD: {
    name: "CrowdStrike", sector: "网络安全", price: 618.83,
    market_cap: "1343亿", pe: 401.8, ps: 27.5,
    revenue: "48.1亿", net_income: "-1.6亿", net_margin: -3.4,
    revenue_growth: 23.3, fcf: "16.0亿", roe: -4.1, de: 0.18,
    score: 12, rating: "一般", color: "#ef4444",
    daily_patterns: ["杯柄形态（深度31.3%）✓ 已突破", "向上突破+放量 +32.6%"],
    weekly_patterns: ["杯柄形态（深度36.8%）✓ 已突破", "向上突破 +14.0%"],
    summary: "技术面最强！日线和周线同时出现杯柄形态突破，且均有放量确认，是组合中技术信号最完美的品种。自由现金流强劲（16亿美元），但GAAP净利润仍为负，PE高达402倍，估值极贵，属于高成长高风险标的。",
    charts: { daily: "/manus-storage/CRWD_daily_0f8ef967.png", weekly: "/manus-storage/CRWD_weekly_eff57343.png" }
  },
  NTNX: {
    name: "Nutanix", sector: "云计算软件", price: 47.67,
    market_cap: "128亿", pe: 51.6, ps: 5.1,
    revenue: "26.9亿", net_income: "2.7亿", net_margin: 9.95,
    revenue_growth: 5.8, fcf: "7.8亿", roe: null, de: null,
    score: 11, rating: "一般", color: "#06b6d4",
    daily_patterns: ["向上突破+放量 +13.0%"],
    weekly_patterns: ["杯柄形态（深度19.7%）"],
    summary: "日线出现放量突破信号（+13%），周线正在构建19.7%深度的杯柄形态。基本面一般，营收增速仅5.8%，净利润率不足10%，属于技术面强于基本面的品种，需谨慎对待。",
    charts: { daily: "/manus-storage/NTNX_daily_5a2560c1.png", weekly: "/manus-storage/NTNX_weekly_1ea45bb4.png" }
  },
  OKTA: {
    name: "Okta Inc", sector: "科技·身份安全", price: 86.73,
    market_cap: "147亿", pe: 64.1, ps: 5.2,
    revenue: "29.2亿", net_income: "2.4亿", net_margin: 8.1,
    revenue_growth: 11.6, fcf: "8.4亿", roe: 3.5, de: 0.06,
    score: 11, rating: "一般", color: "#6366f1",
    daily_patterns: ["向上突破+放量 +7.3%"],
    weekly_patterns: ["回踩50日均线"],
    summary: "日线出现放量突破（+7.3%），但周线仍在50周均线下方承压。基本面偏弱，净利润率仅8.1%，PE高达64倍，估值偏贵。技术面有所改善，但基本面支撑不足，需观察突破能否持续。",
    charts: { daily: "/manus-storage/OKTA_daily_7d836608.png", weekly: "/manus-storage/OKTA_weekly_69111e51.png" }
  },
  ROKU: {
    name: "Roku Inc", sector: "传媒·流媒体", price: 123.71,
    market_cap: "191亿", pe: 96.0, ps: 4.0,
    revenue: "49.7亿", net_income: "2.0亿", net_margin: 4.1,
    revenue_growth: 22.4, fcf: "6.8亿", roe: 7.8, de: 0.19,
    score: 10, rating: "较弱", color: "#ec4899",
    daily_patterns: ["杯柄形态（深度20.9%）✓ 已突破", "向上突破 +4.6%"],
    weekly_patterns: ["杯柄形态（深度42.3%）✓ 已突破", "向上突破+放量 +10.8%"],
    summary: "技术面出现日线和周线双重杯柄突破，技术信号较强。但基本面偏弱，净利润率仅4.1%，PE高达96倍，估值极贵。属于高风险高波动品种，技术面强但基本面支撑不足。",
    charts: { daily: "/manus-storage/ROKU_daily_c54a69a8.png", weekly: "/manus-storage/ROKU_weekly_4594741c.png" }
  },
};

export const TICKER_ORDER = ['LLY','V','FSLR','DUOL','FTNT','NDAQ','VRT','PANW','PWR','CRWD','NTNX','OKTA','ROKU'];

export function getScoreColor(score: number): string {
  if (score >= 20) return "#22c55e";
  if (score >= 16) return "#3b82f6";
  if (score >= 12) return "#f59e0b";
  return "#ef4444";
}

export function getRatingStyle(rating: string): { bg: string; text: string } {
  const map: Record<string, { bg: string; text: string }> = {
    "极优质": { bg: "#14532d", text: "#4ade80" },
    "优质":   { bg: "#1e3a5f", text: "#60a5fa" },
    "良好":   { bg: "#1c3a1c", text: "#86efac" },
    "一般":   { bg: "#3b2a00", text: "#fbbf24" },
    "较弱":   { bg: "#3b0000", text: "#f87171" },
  };
  return map[rating] ?? { bg: "#1a1a2e", text: "#ffffff" };
}

export function getPatternClass(pattern: string): string {
  if (pattern.includes("杯柄")) return "cup";
  if (pattern.includes("平底")) return "flat";
  if (pattern.includes("突破")) return "breakout";
  if (pattern.includes("回踩")) return "pullback";
  if (pattern.includes("VCP")) return "vcp";
  return "none";
}
