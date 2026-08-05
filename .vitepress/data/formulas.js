// docs/.vitepress/data/formulas.js

// ========== 学科配置 ==========
export const subjects = [
  { value: 'math', label: '数学', icon: '📐' },
  { value: 'physics', label: '物理', icon: '🧲' },
  { value: 'chemistry', label: '化学', icon: '🧪' }
]

export const chapters = {
  math: [
    { value: 'algebra', label: '代数' },
    { value: 'geometry', label: '几何' },
    { value: 'trigonometry', label: '三角函数' },
    { value: 'calculus', label: '微积分' },
    { value: 'probability', label: '概率统计' }
  ],
  physics: [
    { value: 'mechanics', label: '力学' },
    { value: 'electromagnetism', label: '电磁学' },
    { value: 'optics', label: '光学' },
    { value: 'thermodynamics', label: '热力学' },
    { value: 'modern', label: '近代物理' }
  ],
  chemistry: [
    { value: 'basic', label: '化学基础' },
    { value: 'inorganic', label: '无机化学' },
    { value: 'organic', label: '有机化学' },
    { value: 'physical', label: '物理化学' }
  ]
}

// ========== 公式数据库 ==========
// 在这里添加、修改、删除公式
// 格式：{ id: 唯一编号, subject: 学科, chapter: 章节, name: 公式名称, formula: LaTeX公式, description: 说明 }
export const formulas = [
  // ==================== 数学 ====================
  // ---- 代数 ----
  { id: 1, subject: 'math', chapter: 'algebra', name: '一元二次方程求根公式', 
    formula: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}', 
    description: '求解 ax² + bx + c = 0 的根' },
  { id: 2, subject: 'math', chapter: 'algebra', name: '完全平方公式', 
    formula: '(a \\pm b)^2 = a^2 \\pm 2ab + b^2', 
    description: '两数和（差）的平方展开' },
  { id: 3, subject: 'math', chapter: 'algebra', name: '平方差公式', 
    formula: 'a^2 - b^2 = (a + b)(a - b)', 
    description: '两数平方差因式分解' },
  { id: 4, subject: 'math', chapter: 'algebra', name: '立方和公式', 
    formula: 'a^3 + b^3 = (a + b)(a^2 - ab + b^2)', 
    description: '两数和立方因式分解' },
  { id: 5, subject: 'math', chapter: 'algebra', name: '立方差公式', 
    formula: 'a^3 - b^3 = (a - b)(a^2 + ab + b^2)', 
    description: '两数差立方因式分解' },
  { id: 6, subject: 'math', chapter: 'algebra', name: '判别式', 
    formula: '\\Delta = b^2 - 4ac', 
    description: '一元二次方程根的判别式' },
  { id: 7, subject: 'math', chapter: 'algebra', name: '韦达定理', 
    formula: 'x_1 + x_2 = -\\frac{b}{a}, \\quad x_1 \\cdot x_2 = \\frac{c}{a}', 
    description: '一元二次方程根与系数的关系' },
  { id: 8, subject: 'math', chapter: 'algebra', name: '绝对值不等式', 
    formula: '|x| \\leq a \\iff -a \\leq x \\leq a \\quad (a > 0)', 
    description: '绝对值不等式的等价形式' },
  { id: 9, subject: 'math', chapter: 'algebra', name: '均值不等式', 
    formula: '\\frac{a+b}{2} \\geq \\sqrt{ab} \\quad (a,b \\geq 0)', 
    description: '两个正数的算术平均数不小于几何平均数' },
  { id: 10, subject: 'math', chapter: 'algebra', name: '二项式定理', 
    formula: '(a+b)^n = \\sum_{k=0}^n C_n^k a^{n-k} b^k', 
    description: '二项展开式通项公式' },

  // ---- 几何 ----
  { id: 11, subject: 'math', chapter: 'geometry', name: '勾股定理', 
    formula: 'a^2 + b^2 = c^2', 
    description: '直角三角形两直角边平方和等于斜边平方' },
  { id: 12, subject: 'math', chapter: 'geometry', name: '海伦公式', 
    formula: 'S = \\sqrt{s(s-a)(s-b)(s-c)}, \\quad s = \\frac{a+b+c}{2}', 
    description: '已知三边求三角形面积' },
  { id: 13, subject: 'math', chapter: 'geometry', name: '三角形面积公式', 
    formula: 'S = \\frac{1}{2}ab\\sin C', 
    description: '已知两边及其夹角求面积' },
  { id: 14, subject: 'math', chapter: 'geometry', name: '圆面积公式', 
    formula: 'S = \\pi r^2', 
    description: '圆的面积计算' },
  { id: 15, subject: 'math', chapter: 'geometry', name: '圆周长公式', 
    formula: 'C = 2\\pi r', 
    description: '圆的周长计算' },
  { id: 16, subject: 'math', chapter: 'geometry', name: '扇形面积公式', 
    formula: 'S = \\frac{1}{2}l r = \\frac{1}{2}\\theta r^2', 
    description: '扇形面积，l为弧长，θ为圆心角（弧度）' },

  // ---- 三角函数 ----
  { id: 17, subject: 'math', chapter: 'trigonometry', name: '三角恒等式', 
    formula: '\\sin^2\\theta + \\cos^2\\theta = 1', 
    description: '同角三角函数关系' },
  { id: 18, subject: 'math', chapter: 'trigonometry', name: '正弦定理', 
    formula: '\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C} = 2R', 
    description: '三角形边长与对角正弦关系' },
  { id: 19, subject: 'math', chapter: 'trigonometry', name: '余弦定理', 
    formula: 'c^2 = a^2 + b^2 - 2ab\\cos C', 
    description: '三角形边角关系' },
  { id: 20, subject: 'math', chapter: 'trigonometry', name: '两角和公式', 
    formula: '\\sin(A+B) = \\sin A\\cos B + \\cos A\\sin B', 
    description: '两角和的正弦' },
  { id: 21, subject: 'math', chapter: 'trigonometry', name: '二倍角公式', 
    formula: '\\sin 2\\theta = 2\\sin\\theta\\cos\\theta', 
    description: '二倍角的正弦' },

  // ---- 微积分 ----
  { id: 22, subject: 'math', chapter: 'calculus', name: '导数定义', 
    formula: "f'(x) = \\lim_{\\Delta x \\to 0} \\frac{f(x+\\Delta x) - f(x)}{\\Delta x}", 
    description: '导数的定义' },
  { id: 23, subject: 'math', chapter: 'calculus', name: '基本求导公式', 
    formula: "(x^n)' = nx^{n-1}", 
    description: '幂函数求导' },
  { id: 24, subject: 'math', chapter: 'calculus', name: '定积分', 
    formula: '\\int_a^b f(x) dx = F(b) - F(a)', 
    description: '定积分基本公式（牛顿-莱布尼茨公式）' },
  { id: 25, subject: 'math', chapter: 'calculus', name: '微积分基本定理', 
    formula: '\\frac{d}{dx}\\int_a^x f(t) dt = f(x)', 
    description: '变上限定积分求导' },

  // ---- 概率统计 ----
  { id: 26, subject: 'math', chapter: 'probability', name: '排列数公式', 
    formula: 'A_n^m = \\frac{n!}{(n-m)!}', 
    description: '从n个元素中取m个的排列数' },
  { id: 27, subject: 'math', chapter: 'probability', name: '组合数公式', 
    formula: 'C_n^m = \\frac{n!}{m!(n-m)!}', 
    description: '从n个元素中取m个的组合数' },
  { id: 28, subject: 'math', chapter: 'probability', name: '概率加法公式', 
    formula: 'P(A \\cup B) = P(A) + P(B) - P(A \\cap B)', 
    description: '两事件并的概率' },

  // ==================== 物理 ====================
  // ---- 力学 ----
  { id: 29, subject: 'physics', chapter: 'mechanics', name: '牛顿第二定律', 
    formula: 'F = ma', 
    description: '力等于质量乘以加速度' },
  { id: 30, subject: 'physics', chapter: 'mechanics', name: '动能定理', 
    formula: 'W = \\Delta E_k = \\frac{1}{2}mv^2 - \\frac{1}{2}mv_0^2', 
    description: '合外力做功等于动能变化量' },
  { id: 31, subject: 'physics', chapter: 'mechanics', name: '机械能守恒定律', 
    formula: 'E_k + E_p = \\text{恒量}', 
    description: '只有保守力做功时机械能守恒' },
  { id: 32, subject: 'physics', chapter: 'mechanics', name: '万有引力定律', 
    formula: 'F = G\\frac{m_1 m_2}{r^2}', 
    description: '两物体间的引力与质量乘积成正比，与距离平方成反比' },
  { id: 33, subject: 'physics', chapter: 'mechanics', name: '动量定理', 
    formula: 'I = \\Delta p = mv - mv_0', 
    description: '合外力的冲量等于动量的变化量' },
  { id: 34, subject: 'physics', chapter: 'mechanics', name: '自由落体公式', 
    formula: 'h = \\frac{1}{2}gt^2, \\quad v = gt', 
    description: '自由落体下落高度和速度' },

  // ---- 电磁学 ----
  { id: 35, subject: 'physics', chapter: 'electromagnetism', name: '库仑定律', 
    formula: 'F = k\\frac{q_1 q_2}{r^2}', 
    description: '两电荷间的作用力' },
  { id: 36, subject: 'physics', chapter: 'electromagnetism', name: '欧姆定律', 
    formula: 'I = \\frac{U}{R}', 
    description: '电流与电压成正比，与电阻成反比' },
  { id: 37, subject: 'physics', chapter: 'electromagnetism', name: '焦耳定律', 
    formula: 'Q = I^2 R t', 
    description: '电流通过导体产生的热量' },
  { id: 38, subject: 'physics', chapter: 'electromagnetism', name: '电场强度', 
    formula: 'E = \\frac{F}{q}', 
    description: '电场强度定义式' },
  { id: 39, subject: 'physics', chapter: 'electromagnetism', name: '电容定义', 
    formula: 'C = \\frac{Q}{U}', 
    description: '电容定义式' },

  // ---- 光学 ----
  { id: 40, subject: 'physics', chapter: 'optics', name: '折射定律', 
    formula: 'n_1 \\sin \\theta_1 = n_2 \\sin \\theta_2', 
    description: '斯涅耳定律' },
  { id: 41, subject: 'physics', chapter: 'optics', name: '透镜成像公式', 
    formula: '\\frac{1}{f} = \\frac{1}{u} + \\frac{1}{v}', 
    description: '凸透镜成像，f为焦距，u为物距，v为像距' },

  // ---- 热力学 ----
  { id: 42, subject: 'physics', chapter: 'thermodynamics', name: '理想气体状态方程', 
    formula: 'pV = nRT', 
    description: '理想气体压强、体积、物质的量、温度关系' },
  { id: 43, subject: 'physics', chapter: 'thermodynamics', name: '热力学第一定律', 
    formula: '\\Delta U = Q + W', 
    description: '系统内能变化等于吸热与外界做功之和' },

  // ==================== 化学 ====================
  // ---- 化学基础 ----
  { id: 44, subject: 'chemistry', chapter: 'basic', name: '物质的量公式', 
    formula: 'n = \\frac{m}{M} = \\frac{V}{V_m} = \\frac{N}{N_A}', 
    description: '物质的量与质量、体积、粒子数关系' },
  { id: 45, subject: 'chemistry', chapter: 'basic', name: '浓度公式', 
    formula: 'c = \\frac{n}{V}', 
    description: '物质的量浓度定义' },
  { id: 46, subject: 'chemistry', chapter: 'basic', name: '密度公式', 
    formula: '\\rho = \\frac{m}{V}', 
    description: '密度等于质量除以体积' },

  // ---- 无机化学 ----
  { id: 47, subject: 'chemistry', chapter: 'inorganic', name: 'pH值定义', 
    formula: '\\text{pH} = -\\log[H^+]', 
    description: '氢离子浓度负对数' },
  { id: 48, subject: 'chemistry', chapter: 'inorganic', name: '水的离子积', 
    formula: 'K_w = [H^+][OH^-] = 10^{-14}', 
    description: '常温下水的离子积常数' },

  // ---- 有机化学 ----
  { id: 49, subject: 'chemistry', chapter: 'organic', name: '燃烧通式', 
    formula: 'C_x H_y + (x + \\frac{y}{4})O_2 \\rightarrow xCO_2 + \\frac{y}{2}H_2O', 
    description: '烃类完全燃烧通式' },
  { id: 50, subject: 'chemistry', chapter: 'organic', name: '乙烯加成反应', 
    formula: 'CH_2=CH_2 + H_2 \\xrightarrow{Ni} CH_3-CH_3', 
    description: '乙烯催化加氢' },

  // ---- 物理化学 ----
  { id: 51, subject: 'chemistry', chapter: 'physical', name: '平衡常数', 
    formula: 'K = \\frac{[C]^c[D]^d}{[A]^a[B]^b}', 
    description: '化学反应平衡常数表达式' },
  { id: 52, subject: 'chemistry', chapter: 'physical', name: '阿伦尼乌斯公式', 
    formula: 'k = A e^{-E_a/(RT)}', 
    description: '反应速率常数与温度的关系' }
]

// ========== 工具函数 ==========
// 根据学科和章节筛选公式
export function getFormulasByChapter(subject, chapter) {
  return formulas.filter(f => f.subject === subject && f.chapter === chapter)
}

// 根据关键词搜索公式
export function searchFormulas(keyword) {
  if (!keyword || !keyword.trim()) return []
  const kw = keyword.trim().toLowerCase()
  return formulas.filter(f => 
    f.name.includes(kw) || 
    f.description.includes(kw) ||
    f.formula.includes(kw)
  )
}

// 获取随机公式（用于学习）
export function getRandomFormulas(subject, chapter, excludeIds = []) {
  const available = formulas.filter(f => 
    f.subject === subject && 
    f.chapter === chapter &&
    !excludeIds.includes(f.id)
  )
  return available
}

// 获取某学科某章节的公式数量
export function getFormulaCount(subject, chapter) {
  return formulas.filter(f => f.subject === subject && f.chapter === chapter).length
}