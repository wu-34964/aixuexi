import { defineConfig } from 'vitepress'

export default defineConfig({
  // GitHub Actions 会为项目站点注入仓库子路径；本地开发仍使用根路径。
  base: process.env.BASE_PATH || '/',
  title: "爱学习",
  description: "分享学习方法、学习工具、学习资料等",

  markdown: {
    lineNumbers: true,
    math: true
  },

  themeConfig: {
    sidebarMenuLabel: '菜单',
    outline: { label: '本页目录' },
    returnToTopLabel: '返回顶部',

    /*导航栏*/
    nav: [
      { text: '首页', link: '/' },
      { text: '📖语文', link: '/语文/前言' },
      { text: '📐数学', link: '/数学/前言' },
      { text: '🎧英语', link: '/英语/前言' },
      { text: '📁其它科目', items: [{ text: '🧲物理', link: '/物理/前言' }, 
        { text: '🧪化学', link: '/化学/前言' },
        { text: '🧬生物', link: '/生物/前言' },
        { text: '🎞️历史', link: '/历史/前言' },
        { text: '📰政治', link: '/政治/前言' },
        { text: '🔭地理', link: '/地理/前言' },
      ] },

      { text: '📦百宝箱', items: [{ text: '🧰工具集合', link: '/tools/index' }, 
        { component: 'NavDivider' },
        { text: '📅历年真题', link: '/tools/历年真题' },
        { text: '📖电子课本', link: '/tools/电子课本' },
      ] },
    ],
    
    /*侧边栏*/
    sidebar: {
      // 数学板块
      '/数学/': [
        {
          text: '数学',
          items: [
            { text: '📖 学科首页', link: '/数学/前言' },
            { text: '🔣 集合与逻辑', link: '/数学/集合与逻辑/' },
            { text: '📈 函数与不等式', link: '/数学/函数与不等式/' },
            { text: '📐 三角函数与平面向量', link: '/数学/三角函数与平面向量/' },
            { text: '🔢 数列', link: '/数学/数列/' },
            { text: 'ℂ 复数', link: '/数学/复数/' },
            { text: '🧊 立体几何与空间向量', link: '/数学/立体几何与空间向量/' },
            { text: '⭕ 解析几何', link: '/数学/解析几何/' },
            { text: '🎲 计数原理与概率统计', link: '/数学/计数原理与概率统计/' },
            { text: '〽️ 导数及其应用', link: '/数学/导数及其应用/' },
          ]
        },
        {
          text: '集合与逻辑',
          items: [
            { text: '集合的表示与运算', link: '/数学/集合与逻辑/集合的表示与运算' },
            { text: '命题与充分必要条件', link: '/数学/集合与逻辑/命题与充分必要条件' },
          ]
        },
        {
          text: '函数与不等式',
          items: [
            { text: '函数概念与基本性质', link: '/数学/函数与不等式/函数概念与基本性质' },
            { text: '基本初等函数与不等式', link: '/数学/函数与不等式/基本初等函数与不等式' },
          ]
        },
        {
          text: '三角函数与平面向量',
          items: [
            { text: '三角函数与恒等变换', link: '/数学/三角函数与平面向量/三角函数与恒等变换' },
            { text: '解三角形与平面向量', link: '/数学/三角函数与平面向量/解三角形与平面向量' },
          ]
        },
        {
          text: '数列与复数',
          items: [
            { text: '等差与等比数列', link: '/数学/数列/等差与等比数列' },
            { text: '递推数列与求和', link: '/数学/数列/递推数列与求和' },
            { text: '复数的概念与运算', link: '/数学/复数/复数的概念与运算' },
            { text: '复数的几何意义', link: '/数学/复数/复数的几何意义' },
          ]
        },
        {
          text: '几何',
          items: [
            { text: '空间位置关系', link: '/数学/立体几何与空间向量/空间位置关系' },
            { text: '空间向量与角距离', link: '/数学/立体几何与空间向量/空间向量与角距离' },
            { text: '直线与圆', link: '/数学/解析几何/直线与圆' },
            { text: '圆锥曲线', link: '/数学/解析几何/圆锥曲线' },
          ]
        },
        {
          text: '概率统计与导数',
          items: [
            { text: '计数原理与古典概型', link: '/数学/计数原理与概率统计/计数原理与古典概型' },
            { text: '概率分布与统计', link: '/数学/计数原理与概率统计/概率分布与统计' },
            { text: '导数的概念与运算', link: '/数学/导数及其应用/导数的概念与运算' },
            { text: '单调性极值与最值', link: '/数学/导数及其应用/单调性极值与最值' },
          ]
        }
      ],
      // 语文板块
      '/语文/': [
        {
          text: '语文',
          items: [
            { text: '📖 学科首页', link: '/语文/前言' },
            { text: '🧩 语言文字运用', link: '/语文/语言文字运用/' },
            { text: '📜 古诗文阅读', link: '/语文/古诗文阅读/' },
            { text: '📚 现代文阅读', link: '/语文/现代文阅读/' },
            { text: '✍️ 写作', link: '/语文/写作/' },
          ]
        },
        {
          text: '语言文字运用',
          items: [
            { text: '词语与成语', link: '/语文/语言文字运用/词语与成语' },
            { text: '辨析并修改病句', link: '/语文/语言文字运用/辨析并修改病句' },
            { text: '语句衔接与表达效果', link: '/语文/语言文字运用/语句衔接与表达效果' },
            { text: '压缩仿写与图文转换', link: '/语文/语言文字运用/压缩仿写与图文转换' },
          ]
        },
        {
          text: '古诗文阅读',
          items: [
            { text: '实词虚词与句式', link: '/语文/古诗文阅读/文言实词虚词与句式' },
            { text: '断句与翻译', link: '/语文/古诗文阅读/断句与翻译' },
            { text: '内容理解与文化常识', link: '/语文/古诗文阅读/内容理解与文化常识' },
            { text: '古代诗歌鉴赏', link: '/语文/古诗文阅读/古代诗歌鉴赏' },
            { text: '名篇名句默写', link: '/语文/古诗文阅读/名篇名句默写' },
          ]
        },
        {
          text: '现代文阅读',
          items: [
            { text: '阅读通用方法', link: '/语文/现代文阅读/阅读通用方法' },
            { text: '信息类文本阅读', link: '/语文/现代文阅读/信息类文本阅读' },
            { text: '文学类文本阅读', link: '/语文/现代文阅读/文学类文本阅读' },
          ]
        },
        {
          text: '写作',
          items: [
            { text: '审题与立意', link: '/语文/写作/审题与立意' },
            { text: '结构与论证', link: '/语文/写作/结构与论证' },
            { text: '素材语言与升格修改', link: '/语文/写作/素材语言与升格修改' },
          ]
        }
      ],
      // 英语板块
      '/英语/': [
        {
          text: '英语',
          items: [
            { text: '📖 学科首页', link: '/英语/前言' },
            { text: '📝 单词', link: '/英语/单词/' },
            { text: '📐 语法', link: '/英语/语法/' },
            { text: '🎯 题型攻略', link: '/英语/题型攻略/' },
            { text: '✍️ 作文', link: '/英语/作文/' },
          ]
        },
        {
          text: '单词子模块',
          items: [
            { text: '高频词汇', link: '/英语/单词/高频词汇' },
            { text: '熟词生义', link: '/英语/单词/熟词生义' },
          ]
        },
        {
          text: '语法子模块',
          items: [
            { text: '时态语态', link: '/英语/语法/时态语态' },
            { text: '非谓语动词', link: '/英语/语法/非谓语动词' },
            { text: '三大从句', link: '/英语/语法/三大从句' },
            { text: '特殊句式', link: '/英语/语法/特殊句式' },
          ]
        }
      ],
      // ===== 工具箱侧边栏（所有工具页面共享） =====
      '/tools/': [
        {
          text: '',
          items: [
            
            { text: '🧰 工具箱', link: '/tools/index' },
            { text: '📅 历年真题', link: '/tools/历年真题' },
            { text: '📖 3000单词', link: '/tools/150天背单词' },
            { text: '🔦 公式查询', link: '/tools/公式查询' },
            { text: '🔠 单词攻坚', link: '/tools/单词攻坚' },
            { text: '🖨️ 打印模板', link: '/tools/打印模板' },
            { text: '⏱️ 计时工具', link: '/tools/计时工具' },
            { text: '📖 电子课本', link: '/tools/电子课本' },
            { text: '📝 名句默写', link: '/tools/名句默写' },
          ]
        }
      ]
    },

    // 搜索功能配置
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {buttonText: '搜索文档',       // 修改搜索按钮的提示文字
            buttonAriaLabel: '搜索文档'   // 为无障碍访问设置，保持一致
          },
          modal: {
            noResultsText: '无法找到相关结果',      // 搜索结果为空时的提示
            resetButtonTitle: '清除查询条件',      // 重置按钮的提示
            footer: {
              selectText: '选择',                   // 底部“选择”按钮的文本
              navigateText: '切换'                  // 底部“切换”按钮的文本
            }
          }
        }
      }
    },
    
  }
  

})
