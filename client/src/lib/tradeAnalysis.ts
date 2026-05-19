// 基于 ZST 炒股与禅心 CANSLIM 笔记的详细交易分析
// 数据基于 2026-05-19 价格快照

export type SignalLevel = "强烈" | "中等" | "弱" | "无";
export type RiskLevel = "低" | "中" | "高" | "极高";
export type BaseStage = 1 | 2 | 3 | 4;

export interface EntryPoint {
  type: string;           // 买点类型
  price: number;          // 买入价格
  priceDesc: string;      // 价格描述
  condition: string;      // 触发条件
  maxEntry: number;       // 最晚买入价（超过此价不追）
  priority: "主要" | "次要" | "加仓";
}

export interface ExitPoint {
  type: string;           // 卖点类型
  price: number;
  priceDesc: string;
  condition: string;
  signal: "进攻性" | "防守性";
}

export interface StopLoss {
  price: number;
  pct: number;            // 距当前价格的百分比
  rule: string;           // 对应哪条规则
}

export interface TakeProfit {
  target1: number;        // 第一目标
  target1Pct: number;
  target2: number;        // 第二目标
  target2Pct: number;
  target3?: number;
  target3Pct?: number;
}

export interface TradeAnalysis {
  ticker: string;
  currentPrice: number;
  baseStage: BaseStage;
  baseType: string;        // 底部类型
  baseQuality: "标准" | "有缺陷" | "待观察";
  baseQualityNote: string;
  pivotPoint: number;      // 关键突破点
  pivotDesc: string;
  distFromPivot: number;   // 当前价距pivot的%
  entries: EntryPoint[];
  exits: ExitPoint[];
  stopLoss: StopLoss;
  takeProfit: TakeProfit;
  riskLevel: RiskLevel;
  riskRewardRatio: string; // 风险回报比
  risks: string[];         // 主要风险点
  canslimScore: {
    C: number; // Current Earnings
    A: number; // Annual Earnings
    N: number; // New Product/Catalyst
    S: number; // Supply & Demand
    L: number; // Leader
    I: number; // Institutional
    M: number; // Market (same for all)
  };
  canslimNote: string;
  overallSignal: SignalLevel;
  tradeNote: string;       // 综合交易建议
  positionSizing: string;  // 仓位建议
}

// 当前市场环境（M因子）：大盘处于反弹阶段，需谨慎
const MARKET_M_SCORE = 3; // 1-5分

export const TRADE_ANALYSIS: Record<string, TradeAnalysis> = {
  LLY: {
    ticker: "LLY",
    currentPrice: 988.09,
    baseStage: 2,
    baseType: "杯柄形（Cup with Handle）",
    baseQuality: "标准",
    baseQualityNote: "周线级别完成了深度34.5%的杯柄形，已突破并进入主升浪第二阶段。目前回踩20周均线，是经典的加仓/建仓机会。底部内积累周多于派发周，机构背书明显。",
    pivotPoint: 1021.06,
    pivotDesc: "近期高点，突破此位确认新一波上涨",
    distFromPivot: -3.2,
    entries: [
      {
        type: "回踩10周均线加仓（B2）",
        price: 988.09,
        priceDesc: "当前价格即在10周均线附近（~$985），是标准加仓点",
        condition: "价格在10周均线附近有支撑，且量缩（机构护盘）",
        maxEntry: 1010.0,
        priority: "主要",
      },
      {
        type: "突破近期高点建仓（B1）",
        price: 1021.16,
        priceDesc: "突破$1021高点上方10美分",
        condition: "放量突破 >+40% 平均量，当天收盘在高位",
        maxEntry: 1072.0,
        priority: "次要",
      },
    ],
    exits: [
      {
        type: "进攻性卖出：突破上轨道线",
        price: 1200.0,
        priceDesc: "估算上轨道线位置（需在周线图实际画线确认）",
        condition: "1-3周内涨幅超过+25%，出现抛物线式上涨，或突破上轨道线",
        signal: "进攻性",
      },
      {
        type: "防守性卖出：跌破10周均线",
        price: 936.0,
        priceDesc: "10周均线附近（~$938），跌破-5%约$891",
        condition: "周五收盘 < 10周均线×0.95，且周量>均量+30%，且周收盘范围<40%",
        signal: "防守性",
      },
    ],
    stopLoss: {
      price: 912.0,
      pct: -7.7,
      rule: "跌破Pivot Point -8%（$1021×0.92=$939为突破买入止损；回踩买入以$988×0.92=$909为止损）",
    },
    takeProfit: {
      target1: 1100.0,
      target1Pct: 11.3,
      target2: 1250.0,
      target2Pct: 26.5,
      target3: 1400.0,
      target3Pct: 41.7,
    },
    riskLevel: "中",
    riskRewardRatio: "1:3.5（止损-8%，目标+25%）",
    risks: [
      "GLP-1药物竞争加剧（礼来、诺和诺德、安进均在布局）",
      "估值偏高（PE 33.7倍），任何盈利不及预期将大幅下跌",
      "目前处于第二阶段底部，若突破失败则进入第三阶段，风险大幅提升",
      "整体账户回撤超过-15%时，无论信号如何应全部清仓",
      "周线图若出现Railroad Tracks（一周大涨下周同等大跌）需立即减仓",
    ],
    canslimScore: { C: 5, A: 5, N: 5, S: 4, L: 5, I: 5, M: MARKET_M_SCORE },
    canslimNote: "C/A：当季/年度盈利增速>25%（GLP-1驱动营收+56%）✓ N：Mounjaro/Zepbound新产品催化剂极强 ✓ S：机构持续买入，量价配合 ✓ L：医药板块绝对领头股 ✓ I：机构持股持续增加 ✓",
    overallSignal: "强烈",
    tradeNote: "LLY是组合中基本面最强的TML高富帅股。目前处于第二阶段底部突破后的回踩阶段，是CANSLIM体系中最佳的加仓时机。建议以当前价格附近（$980-$1000）建立B1仓位，等待突破$1021后加仓B2。严格执行-8%止损规则。",
    positionSizing: "B1建仓：总资金×1%风险，止损-8%，仓位=风险金额÷8%÷当前价格",
  },

  V: {
    ticker: "V",
    currentPrice: 332.64,
    baseStage: 2,
    baseType: "平底形（Flat Base）+ 杯柄形",
    baseQuality: "标准",
    baseQualityNote: "日线出现极为紧密的平底整理（振幅仅10.7%），是VCP波动收缩的体现。底部内多周tight weeks，量逐渐干涸，是机构吸筹的典型信号。RS线接近新高。",
    pivotPoint: 341.27,
    pivotDesc: "平底形左侧高点，突破此位为标准买入点",
    distFromPivot: -2.5,
    entries: [
      {
        type: "平底形突破买入（B1）",
        price: 341.37,
        priceDesc: "平底形左侧高点$341.27上方10美分",
        condition: "突破时放量 >+40% 平均量，当天收盘在高位（收盘范围>60%）",
        maxEntry: 358.0,
        priority: "主要",
      },
      {
        type: "当前回踩10周均线加仓",
        price: 332.64,
        priceDesc: "当前价格接近10周均线（~$323），已有支撑迹象",
        condition: "量缩回踩，不破$315（10周均线-5%）",
        maxEntry: 341.0,
        priority: "次要",
      },
    ],
    exits: [
      {
        type: "进攻性卖出：接近52周高点",
        price: 357.14,
        priceDesc: "52周高点$357.14附近，可部分止盈",
        condition: "接近历史高点时出现Stalling Action（量大价不动）或Downside Reversal",
        signal: "进攻性",
      },
      {
        type: "防守性卖出：跌破10周均线",
        price: 306.9,
        priceDesc: "10周均线$323×0.95≈$307",
        condition: "周五收盘<$307，且周量>均量+30%，且周收盘范围<40%",
        signal: "防守性",
      },
    ],
    stopLoss: {
      price: 314.0,
      pct: -5.6,
      rule: "突破买入止损：$341×0.92=$314；当前回踩买入止损：$332×0.92=$306",
    },
    takeProfit: {
      target1: 370.0,
      target1Pct: 11.3,
      target2: 410.0,
      target2Pct: 23.3,
      target3: 450.0,
      target3Pct: 35.3,
    },
    riskLevel: "低",
    riskRewardRatio: "1:4（止损-8%，目标+20%以上）",
    risks: [
      "监管风险：美国反垄断调查可能限制Visa的市场份额",
      "数字货币/加密货币支付崛起可能长期威胁传统支付网络",
      "目前价格距52周高点仍有-7%，需要突破历史高点才能确认新一波主升浪",
      "若大盘进入熊市，即使基本面再好也难逃下跌",
    ],
    canslimScore: { C: 4, A: 5, N: 3, S: 5, L: 5, I: 5, M: MARKET_M_SCORE },
    canslimNote: "C/A：盈利稳健增长，净利润率51.7% ✓ N：无重大新催化剂，但护城河极强 S：平底形内量缩，突破时需放量确认 ✓ L：金融支付板块绝对领头股 ✓ I：机构持股稳定，是标普500核心持仓",
    overallSignal: "强烈",
    tradeNote: "V是组合中风险回报比最佳的品种之一。平底形+VCP收缩信号极为健康，是CANSLIM体系中最理想的买点形态。建议等待突破$341.37放量确认后建仓，或在当前$330-$335区间少量试仓（回踩10周均线）。",
    positionSizing: "B1建仓：总资金×1%风险，止损-8%；突破后可追加B2",
  },

  FSLR: {
    ticker: "FSLR",
    currentPrice: 233.64,
    baseStage: 1,
    baseType: "杯柄形（Cup with Handle）",
    baseQuality: "标准",
    baseQualityNote: "日线走出深度19.2%的杯柄形，已确认突破。杯身为U型（非V型），柄在上半部形成，量缩洗盘特征明显。突破时放量确认，是第一阶段底部突破，赢率最高。",
    pivotPoint: 220.0,
    pivotDesc: "杯柄突破点（柄顶上方），已突破并上涨约+6%",
    distFromPivot: 6.2,
    entries: [
      {
        type: "突破后回踩买入（B1）",
        price: 220.0,
        priceDesc: "若回踩至突破点$220附近（10日均线支撑）",
        condition: "量缩回踩至$215-$225区间，不破$210",
        maxEntry: 231.0,
        priority: "主要",
      },
      {
        type: "当前价追买（已超出5%买入区间，风险较高）",
        price: 233.64,
        priceDesc: "当前价已超出理想买入区间（$220×1.05=$231），追买风险偏高",
        condition: "仅在大盘强势且个股量价配合良好时考虑",
        maxEntry: 231.0,
        priority: "次要",
      },
    ],
    exits: [
      {
        type: "进攻性卖出：接近52周高点",
        price: 280.0,
        priceDesc: "接近52周高点$285.99，可分批止盈",
        condition: "出现Climax Top信号：1-3周涨幅>+25%，或单日最大涨幅出现",
        signal: "进攻性",
      },
      {
        type: "防守性卖出：跌破10周均线",
        price: 215.0,
        priceDesc: "10周均线约$226×0.95≈$215",
        condition: "周五收盘<$215，且周量>均量+30%，且周收盘范围<40%",
        signal: "防守性",
      },
    ],
    stopLoss: {
      price: 202.0,
      pct: -13.5,
      rule: "突破买入止损：$220×0.92=$202；当前价买入止损：$233×0.92=$215（注意：当前已超出理想买入区间，止损空间更大）",
    },
    takeProfit: {
      target1: 265.0,
      target1Pct: 13.4,
      target2: 300.0,
      target2Pct: 28.4,
      target3: 340.0,
      target3Pct: 45.5,
    },
    riskLevel: "中",
    riskRewardRatio: "1:3（止损-8%，目标+20%）",
    risks: [
      "当前价格已超出理想买入区间（突破点+5%以上），追买风险偏高",
      "太阳能行业受政策影响大（关税、补贴政策变化）",
      "竞争对手（中国太阳能厂商）价格战压力",
      "第一阶段底部突破，若大盘转弱可能快速回调",
    ],
    canslimScore: { C: 4, A: 4, N: 4, S: 4, L: 4, I: 3, M: MARKET_M_SCORE },
    canslimNote: "C/A：盈利增速强劲（净利润率30.7%，营收+24%）✓ N：美国本土制造优势+关税保护 ✓ S：突破放量确认 ✓ L：清洁能源板块领头股 ✓ I：机构持股中等，需关注是否持续增加",
    overallSignal: "中等",
    tradeNote: "FSLR已完成杯柄突破，但当前价格已超出理想买入区间（$220-$231）。建议等待回踩至$215-$225区间再建仓，或等待形成新的平底形后再买入。不建议在当前价格追买。",
    positionSizing: "等待回踩后建仓，B1风险控制在总资金1%",
  },

  DUOL: {
    ticker: "DUOL",
    currentPrice: 113.24,
    baseStage: 1,
    baseType: "底部反弹（疑似杯柄形成中）",
    baseQuality: "待观察",
    baseQualityNote: "日线处于长期下跌后的底部反弹阶段，周线出现杯柄雏形（深度13.2%）并回踩20周均线。目前尚未确认突破，需观察是否能站稳均线并形成完整柄部。底部质量待进一步确认。",
    pivotPoint: 115.93,
    pivotDesc: "近期高点，突破此位才能确认底部形成",
    distFromPivot: -2.3,
    entries: [
      {
        type: "突破近期高点建仓（B1）",
        price: 116.03,
        priceDesc: "突破$115.93高点上方10美分",
        condition: "放量突破（>+40%平均量），且大盘同步强势",
        maxEntry: 121.8,
        priority: "主要",
      },
      {
        type: "等待完整杯柄形成后买入",
        price: 0,
        priceDesc: "目前尚未形成完整柄部，建议等待",
        condition: "柄部形成（1-4周量缩回调），然后放量突破柄顶",
        maxEntry: 0,
        priority: "次要",
      },
    ],
    exits: [
      {
        type: "进攻性卖出：接近前高",
        price: 160.0,
        priceDesc: "接近前期高点区域，可分批止盈",
        condition: "出现Stalling Action或Downside Reversal Week",
        signal: "进攻性",
      },
      {
        type: "防守性卖出：跌破20周均线",
        price: 102.7,
        priceDesc: "20周均线约$108×0.95≈$103",
        condition: "周五收盘跌破20周均线-5%，且放量",
        signal: "防守性",
      },
    ],
    stopLoss: {
      price: 106.7,
      pct: -5.8,
      rule: "跌破Pivot Point -8%（$116×0.92=$107），或跌破近期低点$87.89则底部形态完全破坏",
    },
    takeProfit: {
      target1: 140.0,
      target1Pct: 23.6,
      target2: 170.0,
      target2Pct: 50.1,
    },
    riskLevel: "高",
    riskRewardRatio: "1:4（止损-8%，目标+25%以上）",
    risks: [
      "底部形态尚未完全确认，可能是反弹而非真正的底部突破",
      "日线仍处于长期下跌趋势中（价格远低于200日均线）",
      "市值偏小（$50亿），流动性相对不足，波动更大",
      "需要大盘配合，熊市或震荡市中此类小市值成长股失败率极高",
      "CANSLIM规则：宁愿买得晚些也不要抢跑，等待突破确认再动手",
    ],
    canslimScore: { C: 4, A: 4, N: 4, S: 2, L: 3, I: 2, M: MARKET_M_SCORE },
    canslimNote: "C/A：盈利增速强（净利润率38.4%，营收+26.5%）✓ N：AI驱动的语言学习新范式 ✓ S：目前量价信号尚未确认突破 ✗ L：教育科技板块，非主流领头板块 I：机构持股待确认增加",
    overallSignal: "弱",
    tradeNote: "DUOL基本面极佳但技术面尚未确认。根据CANSLIM原则'永远不要早去参加派对'，建议等待底部形态完全确认（形成完整杯柄并放量突破）后再建仓。当前价格不宜追买。",
    positionSizing: "等待确认后少量试仓，B1风险控制在总资金0.5%（高风险品种减半）",
  },

  FTNT: {
    ticker: "FTNT",
    currentPrice: 126.5,
    baseStage: 1,
    baseType: "杯柄形突破 + 强势上涨",
    baseQuality: "标准",
    baseQualityNote: "完成杯柄形突破后强势上涨+45%，目前接近52周高点（$126.61）。周线放量突破确认机构积极买入。但需注意：当前价格已大幅超出理想买入区间，需警惕Climax Top风险。",
    pivotPoint: 90.0,
    pivotDesc: "原始突破点（已大幅超出），当前处于主升浪中",
    distFromPivot: 40.6,
    entries: [
      {
        type: "等待回踩10周均线加仓（B2）",
        price: 112.0,
        priceDesc: "10周均线约$112，回踩此位是加仓机会",
        condition: "量缩回踩至$108-$115区间，不破$106（10周均线-5%）",
        maxEntry: 115.0,
        priority: "主要",
      },
      {
        type: "当前价格已超出理想区间，不建议追买",
        price: 0,
        priceDesc: "当前价距突破点已+45%，追买风险极高",
        condition: "不适用",
        maxEntry: 0,
        priority: "次要",
      },
    ],
    exits: [
      {
        type: "进攻性卖出：Climax Top信号",
        price: 150.0,
        priceDesc: "若出现抛物线式上涨（1-3周涨+25%以上）",
        condition: "连续7-8天上涨，或出现最大单日涨幅，或突破上轨道线",
        signal: "进攻性",
      },
      {
        type: "防守性卖出：跌破10周均线",
        price: 106.4,
        priceDesc: "10周均线$112×0.95≈$106",
        condition: "周五收盘<$106，且周量>均量+30%，且周收盘范围<40%",
        signal: "防守性",
      },
    ],
    stopLoss: {
      price: 116.0,
      pct: -8.3,
      rule: "若在$126附近持有：止损$116（-8%）；若等待回踩$112买入：止损$103（-8%）",
    },
    takeProfit: {
      target1: 145.0,
      target1Pct: 14.6,
      target2: 165.0,
      target2Pct: 30.4,
    },
    riskLevel: "中",
    riskRewardRatio: "1:2（当前价追买风险回报比较低）",
    risks: [
      "当前价格距突破点已+45%，远超理想买入区间，追买风险极高",
      "接近52周高点（$126.61），可能遇到阻力",
      "需警惕Climax Top：若短期内再涨+25%，应主动卖出",
      "网络安全行业竞争激烈（CRWD、PANW均在抢占市场份额）",
      "ROE 132.4%异常高，需确认是否可持续",
    ],
    canslimScore: { C: 4, A: 4, N: 4, S: 5, L: 4, I: 4, M: MARKET_M_SCORE },
    canslimNote: "C/A：盈利稳健（净利润率27.5%，ROE 132.4%）✓ N：AI安全+网络融合新产品线 ✓ S：周线放量突破，机构大量买入 ✓ L：网络安全板块中估值最合理的领头股 ✓ I：机构持股持续增加",
    overallSignal: "中等",
    tradeNote: "FTNT技术面极强，但当前价格已大幅超出理想买入区间。根据CANSLIM规则，超出突破点+5%以上不宜追买。建议等待回踩10周均线（$108-$115区间）后建仓，或等待形成新的平底形后再买入。",
    positionSizing: "等待回踩后建仓，B1风险控制在总资金1%",
  },

  NDAQ: {
    ticker: "NDAQ",
    currentPrice: 92.6,
    baseStage: 2,
    baseType: "杯柄形 + 平底形（中继）",
    baseQuality: "标准",
    baseQualityNote: "杯柄形突破后形成平底整理（振幅11.4%），是主升浪中的中继图形。平底形内波动极小，量逐渐干涸，是VCP收缩特征。RS线接近新高，机构背书良好。",
    pivotPoint: 93.16,
    pivotDesc: "平底形左侧高点，突破此位为买入信号",
    distFromPivot: -0.6,
    entries: [
      {
        type: "平底形突破买入（B1）",
        price: 93.26,
        priceDesc: "突破$93.16上方10美分",
        condition: "放量突破（>+40%平均量），收盘在高位",
        maxEntry: 97.9,
        priority: "主要",
      },
      {
        type: "当前价试仓（接近突破点）",
        price: 92.6,
        priceDesc: "当前价距突破点仅-0.6%，可少量试仓",
        condition: "大盘同步强势，个股量价配合",
        maxEntry: 97.9,
        priority: "次要",
      },
    ],
    exits: [
      {
        type: "进攻性卖出：接近52周高点",
        price: 101.47,
        priceDesc: "52周高点$101.47，可分批止盈",
        condition: "接近高点时出现Stalling Action或量大价不动",
        signal: "进攻性",
      },
      {
        type: "防守性卖出：跌破10周均线",
        price: 85.4,
        priceDesc: "10周均线约$89.9×0.95≈$85",
        condition: "周五收盘<$85，且周量>均量+30%，且周收盘范围<40%",
        signal: "防守性",
      },
    ],
    stopLoss: {
      price: 85.8,
      pct: -7.3,
      rule: "突破买入止损：$93×0.92=$86；当前价买入止损：$92.6×0.92=$85",
    },
    takeProfit: {
      target1: 105.0,
      target1Pct: 13.4,
      target2: 120.0,
      target2Pct: 29.6,
    },
    riskLevel: "低",
    riskRewardRatio: "1:3.5（止损-8%，目标+25%）",
    risks: [
      "金融服务板块受利率环境影响较大",
      "若大盘（纳斯达克指数）下跌，NDAQ作为交易所运营商也会受影响",
      "营收增速仅11.6%，相对较慢，可能不是机构最优先配置的品种",
      "平底形突破后若大盘转弱，可能快速回到底部",
    ],
    canslimScore: { C: 4, A: 4, N: 3, S: 4, L: 4, I: 4, M: MARKET_M_SCORE },
    canslimNote: "C/A：盈利稳健（净利润率21.6%，营收+11.6%）✓ N：数据分析和金融科技转型 S：平底形内量缩，接近突破 ✓ L：金融服务板块领头股 ✓ I：机构持股稳定",
    overallSignal: "中等",
    tradeNote: "NDAQ处于平底形突破前夕，是CANSLIM体系中理想的买入时机。当前价距突破点仅-0.6%，可以少量试仓，突破确认后加仓。风险回报比良好，是组合中相对低风险的品种。",
    positionSizing: "B1试仓：总资金×0.5%风险；突破确认后加仓至总资金×1%风险",
  },

  VRT: {
    ticker: "VRT",
    currentPrice: 339.73,
    baseStage: 1,
    baseType: "杯柄形突破 + 回踩20日均线",
    baseQuality: "标准",
    baseQualityNote: "周线完成深度44%的大型杯柄形突破（+31%），日线目前回踩20日均线。这是经典的'突破→上涨→回踩均线→继续上涨'结构。AI数据中心需求是强力催化剂。",
    pivotPoint: 252.0,
    pivotDesc: "原始突破点（已大幅超出），当前处于主升浪中",
    distFromPivot: 34.8,
    entries: [
      {
        type: "回踩20日均线加仓（B2）",
        price: 339.73,
        priceDesc: "当前价格即在20日均线附近，是加仓机会",
        condition: "量缩回踩，不破$315（20日均线-8%），大盘同步强势",
        maxEntry: 355.0,
        priority: "主要",
      },
      {
        type: "等待新平底形突破（B3）",
        price: 0,
        priceDesc: "若形成新的平底形整理后突破",
        condition: "形成5周以上平底形，振幅<15%，然后放量突破",
        maxEntry: 0,
        priority: "次要",
      },
    ],
    exits: [
      {
        type: "进攻性卖出：Climax Top信号",
        price: 430.0,
        priceDesc: "若出现抛物线式上涨（1-3周涨+25%以上）",
        condition: "连续7-8天上涨，或出现最大单日涨幅，或突破上轨道线",
        signal: "进攻性",
      },
      {
        type: "防守性卖出：跌破10周均线",
        price: 339.3,
        priceDesc: "10周均线约$357×0.95≈$339（当前价格已在此附近！）",
        condition: "周五收盘<$339，且周量>均量+30%，且周收盘范围<40%",
        signal: "防守性",
      },
    ],
    stopLoss: {
      price: 312.0,
      pct: -8.2,
      rule: "回踩买入止损：$340×0.92=$313；若跌破10周均线$357×0.92=$329则减仓B2/B3",
    },
    takeProfit: {
      target1: 390.0,
      target1Pct: 14.8,
      target2: 450.0,
      target2Pct: 32.5,
    },
    riskLevel: "中",
    riskRewardRatio: "1:3（止损-8%，目标+25%）",
    risks: [
      "当前价格已接近10周均线（$357），若跌破则是防守性卖出信号",
      "PE高达85倍，估值偏贵，对盈利增速要求极高",
      "AI数据中心建设周期若放缓，VRT将大幅回调",
      "当前处于第一阶段底部突破后的延伸期，需警惕Climax Top",
      "若大盘转弱，高PE股票往往跌幅更大",
    ],
    canslimScore: { C: 4, A: 4, N: 5, S: 5, L: 5, I: 4, M: MARKET_M_SCORE },
    canslimNote: "C/A：盈利增速强（净利润率14.4%，营收+30.1%）✓ N：AI数据中心基础设施核心受益者，催化剂极强 ✓ S：周线放量突破，机构大量买入 ✓ L：数据中心基础设施板块领头股 ✓ I：机构持股快速增加",
    overallSignal: "中等",
    tradeNote: "VRT受益于AI数据中心建设大周期，技术面强势。当前回踩20日均线是加仓机会，但需注意当前价格已接近10周均线（$357），若跌破则应减仓。建议以当前价格少量加仓，严格执行止损。",
    positionSizing: "B2加仓：总资金×0.5%风险（已在主升浪中，加仓比例减半）",
  },

  PANW: {
    ticker: "PANW",
    currentPrice: 247.55,
    baseStage: 1,
    baseType: "杯柄形突破（双重确认）",
    baseQuality: "标准",
    baseQualityNote: "日线和周线双重杯柄突破，技术面极强。自由现金流高达34.7亿美元，是网络安全中现金流最强的公司。但PE高达137倍，估值极贵，对增速要求极高。",
    pivotPoint: 180.0,
    pivotDesc: "原始突破点（已大幅超出），当前处于主升浪中",
    distFromPivot: 37.5,
    entries: [
      {
        type: "等待回踩10周均线（B2）",
        price: 215.77,
        priceDesc: "10周均线约$216，回踩此位是加仓机会",
        condition: "量缩回踩至$210-$220区间，不破$205（10周均线-5%）",
        maxEntry: 220.0,
        priority: "主要",
      },
      {
        type: "当前价格已超出理想区间，不建议追买",
        price: 0,
        priceDesc: "当前价距突破点已+37%，追买风险极高",
        condition: "不适用",
        maxEntry: 0,
        priority: "次要",
      },
    ],
    exits: [
      {
        type: "进攻性卖出：Climax Top信号",
        price: 300.0,
        priceDesc: "若出现抛物线式上涨（1-3周涨+25%以上）",
        condition: "连续7-8天上涨，或出现最大单日涨幅，或突破上轨道线",
        signal: "进攻性",
      },
      {
        type: "防守性卖出：跌破10周均线",
        price: 205.0,
        priceDesc: "10周均线$216×0.95≈$205",
        condition: "周五收盘<$205，且周量>均量+30%，且周收盘范围<40%",
        signal: "防守性",
      },
    ],
    stopLoss: {
      price: 228.0,
      pct: -7.9,
      rule: "若在$248附近持有：止损$228（-8%）；若等待回踩$216买入：止损$199（-8%）",
    },
    takeProfit: {
      target1: 280.0,
      target1Pct: 13.1,
      target2: 320.0,
      target2Pct: 29.3,
    },
    riskLevel: "高",
    riskRewardRatio: "1:2（当前价追买风险回报比较低）",
    risks: [
      "PE高达137倍，估值极贵，任何盈利不及预期将大幅下跌",
      "当前价格距突破点已+37%，追买风险极高",
      "接近52周高点（$248.85），可能遇到强阻力",
      "网络安全行业竞争激烈，CRWD和FTNT均在抢占市场份额",
      "D/E比率1.66，负债偏高",
    ],
    canslimScore: { C: 4, A: 4, N: 4, S: 5, L: 5, I: 5, M: MARKET_M_SCORE },
    canslimNote: "C/A：盈利改善（净利润率13%，自由现金流34.7亿）✓ N：AI安全平台+SASE转型 ✓ S：双重杯柄突破，机构大量买入 ✓ L：网络安全板块市值最大领头股 ✓ I：机构持股快速增加",
    overallSignal: "中等",
    tradeNote: "PANW技术面极强，但当前价格已大幅超出理想买入区间。建议等待回踩10周均线（$210-$220区间）后建仓。不建议在当前价格追买。",
    positionSizing: "等待回踩后建仓，B1风险控制在总资金1%",
  },

  CRWD: {
    ticker: "CRWD",
    currentPrice: 618.83,
    baseStage: 1,
    baseType: "杯柄形突破（最强技术信号）",
    baseQuality: "标准",
    baseQualityNote: "日线和周线同时出现杯柄形突破，且均有放量确认，是组合中技术信号最完美的品种。自由现金流16亿美元，但GAAP净利润仍为负，PE高达402倍。属于高成长高风险标的。",
    pivotPoint: 470.0,
    pivotDesc: "原始突破点（已大幅超出），当前处于主升浪中",
    distFromPivot: 31.7,
    entries: [
      {
        type: "等待回踩10周均线（B2）",
        price: 542.2,
        priceDesc: "10周均线约$542，回踩此位是加仓机会",
        condition: "量缩回踩至$530-$555区间，不破$515（10周均线-5%）",
        maxEntry: 555.0,
        priority: "主要",
      },
      {
        type: "当前价格已超出理想区间，不建议追买",
        price: 0,
        priceDesc: "当前价距突破点已+31%，追买风险极高",
        condition: "不适用",
        maxEntry: 0,
        priority: "次要",
      },
    ],
    exits: [
      {
        type: "进攻性卖出：Climax Top信号",
        price: 750.0,
        priceDesc: "若出现抛物线式上涨（1-3周涨+25%以上）",
        condition: "连续7-8天上涨，或出现最大单日涨幅，或突破上轨道线",
        signal: "进攻性",
      },
      {
        type: "防守性卖出：跌破10周均线",
        price: 515.0,
        priceDesc: "10周均线$542×0.95≈$515",
        condition: "周五收盘<$515，且周量>均量+30%，且周收盘范围<40%",
        signal: "防守性",
      },
    ],
    stopLoss: {
      price: 569.0,
      pct: -8.0,
      rule: "若在$619附近持有：止损$569（-8%）；若等待回踩$542买入：止损$499（-8%）",
    },
    takeProfit: {
      target1: 700.0,
      target1Pct: 13.1,
      target2: 800.0,
      target2Pct: 29.3,
    },
    riskLevel: "极高",
    riskRewardRatio: "1:2（当前价追买风险回报比低）",
    risks: [
      "GAAP净利润为负（-$1.6亿），PE高达402倍，纯靠增长预期支撑",
      "2024年7月全球IT宕机事件（蓝屏死机）仍有潜在法律风险和声誉影响",
      "当前价格距突破点已+31%，追买风险极高",
      "接近52周高点（$621.05），可能遇到强阻力",
      "若市场情绪转向，高PE成长股往往跌幅最大（-50%以上不罕见）",
      "整体账户回撤超过-15%时，无论信号如何应全部清仓",
    ],
    canslimScore: { C: 3, A: 3, N: 5, S: 5, L: 5, I: 5, M: MARKET_M_SCORE },
    canslimNote: "C/A：GAAP盈利为负，但自由现金流强劲 ✗ N：AI原生安全平台，行业颠覆者 ✓ S：双重杯柄放量突破，机构大量买入 ✓ L：网络安全板块绝对领头股 ✓ I：机构持股快速增加 ✓",
    overallSignal: "中等",
    tradeNote: "CRWD是组合中技术面最强的品种，但也是风险最高的。GAAP亏损+PE 402倍意味着任何负面消息都可能引发大幅下跌。建议等待回踩10周均线（$530-$555区间）后建仓，严格控制仓位，止损不超过总资金1%风险。",
    positionSizing: "高风险品种，B1风险控制在总资金0.5%（减半）",
  },

  PWR: {
    ticker: "PWR",
    currentPrice: 723.03,
    baseStage: 2,
    baseType: "杯柄形突破 + 回踩20日均线",
    baseQuality: "有缺陷",
    baseQualityNote: "周线完成杯柄突破（+28%），但日线出现了一个疑似假突破信号（突破幅度-0.7%，负值）。目前回踩20日均线。净利润率仅5.7%，属于低利润率的工业股，不符合CANSLIM对高利润率的要求。",
    pivotPoint: 788.75,
    pivotDesc: "近期高点，突破此位才能确认新一波上涨",
    distFromPivot: -8.3,
    entries: [
      {
        type: "回踩20日均线试仓（B1）",
        price: 723.03,
        priceDesc: "当前价格在20日均线附近，可少量试仓",
        condition: "量缩回踩，不破$665（20日均线-8%），大盘同步强势",
        maxEntry: 740.0,
        priority: "次要",
      },
      {
        type: "突破近期高点建仓",
        price: 788.85,
        priceDesc: "突破$788.75高点上方10美分",
        condition: "放量突破（>+40%平均量），收盘在高位",
        maxEntry: 828.0,
        priority: "主要",
      },
    ],
    exits: [
      {
        type: "防守性卖出：跌破10周均线",
        price: 726.4,
        priceDesc: "10周均线约$764.66×0.95≈$726",
        condition: "周五收盘<$726，且周量>均量+30%，且周收盘范围<40%",
        signal: "防守性",
      },
      {
        type: "进攻性卖出：接近高点",
        price: 850.0,
        priceDesc: "若突破后上涨至$850附近",
        condition: "出现Stalling Action或Downside Reversal",
        signal: "进攻性",
      },
    ],
    stopLoss: {
      price: 665.0,
      pct: -8.0,
      rule: "回踩买入止损：$723×0.92=$665；突破买入止损：$789×0.92=$726",
    },
    takeProfit: {
      target1: 850.0,
      target1Pct: 17.6,
      target2: 950.0,
      target2Pct: 31.4,
    },
    riskLevel: "中",
    riskRewardRatio: "1:2.5（止损-8%，目标+20%）",
    risks: [
      "净利润率仅5.7%，不符合CANSLIM对高利润率TML股的要求",
      "PE高达59.7倍，对于低利润率工业股来说估值偏贵",
      "基础设施投资受政府政策影响大（预算削减风险）",
      "日线出现疑似假突破信号，需谨慎",
      "不是CANSLIM体系中的首选品种（利润率太低）",
    ],
    canslimScore: { C: 3, A: 3, N: 4, S: 3, L: 3, I: 3, M: MARKET_M_SCORE },
    canslimNote: "C/A：盈利增速一般（净利润率仅5.7%，不符合CANSLIM高利润率要求）✗ N：美国电网基础设施投资大周期 ✓ S：周线突破信号，但日线有疑似假突破 L：工业基础设施板块，非主流成长板块 I：机构持股中等",
    overallSignal: "弱",
    tradeNote: "PWR受益于美国基础设施投资周期，但不符合CANSLIM对高利润率TML股的核心要求（净利润率仅5.7%）。建议降低仓位预期，等待突破$788.75高点后再建仓，不宜重仓。",
    positionSizing: "低优先级品种，B1风险控制在总资金0.5%",
  },

  NTNX: {
    ticker: "NTNX",
    currentPrice: 47.45,
    baseStage: 1,
    baseType: "杯柄形（形成中）+ 放量突破",
    baseQuality: "待观察",
    baseQualityNote: "日线出现放量突破（+13%），周线正在构建19.7%深度的杯柄形。但营收增速仅5.8%，净利润率不足10%，不符合CANSLIM对高增速的要求。属于技术面强于基本面的品种。",
    pivotPoint: 48.01,
    pivotDesc: "近期高点，突破此位才能确认底部形成",
    distFromPivot: -1.2,
    entries: [
      {
        type: "突破近期高点建仓（B1）",
        price: 48.11,
        priceDesc: "突破$48.01高点上方10美分",
        condition: "放量突破（>+40%平均量），且大盘同步强势",
        maxEntry: 50.5,
        priority: "主要",
      },
    ],
    exits: [
      {
        type: "防守性卖出：跌破10周均线",
        price: 42.9,
        priceDesc: "10周均线约$45.19×0.95≈$43",
        condition: "周五收盘<$43，且周量>均量+30%，且周收盘范围<40%",
        signal: "防守性",
      },
    ],
    stopLoss: {
      price: 43.7,
      pct: -7.9,
      rule: "突破买入止损：$48×0.92=$44；当前价买入止损：$47.45×0.92=$43.7",
    },
    takeProfit: {
      target1: 58.0,
      target1Pct: 22.2,
      target2: 68.0,
      target2Pct: 43.3,
    },
    riskLevel: "高",
    riskRewardRatio: "1:3（止损-8%，目标+25%）",
    risks: [
      "营收增速仅5.8%，远低于CANSLIM要求的>25%增速",
      "净利润率不足10%，基本面支撑不足",
      "市值偏小（$128亿），流动性相对不足",
      "云计算基础设施竞争激烈（AWS、Azure、Google Cloud均是竞争对手）",
      "技术面强于基本面，一旦市场情绪转向，缺乏基本面支撑",
    ],
    canslimScore: { C: 2, A: 2, N: 3, S: 4, L: 2, I: 3, M: MARKET_M_SCORE },
    canslimNote: "C/A：盈利增速不足（营收+5.8%，净利润率9.95%）✗ N：混合多云基础设施 S：日线放量突破信号 ✓ L：非主流领头板块 ✗ I：机构持股中等",
    overallSignal: "弱",
    tradeNote: "NTNX不符合CANSLIM对TML高富帅股的核心要求（增速太慢、利润率太低）。技术面有信号但基本面支撑不足。若要参与，仓位应极小，严格止损。",
    positionSizing: "低优先级品种，B1风险控制在总资金0.5%（减半）",
  },

  OKTA: {
    ticker: "OKTA",
    currentPrice: 87.04,
    baseStage: 2,
    baseType: "底部反弹 + 放量突破",
    baseQuality: "有缺陷",
    baseQualityNote: "日线出现放量突破（+7.3%），但周线仍在50周均线下方承压。净利润率仅8.1%，PE高达64倍，估值偏贵。底部质量有缺陷：宽松散乱，缺乏机构背书的明显迹象。",
    pivotPoint: 87.24,
    pivotDesc: "近期高点，当前价格接近此位",
    distFromPivot: -0.2,
    entries: [
      {
        type: "突破近期高点建仓（B1，谨慎）",
        price: 87.34,
        priceDesc: "突破$87.24高点上方10美分",
        condition: "放量突破（>+40%平均量），且周线站上50周均线",
        maxEntry: 91.7,
        priority: "次要",
      },
    ],
    exits: [
      {
        type: "防守性卖出：跌破10周均线",
        price: 76.9,
        priceDesc: "10周均线约$80.98×0.95≈$77",
        condition: "周五收盘<$77，且周量>均量+30%，且周收盘范围<40%",
        signal: "防守性",
      },
    ],
    stopLoss: {
      price: 80.2,
      pct: -7.8,
      rule: "突破买入止损：$87×0.92=$80；当前价买入止损：$87.04×0.92=$80",
    },
    takeProfit: {
      target1: 97.45,
      target1Pct: 11.9,
      target2: 115.0,
      target2Pct: 32.1,
    },
    riskLevel: "高",
    riskRewardRatio: "1:2（止损-8%，目标+15%）",
    risks: [
      "周线仍在50周均线下方，大趋势尚未确认转强",
      "净利润率仅8.1%，不符合CANSLIM高利润率要求",
      "PE高达64倍，估值偏贵",
      "身份安全市场竞争激烈（微软、CrowdStrike均在抢占市场）",
      "底部质量有缺陷，失败率高于标准底部",
    ],
    canslimScore: { C: 2, A: 2, N: 3, S: 3, L: 2, I: 2, M: MARKET_M_SCORE },
    canslimNote: "C/A：盈利增速不足（营收+11.6%，净利润率8.1%）✗ N：身份安全+零信任架构 S：日线放量突破，但周线信号弱 L：非主流领头板块 ✗ I：机构持股待确认",
    overallSignal: "弱",
    tradeNote: "OKTA不符合CANSLIM对TML高富帅股的核心要求。底部质量有缺陷，基本面支撑不足。若要参与，仓位应极小，严格止损，且需要周线站上50周均线才能加仓。",
    positionSizing: "低优先级品种，B1风险控制在总资金0.5%（减半）",
  },

  ROKU: {
    ticker: "ROKU",
    currentPrice: 124.15,
    baseStage: 2,
    baseType: "杯柄形突破（深度过大）",
    baseQuality: "有缺陷",
    baseQualityNote: "日线和周线均出现杯柄突破，但周线杯柄深度高达42.3%（超过理想的-30%上限），属于有缺陷的底部。净利润率仅4.1%，PE高达96倍，基本面支撑极弱。",
    pivotPoint: 131.39,
    pivotDesc: "近期高点（52周高点），突破此位才能确认新高",
    distFromPivot: -5.5,
    entries: [
      {
        type: "突破52周高点建仓（B1，谨慎）",
        price: 131.49,
        priceDesc: "突破$131.39高点上方10美分",
        condition: "放量突破（>+40%平均量），且大盘同步强势",
        maxEntry: 138.0,
        priority: "次要",
      },
    ],
    exits: [
      {
        type: "防守性卖出：跌破10周均线",
        price: 120.1,
        priceDesc: "10周均线约$126.4×0.95≈$120",
        condition: "周五收盘<$120，且周量>均量+30%，且周收盘范围<40%",
        signal: "防守性",
      },
    ],
    stopLoss: {
      price: 114.2,
      pct: -8.0,
      rule: "突破买入止损：$131×0.92=$121；当前价买入止损：$124×0.92=$114",
    },
    takeProfit: {
      target1: 155.0,
      target1Pct: 24.9,
      target2: 180.0,
      target2Pct: 45.0,
    },
    riskLevel: "极高",
    riskRewardRatio: "1:3（止损-8%，目标+25%，但基本面支撑极弱）",
    risks: [
      "净利润率仅4.1%，PE高达96倍，基本面支撑极弱",
      "周线杯柄深度42.3%超过理想上限（-30%），底部质量有缺陷",
      "流媒体行业竞争极为激烈（Netflix、Disney+、Amazon均是竞争对手）",
      "广告收入高度依赖宏观经济，经济衰退时广告支出大幅削减",
      "不符合CANSLIM对TML高富帅股的核心要求",
      "属于高风险投机品种，不建议重仓",
    ],
    canslimScore: { C: 2, A: 2, N: 3, S: 4, L: 2, I: 2, M: MARKET_M_SCORE },
    canslimNote: "C/A：盈利增速不足（净利润率4.1%，不符合CANSLIM要求）✗ N：流媒体平台+广告技术 S：双重杯柄突破信号 ✓ L：流媒体板块，非主流领头板块 ✗ I：机构持股待确认",
    overallSignal: "弱",
    tradeNote: "ROKU不符合CANSLIM对TML高富帅股的核心要求（利润率太低、PE太高）。技术面有信号但基本面支撑极弱。属于高风险投机品种，不建议在组合中重仓配置。",
    positionSizing: "极低优先级，若参与则B1风险控制在总资金0.25%（四分之一）",
  },
};
