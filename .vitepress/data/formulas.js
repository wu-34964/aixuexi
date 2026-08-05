// docs/.vitepress/data/formulas.js

// ========== 学科配置 ==========
export const subjects = [
  { value: 'math', label: '数学', icon: '📐' },
  { value: 'physics', label: '物理', icon: '🧲' },
  { value: 'chemistry', label: '化学', icon: '🧪' }
]

export const chapters = {
  math: [
    { value: 'sets-logic', label: '集合与逻辑' },
    { value: 'functions-inequalities', label: '函数与不等式' },
    { value: 'trigonometry-vectors', label: '三角函数与平面向量' },
    { value: 'sequences', label: '数列' },
    { value: 'complex', label: '复数' },
    { value: 'solid-geometry', label: '立体几何与空间向量' },
    { value: 'analytic-geometry', label: '解析几何' },
    { value: 'probability-statistics', label: '计数原理与概率统计' },
    { value: 'derivatives', label: '导数及其应用' }
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
  { id: 1, subject: 'math', chapter: 'sets-logic', name: '德摩根律', formula: '\\complement_U(A\\cup B)=(\\complement_UA)\\cap(\\complement_UB)', description: '全集 U 下并集的补等于补集的交' },
  { id: 2, subject: 'math', chapter: 'sets-logic', name: '充分条件的集合表示', formula: 'p\\Rightarrow q\\iff A_p\\subseteq A_q', description: '用解集包含关系判断充分、必要条件' },
  { id: 3, subject: 'math', chapter: 'sets-logic', name: '全称命题的否定', formula: '\\neg(\\forall x\\in M,p(x))\\iff\\exists x\\in M,\\neg p(x)', description: '否定时改变量词并否定结论' },

  { id: 4, subject: 'math', chapter: 'functions-inequalities', name: '一元二次方程求根公式', formula: 'x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}', description: 'a≠0 且判别式非负时给出实根' },
  { id: 5, subject: 'math', chapter: 'functions-inequalities', name: '韦达定理', formula: 'x_1+x_2=-\\frac ba,\\quad x_1x_2=\\frac ca', description: '一元二次方程根与系数的关系（a≠0）' },
  { id: 6, subject: 'math', chapter: 'functions-inequalities', name: '基本不等式', formula: '\\frac{a+b}{2}\\ge\\sqrt{ab}\\quad(a,b>0)', description: '等号当且仅当 a=b' },
  { id: 7, subject: 'math', chapter: 'functions-inequalities', name: '对数换底公式', formula: '\\log_ab=\\frac{\\log_cb}{\\log_ca}', description: 'a,c>0 且 a,c≠1，b>0' },
  { id: 8, subject: 'math', chapter: 'functions-inequalities', name: '零点存在定理', formula: 'f(a)f(b)<0\\Rightarrow\\exists x_0\\in(a,b),f(x_0)=0', description: '前提是函数在闭区间 [a,b] 上连续' },

  { id: 9, subject: 'math', chapter: 'trigonometry-vectors', name: '同角三角函数关系', formula: '\\sin^2x+\\cos^2x=1', description: '任意实数角均成立' },
  { id: 10, subject: 'math', chapter: 'trigonometry-vectors', name: '两角和的正弦', formula: '\\sin(\\alpha+\\beta)=\\sin\\alpha\\cos\\beta+\\cos\\alpha\\sin\\beta', description: '三角恒等变换基础公式' },
  { id: 11, subject: 'math', chapter: 'trigonometry-vectors', name: '余弦定理', formula: 'c^2=a^2+b^2-2ab\\cos C', description: '三角形中三边与夹角的关系' },
  { id: 12, subject: 'math', chapter: 'trigonometry-vectors', name: '正弦定理', formula: '\\frac a{\\sin A}=\\frac b{\\sin B}=\\frac c{\\sin C}=2R', description: 'R 为三角形外接圆半径' },
  { id: 13, subject: 'math', chapter: 'trigonometry-vectors', name: '平面向量数量积', formula: '\\boldsymbol a\\cdot\\boldsymbol b=x_1x_2+y_1y_2', description: '向量采用平面直角坐标表示' },

  { id: 14, subject: 'math', chapter: 'sequences', name: '等差数列通项', formula: 'a_n=a_1+(n-1)d', description: 'd 为公差' },
  { id: 15, subject: 'math', chapter: 'sequences', name: '等差数列前 n 项和', formula: 'S_n=\\frac{n(a_1+a_n)}2', description: '也可写成含首项与公差的形式' },
  { id: 16, subject: 'math', chapter: 'sequences', name: '等比数列通项', formula: 'a_n=a_1q^{n-1}', description: 'q 为公比' },
  { id: 17, subject: 'math', chapter: 'sequences', name: '等比数列前 n 项和', formula: 'S_n=\\frac{a_1(1-q^n)}{1-q}\\quad(q\\ne1)', description: 'q=1 时 S_n=na_1' },

  { id: 18, subject: 'math', chapter: 'complex', name: '虚数单位', formula: 'i^2=-1', description: '复数运算的基本关系' },
  { id: 19, subject: 'math', chapter: 'complex', name: '复数的模', formula: '|a+bi|=\\sqrt{a^2+b^2}', description: 'a、b 为实数' },
  { id: 20, subject: 'math', chapter: 'complex', name: '共轭复数乘积', formula: 'z\\overline z=|z|^2', description: '常用于复数除法与模的计算' },

  { id: 21, subject: 'math', chapter: 'solid-geometry', name: '空间向量数量积', formula: '\\boldsymbol a\\cdot\\boldsymbol b=|\\boldsymbol a||\\boldsymbol b|\\cos\\theta', description: 'θ 为两非零向量夹角' },
  { id: 22, subject: 'math', chapter: 'solid-geometry', name: '线面角公式', formula: '\\sin\\theta=\\frac{|\\boldsymbol v\\cdot\\boldsymbol n|}{|\\boldsymbol v||\\boldsymbol n|}', description: 'v 为直线方向向量，n 为平面法向量' },
  { id: 23, subject: 'math', chapter: 'solid-geometry', name: '点到平面距离', formula: 'd=\\frac{|\\overrightarrow{P_0P}\\cdot\\boldsymbol n|}{|\\boldsymbol n|}', description: 'P₀ 在平面内，n 为非零法向量' },

  { id: 24, subject: 'math', chapter: 'analytic-geometry', name: '点到直线距离', formula: 'd=\\frac{|Ax_0+By_0+C|}{\\sqrt{A^2+B^2}}', description: '直线 Ax+By+C=0 且 A、B 不全为零' },
  { id: 25, subject: 'math', chapter: 'analytic-geometry', name: '圆的标准方程', formula: '(x-a)^2+(y-b)^2=r^2', description: '圆心为 (a,b)，半径 r>0' },
  { id: 26, subject: 'math', chapter: 'analytic-geometry', name: '椭圆参数关系', formula: 'c^2=a^2-b^2\\quad(a>b>0)', description: '适用于标准椭圆方程' },
  { id: 27, subject: 'math', chapter: 'analytic-geometry', name: '双曲线参数关系', formula: 'c^2=a^2+b^2', description: '适用于标准双曲线方程' },
  { id: 28, subject: 'math', chapter: 'analytic-geometry', name: '抛物线焦点与准线', formula: 'y^2=2px:\\ F(\\frac p2,0),\\ x=-\\frac p2', description: 'p>0，采用 y²=2px 的参数约定' },

  { id: 101, subject: 'math', chapter: 'probability-statistics', name: '排列数', formula: 'A_n^m=\\frac{n!}{(n-m)!}', description: '从 n 个不同元素中取 m 个并排序' },
  { id: 102, subject: 'math', chapter: 'probability-statistics', name: '组合数', formula: 'C_n^m=\\frac{n!}{m!(n-m)!}', description: '从 n 个不同元素中无序选取 m 个' },
  { id: 103, subject: 'math', chapter: 'probability-statistics', name: '条件概率', formula: 'P(A|B)=\\frac{P(A\\cap B)}{P(B)}', description: '要求 P(B)>0' },
  { id: 104, subject: 'math', chapter: 'probability-statistics', name: '二项分布', formula: 'P(X=k)=C_n^kp^k(1-p)^{n-k}', description: 'X~B(n,p)，k=0,1,…,n' },
  { id: 105, subject: 'math', chapter: 'probability-statistics', name: '离散型随机变量期望', formula: 'E(X)=\\sum_i x_ip_i', description: '分布列满足 p_i≥0 且概率和为 1' },

  { id: 106, subject: 'math', chapter: 'derivatives', name: '导数定义', formula: "f'(x_0)=\\lim_{\\Delta x\\to0}\\frac{f(x_0+\\Delta x)-f(x_0)}{\\Delta x}", description: '极限存在时定义函数在 x₀ 处的导数' },
  { id: 107, subject: 'math', chapter: 'derivatives', name: '乘积求导法则', formula: "(uv)'=u'v+uv'", description: '两个可导函数乘积的导数' },
  { id: 108, subject: 'math', chapter: 'derivatives', name: '切线方程', formula: "y-f(x_0)=f'(x_0)(x-x_0)", description: '函数在 x₀ 处可导时的切线方程' },

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
