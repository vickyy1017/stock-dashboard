export interface SpaceXStock {
  name: string;
  sector: string;
  sectorEn: string;
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
  score: number;
  rating: string;
  ratingEn: string;
  color: string;
  spacex_role: string;
  spacex_role_en: string;
  spacex_supply: string;
  spacex_supply_en: string;
  daily_patterns: string[];
  weekly_patterns: string[];
  daily_patterns_en: string[];
  weekly_patterns_en: string[];
  summary: string;
  summaryEn: string;
  charts: { daily: string; weekly: string };
}

// Scoring: same CANSLIM framework
function scoreMargin(m: number) { return m > 30 ? 5 : m > 20 ? 4 : m > 10 ? 3 : m > 5 ? 2 : m > 0 ? 1 : 0; }
function scoreGrowth(g: number) { return g > 40 ? 5 : g > 25 ? 4 : g > 15 ? 3 : g > 10 ? 2 : g > 5 ? 1 : 0; }
function scorePE(pe: number)    { return pe <= 0 || pe > 500 ? 0 : pe < 20 ? 5 : pe < 35 ? 4 : pe < 60 ? 3 : pe < 100 ? 2 : pe < 200 ? 1 : 0; }
function scoreCap(cap: number)  { return cap > 200 ? 5 : cap > 50 ? 4 : cap > 20 ? 3 : cap > 5 ? 2 : 1; }

export const SPACEX_STOCKS: Record<string, SpaceXStock> = {
  ADI: {
    name: "Analog Devices", sector: "半导体·模拟芯片", sectorEn: "Semiconductors · Analog ICs", price: 219.5,
    market_cap: "1934亿", pe: 59.1, ps: 15.4,
    revenue: "110.2亿", net_income: "22.7亿", net_margin: 26.0,
    revenue_growth: 16.9, fcf: "38.7亿", roe: 9.6,
    score: scoreMargin(26) + scoreGrowth(16.9) + scorePE(59.1) + scoreCap(193.4) + 3,
    rating: "优质", ratingEn: "Quality", color: "#3b82f6",
    spacex_role: "高端太空电源芯片供应商",
    spacex_role_en: "High-end space power chip supplier",
    spacex_supply: "为SpaceX/航天提供模拟信号处理IC、数据转换器、RF/IF组件及电源管理芯片，用于通信、雷达和导航系统",
    spacex_supply_en: "Supplies analog signal processing ICs, data converters, RF/IF components and power management chips for SpaceX/aerospace communication, radar and navigation systems",
    daily_patterns: ["暂无明显形态"],
    weekly_patterns: ["杯柄形态（深度30.1%）✓ 已突破", "向上突破+放量 +12.0%"],
    daily_patterns_en: ["No clear pattern"],
    weekly_patterns_en: ["Cup & Handle (Depth 30.1%) ✓ Breakout", "Breakout +12.0% with Volume"],
    summary: "周线完成深度30.1%的杯柄形态突破，技术面强势。ADI是模拟半导体巨头，为SpaceX提供关键的信号处理和电源管理芯片。净利润率26%，营收增速16.9%，基本面扎实。PE 59倍偏高但现金流充裕（38.7亿美元）。",
    summaryEn: "Weekly completed a 30.1% Cup & Handle breakout with volume. ADI is an analog semiconductor giant supplying critical signal processing and power management chips to SpaceX. 26% net margin, 16.9% revenue growth, solid fundamentals. P/E of 59x is elevated but FCF of $3.87B provides strong support.",
    charts: { daily: "/charts/ADI_daily.png", weekly: "/charts/ADI_weekly.png" }
  },
  TXN: {
    name: "Texas Instruments", sector: "半导体·模拟芯片", sectorEn: "Semiconductors · Analog ICs", price: 188.5,
    market_cap: "2814亿", pe: 53.0, ps: 15.3,
    revenue: "176.8亿", net_income: "50亿", net_margin: 29.1,
    revenue_growth: 13.0, fcf: "16.9亿", roe: 32.4,
    score: scoreMargin(29.1) + scoreGrowth(13) + scorePE(53) + scoreCap(281.4) + 4,
    rating: "优质", ratingEn: "Quality", color: "#f59e0b",
    spacex_role: "高端太空电源芯片供应商",
    spacex_role_en: "High-end space power chip supplier",
    spacex_supply: "为SpaceX Starlink卫星星座提供芯片和半导体，包括电源管理IC和嵌入式处理器",
    spacex_supply_en: "Supplies chips and semiconductors for SpaceX Starlink constellation, including power management ICs and embedded processors",
    daily_patterns: ["杯柄形态（深度24.9%）✓ 已突破", "向上突破 +6.8%"],
    weekly_patterns: ["向上突破+放量 +37.4%"],
    daily_patterns_en: ["Cup & Handle (Depth 24.9%) ✓ Breakout", "Breakout +6.8%"],
    weekly_patterns_en: ["Breakout +37.4% with Volume"],
    summary: "日线出现杯柄突破，周线强势放量上涨+37.4%。TXN是全球最大的模拟芯片公司之一，为Starlink提供关键芯片。净利润率29.1%，ROE 32.4%，基本面优秀。PE 53倍，估值合理。",
    summaryEn: "Daily Cup & Handle breakout, weekly surged +37.4% with volume. TXN is one of the world's largest analog chip companies, supplying key chips to Starlink. 29.1% net margin, 32.4% ROE, excellent fundamentals. P/E of 53x is reasonable for this quality.",
    charts: { daily: "/charts/TXN_daily.png", weekly: "/charts/TXN_weekly.png" }
  },
  GLW: {
    name: "Corning", sector: "光学材料·通信", sectorEn: "Optical Materials · Communications", price: 55.8,
    market_cap: "1670亿", pe: 93.3, ps: 10.4,
    revenue: "156.3亿", net_income: "16亿", net_margin: 11.1,
    revenue_growth: 19.1, fcf: "6.1亿", roe: 16.7,
    score: scoreMargin(11.1) + scoreGrowth(19.1) + scorePE(93.3) + scoreCap(167) + 3,
    rating: "良好", ratingEn: "Good", color: "#06b6d4",
    spacex_role: "太阳能板玻璃·光学组件供应商",
    spacex_role_en: "Solar panel glass & optical components supplier",
    spacex_supply: "为航天提供熔融石英空间飞行器窗口、望远镜镜面坯料、导弹整流罩及猎户座飞船窗口（HPFS熔融石英）",
    spacex_supply_en: "Supplies fused silica spacecraft windows, telescope mirror blanks, missile domes, and Orion spacecraft windows (HPFS fused silica) for aerospace",
    daily_patterns: ["向上突破 +6.9%"],
    weekly_patterns: ["杯柄形态（深度12.8%）✓ 已突破", "向上突破+放量 +29.3%"],
    daily_patterns_en: ["Breakout +6.9%"],
    weekly_patterns_en: ["Cup & Handle (Depth 12.8%) ✓ Breakout", "Breakout +29.3% with Volume"],
    summary: "周线完成杯柄突破并放量上涨+29.3%，技术面强势。Corning是航天光学材料的核心供应商，提供飞船窗口和光纤组件。营收增速19.1%，但PE高达93倍，净利润率偏低（11.1%）。",
    summaryEn: "Weekly Cup & Handle breakout with +29.3% volume surge. Corning is a key aerospace optical materials supplier providing spacecraft windows and fiber optic components. 19.1% revenue growth, but P/E of 93x is high and net margin of 11.1% is modest.",
    charts: { daily: "/charts/GLW_daily.png", weekly: "/charts/GLW_weekly.png" }
  },
  IFNNY: {
    name: "Infineon Technologies", sector: "半导体·功率器件", sectorEn: "Semiconductors · Power Devices", price: 25.4,
    market_cap: "617亿", pe: 31.0, ps: 6.2,
    revenue: "162.2亿", net_income: "11.2亿", net_margin: 6.9,
    revenue_growth: 5.0, fcf: "11.8亿", roe: 5.9,
    score: scoreMargin(6.9) + scoreGrowth(5) + scorePE(31) + scoreCap(61.7) + 3,
    rating: "良好", ratingEn: "Good", color: "#8b5cf6",
    spacex_role: "抗辐射半导体·SpaceX官方合作伙伴",
    spacex_role_en: "Radiation-hardened semiconductors · Official SpaceX partner",
    spacex_supply: "SpaceX官方合作伙伴，提供抗辐射内存、功率器件和RF解决方案，用于卫星、航空电子和太空通信",
    spacex_supply_en: "Official SpaceX partner supplying radiation-hardened memory, power devices and RF solutions for satellites, avionics and space communications",
    daily_patterns: ["杯柄形态（深度14.4%）✓ 已突破", "向上突破+放量 +17.4%"],
    weekly_patterns: ["杯柄形态（深度30.8%）✓ 已突破", "向上突破+放量 +58.2%"],
    daily_patterns_en: ["Cup & Handle (Depth 14.4%) ✓ Breakout", "Breakout +17.4% with Volume"],
    weekly_patterns_en: ["Cup & Handle (Depth 30.8%) ✓ Breakout", "Breakout +58.2% with Volume"],
    summary: "日线和周线双重杯柄突破，是SpaceX相关股中技术面最强的品种之一。作为SpaceX官方合作伙伴，提供抗辐射半导体。PE仅31倍，估值合理，但净利润率偏低（6.9%）。",
    summaryEn: "Dual Cup & Handle breakouts on daily and weekly — one of the strongest technicals in the SpaceX group. As an official SpaceX partner supplying radiation-hardened semiconductors, IFNNY has a direct revenue link. P/E of 31x is reasonable, but 6.9% net margin is modest.",
    charts: { daily: "/charts/IFNNY_daily.png", weekly: "/charts/IFNNY_weekly.png" }
  },
  STM: {
    name: "STMicroelectronics", sector: "半导体·Starlink芯片", sectorEn: "Semiconductors · Starlink Chips", price: 31.5,
    market_cap: "355亿", pe: 74.5, ps: 4.9,
    revenue: "118亿", net_income: "1.7亿", net_margin: 11.7,
    revenue_growth: -11.1, fcf: -0.12,
    roe: 8.9,
    score: scoreMargin(11.7) + scoreGrowth(-11.1) + scorePE(74.5) + scoreCap(35.5) + 2,
    rating: "一般", ratingEn: "Average", color: "#ec4899",
    spacex_role: "Starlink天线芯片直接供应商",
    spacex_role_en: "Direct Starlink antenna chip supplier",
    spacex_supply: "为SpaceX Starlink卫星网络定制射频天线芯片，以及卫星间激光链路组件",
    spacex_supply_en: "Supplies custom RF antenna chips for SpaceX Starlink satellite network and inter-satellite laser link components",
    daily_patterns: ["杯柄形态（深度27.7%）✓ 已突破", "向上突破 +15.4%"],
    weekly_patterns: ["向上突破+放量 +99.4%"],
    daily_patterns_en: ["Cup & Handle (Depth 27.7%) ✓ Breakout", "Breakout +15.4%"],
    weekly_patterns_en: ["Breakout +99.4% with Volume"],
    summary: "周线出现极强的放量突破（+99.4%），技术面非常强势。STM是Starlink天线芯片的直接供应商，与SpaceX有直接业务关系。但营收同比下降-11.1%，基本面偏弱，属于技术面强于基本面的品种。",
    summaryEn: "Weekly shows an extremely strong volume breakout (+99.4%). STM is a direct Starlink antenna chip supplier with a direct business relationship with SpaceX. However, revenue declined -11.1% YoY — technicals lead fundamentals here. Watch for revenue recovery.",
    charts: { daily: "/charts/STM_daily.png", weekly: "/charts/STM_weekly.png" }
  },
  TSEM: {
    name: "Tower Semiconductor", sector: "半导体·晶圆代工", sectorEn: "Semiconductors · Foundry", price: 56.2,
    market_cap: "337亿", pe: 131.8, ps: 19.9,
    revenue: "15.7亿", net_income: "2.2亿", net_margin: 14.1,
    revenue_growth: 9.1, fcf: "3.2亿", roe: 8.7,
    score: scoreMargin(14.1) + scoreGrowth(9.1) + scorePE(131.8) + scoreCap(33.7) + 2,
    rating: "一般", ratingEn: "Average", color: "#f97316",
    spacex_role: "航天国防晶圆代工",
    spacex_role_en: "Aerospace & defense semiconductor foundry",
    spacex_supply: "为美国航天和国防提供战略性本土晶圆代工服务，包括SiGe和SiPho等特殊工艺集成电路",
    spacex_supply_en: "Provides strategic on-shore foundry services for US aerospace and defense using specialty processes like SiGe and SiPho integrated circuits",
    daily_patterns: ["向上突破 +25.2%"],
    weekly_patterns: ["杯柄形态（深度32.9%）✓ 已突破", "向上突破+放量 +64.9%"],
    daily_patterns_en: ["Breakout +25.2%"],
    weekly_patterns_en: ["Cup & Handle (Depth 32.9%) ✓ Breakout", "Breakout +64.9% with Volume"],
    summary: "周线完成深度32.9%的杯柄突破并大幅上涨+64.9%，技术面强势。TSEM是美国航天国防的本土晶圆代工商，受益于供应链本土化趋势。但PE高达131倍，估值极贵，营收增速仅9.1%。",
    summaryEn: "Weekly Cup & Handle breakout (+64.9%) is very strong. TSEM benefits from the US aerospace defense onshoring trend as a domestic foundry. However, P/E of 131x is very expensive for only 9.1% revenue growth. High risk/reward.",
    charts: { daily: "/charts/TSEM_daily.png", weekly: "/charts/TSEM_weekly.png" }
  },
  AXTI: {
    name: "AXT Inc", sector: "半导体·化合物衬底", sectorEn: "Semiconductors · Compound Substrates", price: 9.8,
    market_cap: "6.8亿", pe: -1, ps: 50.6,
    revenue: "0.9亿", net_income: "-0.1亿", net_margin: -14.7,
    revenue_growth: 39.1, fcf: -0.02, roe: -5.0,
    score: 0 + scoreGrowth(39.1) + 0 + 1 + 1,
    rating: "较弱", ratingEn: "Weak", color: "#84cc16",
    spacex_role: "磷化铟·砷化镓·锗衬底供应商",
    spacex_role_en: "InP · GaAs · Germanium substrate supplier",
    spacex_supply: "提供卫星太阳能电池多结锗衬底、卫星通信砷化镓衬底、光纤激光磷化铟衬底",
    spacex_supply_en: "Supplies germanium substrates for multi-junction satellite solar cells, GaAs for satellite communications, and InP for fiber optic lasers",
    daily_patterns: ["杯柄形态（深度16.5%）✓ 已突破", "向上突破 +30.9%"],
    weekly_patterns: ["向上突破+放量 +132.3%"],
    daily_patterns_en: ["Cup & Handle (Depth 16.5%) ✓ Breakout", "Breakout +30.9%"],
    weekly_patterns_en: ["Breakout +132.3% with Volume"],
    summary: "周线出现惊人的+132.3%放量突破，是SpaceX相关股中涨幅最大的品种。AXTI提供卫星太阳能电池的关键锗衬底材料，营收增速39.1%。但公司目前仍亏损（净利润率-14.7%），市值极小（6.8亿），属于高风险小盘股。",
    summaryEn: "Weekly shows a stunning +132.3% volume breakout — the biggest mover in the SpaceX group. AXTI supplies critical germanium substrates for satellite solar cells with 39.1% revenue growth. However, still unprofitable (-14.7% margin) and tiny market cap ($680M) — very high risk small cap.",
    charts: { daily: "/charts/AXTI_daily.png", weekly: "/charts/AXTI_weekly.png" }
  },
  ARM: {
    name: "ARM Holdings", sector: "半导体·IP授权", sectorEn: "Semiconductors · IP Licensing", price: 134.5,
    market_cap: "2732亿", pe: 302.0, ps: 55.7,
    revenue: "49.2亿", net_income: "9亿", net_margin: 18.4,
    revenue_growth: 22.8, fcf: "7.7亿", roe: 12.0,
    score: scoreMargin(18.4) + scoreGrowth(22.8) + 0 + scoreCap(273.2) + 3,
    rating: "一般", ratingEn: "Average", color: "#a78bfa",
    spacex_role: "处理器架构基础技术提供商",
    spacex_role_en: "Processor architecture foundational technology provider",
    spacex_supply: "ARM处理器架构被广泛用于嵌入式系统，SpaceX供应链中的多个芯片供应商（如STM、IFNNY）使用ARM架构设计芯片",
    spacex_supply_en: "ARM processor architecture is widely used in embedded systems; multiple SpaceX chip suppliers (STM, IFNNY) use ARM architecture to design their chips",
    daily_patterns: ["杯柄形态（深度39.2%）✓ 已突破", "向上突破+放量 +29.2%"],
    weekly_patterns: ["向上突破+放量 +79.6%"],
    daily_patterns_en: ["Cup & Handle (Depth 39.2%) ✓ Breakout", "Breakout +29.2% with Volume"],
    weekly_patterns_en: ["Breakout +79.6% with Volume"],
    summary: "日线和周线均出现强势突破，技术面极强。ARM是AI时代的核心基础设施，几乎所有移动芯片和越来越多的数据中心芯片都使用ARM架构。但PE高达302倍，是组合中估值最贵的股票，纯靠AI增长预期支撑。",
    summaryEn: "Strong breakouts on both daily and weekly. ARM is core AI-era infrastructure — nearly all mobile chips and increasingly data center chips use ARM architecture. However, P/E of 302x is the most expensive in the group, entirely dependent on AI growth expectations materializing.",
    charts: { daily: "/charts/ARM_daily.png", weekly: "/charts/ARM_weekly.png" }
  },
};

export const SPACEX_TICKER_ORDER = ['ADI', 'TXN', 'IFNNY', 'GLW', 'ARM', 'STM', 'TSEM', 'AXTI'];

export function getSpaceXScoreColor(score: number): string {
  if (score >= 18) return "#22c55e";
  if (score >= 13) return "#3b82f6";
  if (score >= 9)  return "#f59e0b";
  return "#ef4444";
}
