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
  ,

  // ==================== 高考公式补充库 ====================
  // ---- 数学：集合、函数与不等式 ----
  { id: 109, subject: 'math', chapter: 'sets-logic', name: '容斥原理', formula: 'n(A\\cup B)=n(A)+n(B)-n(A\\cap B)', description: '计算两个有限集合并集的元素个数' },
  { id: 110, subject: 'math', chapter: 'functions-inequalities', name: '二次函数顶点', formula: 'x_0=-\\frac{b}{2a},\\quad y_0=\\frac{4ac-b^2}{4a}', description: '二次函数 y=ax^2+bx+c（a≠0）的顶点坐标' },
  { id: 111, subject: 'math', chapter: 'functions-inequalities', name: '判别式', formula: '\\Delta=b^2-4ac', description: '判断一元二次方程实根个数' },
  { id: 112, subject: 'math', chapter: 'functions-inequalities', name: '指数运算', formula: 'a^ma^n=a^{m+n},\\quad (a^m)^n=a^{mn}', description: 'a>0 时指数幂的基本运算法则' },
  { id: 113, subject: 'math', chapter: 'functions-inequalities', name: '对数乘积法则', formula: '\\log_a(MN)=\\log_aM+\\log_aN', description: 'a>0、a≠1，且 M,N>0' },
  { id: 114, subject: 'math', chapter: 'functions-inequalities', name: '对数商法则', formula: '\\log_a\\frac MN=\\log_aM-\\log_aN', description: 'a>0、a≠1，且 M,N>0' },
  { id: 115, subject: 'math', chapter: 'functions-inequalities', name: '对数幂法则', formula: '\\log_aM^n=n\\log_aM', description: 'M>0；使用时注意真数定义域' },
  { id: 116, subject: 'math', chapter: 'functions-inequalities', name: '函数平均变化率', formula: '\\frac{\\Delta y}{\\Delta x}=\\frac{f(x_2)-f(x_1)}{x_2-x_1}', description: 'x₁≠x₂，表示割线斜率' },
  { id: 117, subject: 'math', chapter: 'functions-inequalities', name: '绝对值三角不等式', formula: '|a+b|\\le |a|+|b|', description: '等号成立条件需结合 a、b 同号或为零判断' },
  { id: 118, subject: 'math', chapter: 'functions-inequalities', name: '柯西不等式', formula: '(a^2+b^2)(c^2+d^2)\\ge(ac+bd)^2', description: '等号在两组数成比例时成立' },

  // ---- 数学：三角函数与平面向量 ----
  { id: 119, subject: 'math', chapter: 'trigonometry-vectors', name: '正切定义', formula: '\\tan x=\\frac{\\sin x}{\\cos x}', description: 'cos x≠0' },
  { id: 120, subject: 'math', chapter: 'trigonometry-vectors', name: '两角差的正弦', formula: '\\sin(\\alpha-\\beta)=\\sin\\alpha\\cos\\beta-\\cos\\alpha\\sin\\beta', description: '两角差公式' },
  { id: 121, subject: 'math', chapter: 'trigonometry-vectors', name: '两角和的余弦', formula: '\\cos(\\alpha+\\beta)=\\cos\\alpha\\cos\\beta-\\sin\\alpha\\sin\\beta', description: '两角和公式' },
  { id: 122, subject: 'math', chapter: 'trigonometry-vectors', name: '两角差的余弦', formula: '\\cos(\\alpha-\\beta)=\\cos\\alpha\\cos\\beta+\\sin\\alpha\\sin\\beta', description: '两角差公式' },
  { id: 123, subject: 'math', chapter: 'trigonometry-vectors', name: '两角和的正切', formula: '\\tan(\\alpha+\\beta)=\\frac{\\tan\\alpha+\\tan\\beta}{1-\\tan\\alpha\\tan\\beta}', description: '各正切及分母有意义' },
  { id: 124, subject: 'math', chapter: 'trigonometry-vectors', name: '二倍角正弦', formula: '\\sin2\\alpha=2\\sin\\alpha\\cos\\alpha', description: '二倍角公式' },
  { id: 125, subject: 'math', chapter: 'trigonometry-vectors', name: '二倍角余弦', formula: '\\cos2\\alpha=\\cos^2\\alpha-\\sin^2\\alpha=2\\cos^2\\alpha-1=1-2\\sin^2\\alpha', description: '三种形式按题目条件选用' },
  { id: 126, subject: 'math', chapter: 'trigonometry-vectors', name: '辅助角公式', formula: 'a\\sin x+b\\cos x=\\sqrt{a^2+b^2}\\sin(x+\\varphi)', description: '其中 cosφ=a/√(a²+b²)，sinφ=b/√(a²+b²)' },
  { id: 127, subject: 'math', chapter: 'trigonometry-vectors', name: '三角形面积', formula: 'S=\\frac12bc\\sin A=\\frac12ca\\sin B=\\frac12ab\\sin C', description: '两边及其夹角求面积' },
  { id: 128, subject: 'math', chapter: 'trigonometry-vectors', name: '向量模的坐标公式', formula: '|\\boldsymbol a|=\\sqrt{x^2+y^2}', description: '平面向量 a=(x,y)' },
  { id: 129, subject: 'math', chapter: 'trigonometry-vectors', name: '向量夹角', formula: '\\cos\\theta=\\frac{\\boldsymbol a\\cdot\\boldsymbol b}{|\\boldsymbol a||\\boldsymbol b|}', description: 'a、b 均为非零向量' },
  { id: 130, subject: 'math', chapter: 'trigonometry-vectors', name: '向量平行判定', formula: 'x_1y_2-x_2y_1=0', description: '非零平面向量平行的坐标判定' },
  { id: 131, subject: 'math', chapter: 'trigonometry-vectors', name: '向量垂直判定', formula: 'x_1x_2+y_1y_2=0', description: '非零平面向量垂直的坐标判定' },

  // ---- 数学：数列、复数 ----
  { id: 132, subject: 'math', chapter: 'sequences', name: '等差数列前 n 项和展开式', formula: 'S_n=na_1+\\frac{n(n-1)}2d', description: '已知首项和公差时使用' },
  { id: 133, subject: 'math', chapter: 'sequences', name: '等比数列前 n 项和另一形式', formula: 'S_n=\\frac{a_1-a_nq}{1-q}', description: 'q≠1' },
  { id: 134, subject: 'math', chapter: 'sequences', name: '等差中项', formula: '2a_n=a_{n-1}+a_{n+1}', description: '等差数列中相邻三项关系' },
  { id: 135, subject: 'math', chapter: 'sequences', name: '等比中项', formula: 'a_n^2=a_{n-1}a_{n+1}', description: '等比数列中相邻三项关系' },
  { id: 136, subject: 'math', chapter: 'sequences', name: '数列项与前 n 项和', formula: 'a_n=S_n-S_{n-1}\\quad(n\\ge2)', description: '另有 a₁=S₁' },
  { id: 137, subject: 'math', chapter: 'complex', name: '复数乘法', formula: '(a+bi)(c+di)=(ac-bd)+(ad+bc)i', description: '利用 i²=-1 展开' },
  { id: 138, subject: 'math', chapter: 'complex', name: '复数除法', formula: '\\frac{a+bi}{c+di}=\\frac{(a+bi)(c-di)}{c^2+d^2}', description: 'c、d 不同时为 0' },

  // ---- 数学：立体几何与解析几何 ----
  { id: 139, subject: 'math', chapter: 'solid-geometry', name: '柱体体积', formula: 'V=Sh', description: 'S 为底面积，h 为高' },
  { id: 140, subject: 'math', chapter: 'solid-geometry', name: '锥体体积', formula: 'V=\\frac13Sh', description: '适用于棱锥和圆锥' },
  { id: 141, subject: 'math', chapter: 'solid-geometry', name: '球的表面积与体积', formula: 'S=4\\pi R^2,\\quad V=\\frac43\\pi R^3', description: 'R 为球半径' },
  { id: 142, subject: 'math', chapter: 'solid-geometry', name: '空间两点距离', formula: 'd=\\sqrt{(x_1-x_2)^2+(y_1-y_2)^2+(z_1-z_2)^2}', description: '空间直角坐标系中的距离公式' },
  { id: 143, subject: 'math', chapter: 'solid-geometry', name: '两平面夹角', formula: '\\cos\\theta=\\frac{|\\boldsymbol n_1\\cdot\\boldsymbol n_2|}{|\\boldsymbol n_1||\\boldsymbol n_2|}', description: 'n₁、n₂ 为两平面的法向量，取锐角或直角' },
  { id: 144, subject: 'math', chapter: 'analytic-geometry', name: '两点距离', formula: 'd=\\sqrt{(x_1-x_2)^2+(y_1-y_2)^2}', description: '平面直角坐标系中的距离公式' },
  { id: 145, subject: 'math', chapter: 'analytic-geometry', name: '中点坐标', formula: 'M(\\frac{x_1+x_2}{2},\\frac{y_1+y_2}{2})', description: '线段两端点的中点' },
  { id: 146, subject: 'math', chapter: 'analytic-geometry', name: '直线斜率', formula: 'k=\\frac{y_2-y_1}{x_2-x_1}', description: 'x₁≠x₂' },
  { id: 147, subject: 'math', chapter: 'analytic-geometry', name: '直线点斜式', formula: 'y-y_0=k(x-x_0)', description: '斜率存在且过点 (x₀,y₀)' },
  { id: 148, subject: 'math', chapter: 'analytic-geometry', name: '两直线平行与垂直', formula: 'l_1\\parallel l_2\\Rightarrow k_1=k_2,\\quad l_1\\perp l_2\\Rightarrow k_1k_2=-1', description: '适用于两直线斜率均存在的情形' },
  { id: 149, subject: 'math', chapter: 'analytic-geometry', name: '两平行线距离', formula: 'd=\\frac{|C_1-C_2|}{\\sqrt{A^2+B^2}}', description: '两直线写成 Ax+By+C₁=0 与 Ax+By+C₂=0' },
  { id: 150, subject: 'math', chapter: 'analytic-geometry', name: '圆的一般方程', formula: 'x^2+y^2+Dx+Ey+F=0', description: 'D²+E²−4F>0，圆心为 (−D/2,−E/2)' },
  { id: 151, subject: 'math', chapter: 'analytic-geometry', name: '椭圆标准方程', formula: '\\frac{x^2}{a^2}+\\frac{y^2}{b^2}=1\\quad(a>b>0)', description: '焦点在 x 轴；焦点在 y 轴时交换 x、y' },
  { id: 152, subject: 'math', chapter: 'analytic-geometry', name: '椭圆离心率', formula: 'e=\\frac ca\\quad(0<e<1)', description: '其中 c²=a²−b²' },
  { id: 153, subject: 'math', chapter: 'analytic-geometry', name: '双曲线标准方程', formula: '\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=1', description: '焦点在 x 轴；焦点在 y 轴时交换并改变正负项' },
  { id: 154, subject: 'math', chapter: 'analytic-geometry', name: '双曲线渐近线', formula: 'y=\\pm\\frac ba x', description: '对应 x²/a²−y²/b²=1' },
  { id: 155, subject: 'math', chapter: 'analytic-geometry', name: '双曲线离心率', formula: 'e=\\frac ca\\quad(e>1)', description: '其中 c²=a²+b²' },
  { id: 156, subject: 'math', chapter: 'analytic-geometry', name: '抛物线标准方程', formula: 'y^2=2px\\quad(p>0)', description: '焦点 (p/2,0)，准线 x=−p/2；其他开口方向类推' },

  // ---- 数学：计数、概率统计与导数 ----
  { id: 157, subject: 'math', chapter: 'probability-statistics', name: '分类加法与分步乘法原理', formula: 'N=m_1+\\cdots+m_k,\\quad N=n_1\\cdots n_k', description: '分类完成用加法，分步完成用乘法' },
  { id: 158, subject: 'math', chapter: 'probability-statistics', name: '组合数性质', formula: 'C_n^m=C_n^{n-m},\\quad C_n^m=C_{n-1}^{m-1}+C_{n-1}^m', description: '组合数的对称性与递推关系' },
  { id: 159, subject: 'math', chapter: 'probability-statistics', name: '二项式定理', formula: '(a+b)^n=\\sum_{k=0}^n C_n^k a^{n-k}b^k', description: '第 k+1 项为 Cₙᵏaⁿ⁻ᵏbᵏ' },
  { id: 160, subject: 'math', chapter: 'probability-statistics', name: '古典概型', formula: 'P(A)=\\frac{n(A)}{n(\\Omega)}', description: '基本事件有限且等可能' },
  { id: 161, subject: 'math', chapter: 'probability-statistics', name: '互斥事件加法公式', formula: 'P(A\\cup B)=P(A)+P(B)', description: 'A、B 互斥时成立' },
  { id: 162, subject: 'math', chapter: 'probability-statistics', name: '独立事件乘法公式', formula: 'P(AB)=P(A)P(B)', description: 'A、B 相互独立时成立' },
  { id: 163, subject: 'math', chapter: 'probability-statistics', name: '全概率公式', formula: 'P(B)=\\sum_iP(A_i)P(B|A_i)', description: 'Aᵢ 构成完备事件组' },
  { id: 164, subject: 'math', chapter: 'probability-statistics', name: '贝叶斯公式', formula: 'P(A_i|B)=\\frac{P(A_i)P(B|A_i)}{\\sum_jP(A_j)P(B|A_j)}', description: '由结果反推原因的条件概率公式' },
  { id: 165, subject: 'math', chapter: 'probability-statistics', name: '方差', formula: 'D(X)=E(X^2)-[E(X)]^2', description: '随机变量方差的计算式' },
  { id: 166, subject: 'math', chapter: 'probability-statistics', name: '二项分布均值与方差', formula: 'E(X)=np,\\quad D(X)=np(1-p)', description: 'X~B(n,p)' },
  { id: 167, subject: 'math', chapter: 'probability-statistics', name: '样本均值', formula: '\\bar x=\\frac1n\\sum_{i=1}^n x_i', description: '样本数据的算术平均数' },
  { id: 168, subject: 'math', chapter: 'probability-statistics', name: '样本方差', formula: 's^2=\\frac1n\\sum_{i=1}^n(x_i-\\bar x)^2', description: '高中教材常用总体式分母 n' },
  { id: 169, subject: 'math', chapter: 'probability-statistics', name: '线性回归系数', formula: '\\hat b=\\frac{\\sum(x_i-\\bar x)(y_i-\\bar y)}{\\sum(x_i-\\bar x)^2},\\quad \\hat a=\\bar y-\\hat b\\bar x', description: '经验回归直线 ŷ=â+b̂x' },
  { id: 170, subject: 'math', chapter: 'derivatives', name: '常用基本导数', formula: '(x^n)\'=nx^{n-1},\\quad (e^x)\'=e^x,\\quad (\\ln x)\'=\\frac1x', description: '幂函数、指数函数、对数函数的基本导数' },
  { id: 171, subject: 'math', chapter: 'derivatives', name: '和差求导', formula: '(u\\pm v)\'=u\'\\pm v\'', description: '可导函数和差的求导法则' },
  { id: 172, subject: 'math', chapter: 'derivatives', name: '商的求导', formula: '\\left(\\frac uv\\right)\'=\\frac{u\'v-uv\'}{v^2}', description: 'v≠0' },
  { id: 173, subject: 'math', chapter: 'derivatives', name: '复合函数求导', formula: '[f(g(x))]\'=f\'(g(x))g\'(x)', description: '链式法则' },
  { id: 174, subject: 'math', chapter: 'derivatives', name: '极值必要条件', formula: 'x_0\\text{为可导函数的极值点}\\Rightarrow f\'(x_0)=0', description: '反之不一定成立，还需检查导数符号变化' },

  // ---- 物理：力学 ----
  { id: 175, subject: 'physics', chapter: 'mechanics', name: '匀变速直线运动速度', formula: 'v=v_0+at', description: '加速度恒定' },
  { id: 176, subject: 'physics', chapter: 'mechanics', name: '匀变速直线运动位移', formula: 'x=v_0t+\\frac12at^2', description: '加速度恒定' },
  { id: 177, subject: 'physics', chapter: 'mechanics', name: '速度位移关系', formula: 'v^2-v_0^2=2ax', description: '匀变速直线运动中消去时间' },
  { id: 178, subject: 'physics', chapter: 'mechanics', name: '平均速度', formula: '\\bar v=\\frac{x}{t}=\\frac{v_0+v}{2}', description: '后一个等式仅适用于匀变速直线运动' },
  { id: 179, subject: 'physics', chapter: 'mechanics', name: '滑动摩擦力', formula: 'f=\\mu N', description: 'μ 为动摩擦因数，N 为正压力' },
  { id: 180, subject: 'physics', chapter: 'mechanics', name: '胡克定律', formula: 'F=kx', description: '弹簧在弹性限度内，x 为形变量' },
  { id: 181, subject: 'physics', chapter: 'mechanics', name: '圆周运动线速度', formula: 'v=\\omega r=\\frac{2\\pi r}{T}', description: '匀速圆周运动' },
  { id: 182, subject: 'physics', chapter: 'mechanics', name: '向心加速度', formula: 'a_n=\\frac{v^2}{r}=\\omega^2r=\\frac{4\\pi^2r}{T^2}', description: '方向始终指向圆心' },
  { id: 183, subject: 'physics', chapter: 'mechanics', name: '向心力', formula: 'F_n=m\\frac{v^2}{r}=m\\omega^2r', description: '由沿半径方向的合力提供' },
  { id: 184, subject: 'physics', chapter: 'mechanics', name: '功', formula: 'W=Fl\\cos\\alpha', description: '恒力 F 与位移 l 的夹角为 α' },
  { id: 185, subject: 'physics', chapter: 'mechanics', name: '功率', formula: 'P=\\frac{W}{t}=Fv\\cos\\alpha', description: '第二式为瞬时功率' },
  { id: 186, subject: 'physics', chapter: 'mechanics', name: '动能与重力势能', formula: 'E_k=\\frac12mv^2,\\quad E_p=mgh', description: '重力势能取决于零势能面的选择' },
  { id: 187, subject: 'physics', chapter: 'mechanics', name: '弹性势能', formula: 'E_p=\\frac12kx^2', description: '劲度系数为 k 的理想弹簧' },
  { id: 188, subject: 'physics', chapter: 'mechanics', name: '动量', formula: '\\boldsymbol p=m\\boldsymbol v', description: '动量是矢量' },
  { id: 189, subject: 'physics', chapter: 'mechanics', name: '冲量', formula: '\\boldsymbol I=\\boldsymbol Ft', description: '恒力冲量；一般情形为 F-t 图线面积' },
  { id: 190, subject: 'physics', chapter: 'mechanics', name: '动量守恒', formula: 'm_1\\boldsymbol v_1+m_2\\boldsymbol v_2=m_1\\boldsymbol v_1\'+m_2\\boldsymbol v_2\'', description: '系统合外力冲量为零' },
  { id: 191, subject: 'physics', chapter: 'mechanics', name: '万有引力与重力', formula: 'mg=G\\frac{Mm}{R^2}', description: '忽略天体自转时表面附近成立' },
  { id: 192, subject: 'physics', chapter: 'mechanics', name: '环绕速度', formula: 'v=\\sqrt{\\frac{GM}{r}}', description: '卫星绕质量为 M 的天体做圆周运动' },
  { id: 193, subject: 'physics', chapter: 'mechanics', name: '开普勒第三定律', formula: '\\frac{T^2}{r^3}=\\text{常量}', description: '绕同一中心天体的圆轨道；椭圆用半长轴 a' },
  { id: 194, subject: 'physics', chapter: 'mechanics', name: '简谐运动', formula: 'x=A\\sin(\\omega t+\\varphi),\\quad a=-\\omega^2x', description: 'ω=2π/T' },
  { id: 195, subject: 'physics', chapter: 'mechanics', name: '机械波关系', formula: 'v=\\lambda f=\\frac{\\lambda}{T}', description: '波速由介质决定' },

  // ---- 物理：电磁学 ----
  { id: 196, subject: 'physics', chapter: 'electromagnetism', name: '点电荷场强', formula: 'E=k\\frac{|Q|}{r^2}', description: '真空中点电荷产生的电场' },
  { id: 197, subject: 'physics', chapter: 'electromagnetism', name: '匀强电场场强', formula: 'E=\\frac Ud', description: 'd 为沿电场方向的距离' },
  { id: 198, subject: 'physics', chapter: 'electromagnetism', name: '电场力做功', formula: 'W_{AB}=qU_{AB}', description: '电势能变化 ΔEₚ=−W_AB' },
  { id: 199, subject: 'physics', chapter: 'electromagnetism', name: '电势与电势能', formula: '\\varphi=\\frac{E_p}{q},\\quad E_p=q\\varphi', description: '电势是电场本身的性质' },
  { id: 200, subject: 'physics', chapter: 'electromagnetism', name: '平行板电容器', formula: 'C=\\frac{\\varepsilon_rS}{4\\pi kd}', description: '真空时 εᵣ=1；S 为正对面积' },
  { id: 201, subject: 'physics', chapter: 'electromagnetism', name: '电容器能量', formula: 'E_C=\\frac12CU^2=\\frac{Q^2}{2C}=\\frac12QU', description: '电容器储存的电场能' },
  { id: 202, subject: 'physics', chapter: 'electromagnetism', name: '电流微观表达式', formula: 'I=nqSv_d', description: 'n 为单位体积自由电荷数，v_d 为定向移动速率' },
  { id: 203, subject: 'physics', chapter: 'electromagnetism', name: '电阻定律', formula: 'R=\\rho\\frac lS', description: 'ρ 为材料电阻率' },
  { id: 204, subject: 'physics', chapter: 'electromagnetism', name: '串联电路', formula: 'R=R_1+R_2+\\cdots', description: '串联电流相等、电压相加' },
  { id: 205, subject: 'physics', chapter: 'electromagnetism', name: '并联电路', formula: '\\frac1R=\\frac1{R_1}+\\frac1{R_2}+\\cdots', description: '并联电压相等、电流相加' },
  { id: 206, subject: 'physics', chapter: 'electromagnetism', name: '闭合电路欧姆定律', formula: 'I=\\frac{\\mathcal E}{R+r}', description: '电源电动势为 ℰ，内阻为 r' },
  { id: 207, subject: 'physics', chapter: 'electromagnetism', name: '路端电压', formula: 'U=\\mathcal E-Ir', description: '电源放电时的路端电压' },
  { id: 208, subject: 'physics', chapter: 'electromagnetism', name: '电功与电功率', formula: 'W=UIt,\\quad P=UI', description: '对任意电路元件均适用' },
  { id: 209, subject: 'physics', chapter: 'electromagnetism', name: '安培力', formula: 'F=BIL\\sin\\theta', description: 'θ 为电流方向与磁场方向夹角' },
  { id: 210, subject: 'physics', chapter: 'electromagnetism', name: '洛伦兹力', formula: 'F=qvB\\sin\\theta', description: '运动电荷在磁场中受到的力' },
  { id: 211, subject: 'physics', chapter: 'electromagnetism', name: '带电粒子磁场圆周半径', formula: 'r=\\frac{mv}{|q|B}', description: '速度垂直磁场时' },
  { id: 212, subject: 'physics', chapter: 'electromagnetism', name: '带电粒子磁场周期', formula: 'T=\\frac{2\\pi m}{|q|B}', description: '速度垂直磁场，周期与速率和半径无关' },
  { id: 213, subject: 'physics', chapter: 'electromagnetism', name: '磁通量', formula: '\\Phi=BS\\cos\\theta', description: 'θ 为磁场与面积法线夹角' },
  { id: 214, subject: 'physics', chapter: 'electromagnetism', name: '法拉第电磁感应定律', formula: 'E=n\\frac{|\\Delta\\Phi|}{\\Delta t}', description: 'n 匝线圈的平均感应电动势' },
  { id: 215, subject: 'physics', chapter: 'electromagnetism', name: '导体棒切割磁感线', formula: 'E=BLv\\sin\\theta', description: 'B、L、v 两两垂直时 E=BLv' },
  { id: 216, subject: 'physics', chapter: 'electromagnetism', name: '正弦交流电', formula: 'e=E_m\\sin\\omega t,\\quad E=\\frac{E_m}{\\sqrt2}', description: 'E 为正弦交流电的有效值' },
  { id: 217, subject: 'physics', chapter: 'electromagnetism', name: '理想变压器', formula: '\\frac{U_1}{U_2}=\\frac{n_1}{n_2},\\quad U_1I_1=U_2I_2', description: '忽略损耗；单组副线圈' },

  // ---- 物理：光学、热学与近代物理 ----
  { id: 218, subject: 'physics', chapter: 'optics', name: '折射率', formula: 'n=\\frac cv=\\frac{\\sin i}{\\sin r}', description: '真空射入介质时的绝对折射率' },
  { id: 219, subject: 'physics', chapter: 'optics', name: '全反射临界角', formula: '\\sin C=\\frac1n', description: '光从折射率 n 的介质射向真空' },
  { id: 220, subject: 'physics', chapter: 'optics', name: '双缝干涉条纹间距', formula: '\\Delta x=\\frac Ld\\lambda', description: 'L 为双缝到屏距离，d 为双缝间距' },
  { id: 221, subject: 'physics', chapter: 'thermodynamics', name: '摄氏温度与热力学温度', formula: 'T=t+273.15', description: 'T 单位 K，t 单位 ℃' },
  { id: 222, subject: 'physics', chapter: 'thermodynamics', name: '玻意耳定律', formula: 'p_1V_1=p_2V_2', description: '一定质量理想气体等温变化' },
  { id: 223, subject: 'physics', chapter: 'thermodynamics', name: '查理定律', formula: '\\frac{V_1}{T_1}=\\frac{V_2}{T_2}', description: '一定质量理想气体等压变化' },
  { id: 224, subject: 'physics', chapter: 'thermodynamics', name: '盖-吕萨克定律', formula: '\\frac{p_1}{T_1}=\\frac{p_2}{T_2}', description: '一定质量理想气体等容变化' },
  { id: 225, subject: 'physics', chapter: 'thermodynamics', name: '理想气体综合状态方程', formula: '\\frac{p_1V_1}{T_1}=\\frac{p_2V_2}{T_2}', description: '一定质量理想气体' },
  { id: 226, subject: 'physics', chapter: 'modern', name: '光子能量', formula: 'E=h\\nu=\\frac{hc}{\\lambda}', description: 'h 为普朗克常量' },
  { id: 227, subject: 'physics', chapter: 'modern', name: '光电效应方程', formula: 'h\\nu=W_0+E_{km}', description: '逸出功 W₀，最大初动能 Eₖₘ' },
  { id: 228, subject: 'physics', chapter: 'modern', name: '德布罗意波长', formula: '\\lambda=\\frac hp', description: '实物粒子的物质波波长' },
  { id: 229, subject: 'physics', chapter: 'modern', name: '质能方程', formula: 'E=mc^2,\\quad \\Delta E=\\Delta mc^2', description: '质量与能量的关系及核反应释放能' },
  { id: 230, subject: 'physics', chapter: 'modern', name: '放射性衰变', formula: 'N=N_0(\\frac12)^{t/T}', description: 'T 为半衰期' },
  { id: 231, subject: 'physics', chapter: 'modern', name: '氢原子能级', formula: 'E_n=\\frac{E_1}{n^2}', description: 'E₁=−13.6 eV，n=1,2,…' },
  { id: 232, subject: 'physics', chapter: 'modern', name: '氢原子跃迁', formula: 'h\\nu=|E_m-E_n|', description: '吸收或发射光子的能量等于能级差' },

  // ---- 化学：基本计算与无机 ----
  { id: 233, subject: 'chemistry', chapter: 'basic', name: '气体摩尔体积', formula: 'V_m=\\frac Vn', description: '标准状况下约为 22.4 L·mol⁻¹，使用时必须注明条件' },
  { id: 234, subject: 'chemistry', chapter: 'basic', name: '阿伏加德罗常数', formula: 'N=nN_A', description: '粒子数 N 与物质的量 n 的关系' },
  { id: 235, subject: 'chemistry', chapter: 'basic', name: '质量分数', formula: 'w=\\frac{m_{\\text{溶质}}}{m_{\\text{溶液}}}\\times100\\%', description: '溶质质量占溶液质量的百分比' },
  { id: 236, subject: 'chemistry', chapter: 'basic', name: '溶液稀释', formula: 'c_1V_1=c_2V_2', description: '稀释前后溶质的物质的量不变' },
  { id: 237, subject: 'chemistry', chapter: 'basic', name: '物质的量浓度与质量分数', formula: 'c=\\frac{1000\\rho w}{M}', description: 'ρ 用 g·cm⁻³，M 用 g·mol⁻¹，c 得 mol·L⁻¹' },
  { id: 238, subject: 'chemistry', chapter: 'basic', name: '气体摩尔质量', formula: 'M=\\rho V_m', description: 'ρ 与 Vₘ 的单位必须配套' },
  { id: 239, subject: 'chemistry', chapter: 'basic', name: '相对密度', formula: 'D_{A/B}=\\frac{M_A}{M_B}', description: '同温同压下气体密度之比等于摩尔质量之比' },
  { id: 240, subject: 'chemistry', chapter: 'basic', name: '混合气体平均摩尔质量', formula: '\\bar M=\\sum_i x_iM_i', description: 'xᵢ 为各组分的物质的量分数' },
  { id: 241, subject: 'chemistry', chapter: 'basic', name: '产率', formula: '\\eta=\\frac{m_{\\text{实际}}}{m_{\\text{理论}}}\\times100\\%', description: '实际产量与理论产量之比' },
  { id: 242, subject: 'chemistry', chapter: 'inorganic', name: '电子转移守恒', formula: 'n(e^-_{\\text{失}})=n(e^-_{\\text{得}})', description: '氧化还原反应计算的核心守恒关系' },
  { id: 243, subject: 'chemistry', chapter: 'inorganic', name: '电荷守恒', formula: '\\sum c_i|z_i|_{\\text{阳}}=\\sum c_j|z_j|_{\\text{阴}}', description: '溶液中正负电荷总量相等' },
  { id: 244, subject: 'chemistry', chapter: 'inorganic', name: 'pOH 定义', formula: '\\mathrm{pOH}=-\\lg c(OH^-)', description: '稀溶液中氢氧根浓度的负常用对数' },
  { id: 245, subject: 'chemistry', chapter: 'inorganic', name: 'pH 与 pOH', formula: '\\mathrm{pH}+\\mathrm{pOH}=14', description: '25 ℃ 水溶液中成立' },

  // ---- 化学：有机与化学反应原理 ----
  { id: 246, subject: 'chemistry', chapter: 'organic', name: '烷烃通式', formula: 'C_nH_{2n+2}', description: '链状饱和一元烃' },
  { id: 247, subject: 'chemistry', chapter: 'organic', name: '烯烃与环烷烃通式', formula: 'C_nH_{2n}', description: '单烯烃或单环环烷烃' },
  { id: 248, subject: 'chemistry', chapter: 'organic', name: '炔烃与二烯烃通式', formula: 'C_nH_{2n-2}', description: '单炔烃或链状二烯烃' },
  { id: 249, subject: 'chemistry', chapter: 'organic', name: '苯及其同系物通式', formula: 'C_nH_{2n-6}', description: '含一个苯环的苯的同系物，n≥6' },
  { id: 250, subject: 'chemistry', chapter: 'organic', name: '饱和一元醇通式', formula: 'C_nH_{2n+2}O', description: '也可写为 CₙH₂ₙ₊₁OH' },
  { id: 251, subject: 'chemistry', chapter: 'organic', name: '饱和一元羧酸与酯通式', formula: 'C_nH_{2n}O_2', description: '链状饱和一元羧酸或对应酯' },
  { id: 252, subject: 'chemistry', chapter: 'organic', name: '有机物不饱和度', formula: '\\Omega=\\frac{2C+2+N-H-X}{2}', description: 'O、S 不计，卤素 X 按氢处理' },
  { id: 253, subject: 'chemistry', chapter: 'physical', name: '化学反应速率', formula: 'v=\\frac{\\Delta c}{\\Delta t}', description: '通常取浓度变化量的绝对值除以时间' },
  { id: 254, subject: 'chemistry', chapter: 'physical', name: '速率与计量数关系', formula: '\\frac{v(A)}a=\\frac{v(B)}b=\\frac{v(C)}c=\\frac{v(D)}d', description: '反应 aA+bB→cC+dD 中各物质速率关系' },
  { id: 255, subject: 'chemistry', chapter: 'physical', name: '平衡转化率', formula: '\\alpha=\\frac{n_{\\text{转化}}}{n_{\\text{起始}}}\\times100\\%', description: '指定反应物达到平衡时的转化程度' },
  { id: 256, subject: 'chemistry', chapter: 'physical', name: '标准平衡常数', formula: 'K^\\circ=\\prod_B(p_B/p^\\circ)^{\\nu_B}', description: '气相反应用相对分压表达；高中题常简写为 Kp' },
  { id: 257, subject: 'chemistry', chapter: 'physical', name: '弱酸电离常数', formula: 'K_a=\\frac{c(H^+)c(A^-)}{c(HA)}', description: 'HA⇌H⁺+A⁻，浓度取平衡浓度' },
  { id: 258, subject: 'chemistry', chapter: 'physical', name: '弱碱电离常数', formula: 'K_b=\\frac{c(BH^+)c(OH^-)}{c(B)}', description: 'B+H₂O⇌BH⁺+OH⁻' },
  { id: 259, subject: 'chemistry', chapter: 'physical', name: '酸碱共轭关系', formula: 'K_aK_b=K_w', description: '同一共轭酸碱对在相同温度下成立' },
  { id: 260, subject: 'chemistry', chapter: 'physical', name: '溶度积', formula: 'K_{sp}=c(M^{m+})^ac(A^{n-})^b', description: '难溶电解质 MₐA_b 的饱和溶液，浓度取平衡值' },
  { id: 261, subject: 'chemistry', chapter: 'physical', name: '反应热与键能', formula: '\\Delta H=\\sum E_{\\text{断键}}-\\sum E_{\\text{成键}}', description: '断键吸热、成键放热' },
  { id: 262, subject: 'chemistry', chapter: 'physical', name: '盖斯定律', formula: '\\Delta H=\\Delta H_1+\\Delta H_2+\\cdots', description: '反应热只与始态和终态有关' },
  { id: 263, subject: 'chemistry', chapter: 'physical', name: '燃烧热计算', formula: 'Q=n|\\Delta H_c|', description: 'n 为完全燃烧物质的量，注意标准燃烧热定义' },
  { id: 264, subject: 'chemistry', chapter: 'physical', name: '原电池电极反应总和', formula: '\\text{负极氧化}+\\text{正极还原}=\\text{总反应}', description: '电子由负极经外电路流向正极' },
  { id: 265, subject: 'chemistry', chapter: 'physical', name: '法拉第电解定律', formula: 'n(e^-)=\\frac{It}{F}', description: 'F≈9.65×10⁴ C·mol⁻¹，常用于电解定量计算' },
  { id: 266, subject: 'chemistry', chapter: 'physical', name: '电解产物与电子关系', formula: 'n(\\text{产物})=\\frac{It}{zF}', description: 'z 为生成 1 mol 产物转移的电子数' }
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
