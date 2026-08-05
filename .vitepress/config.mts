import { defineConfig } from 'vitepress'

export default defineConfig({
  // GitHub Actions 会为项目站点注入仓库子路径；本地开发仍使用根路径。
  base: process.env.BASE_PATH || '/',
  title: "爱学习",
  description: "分享学习方法、学习工具、学习资料等",

  markdown: {
    lineNumbers: true
  },

  themeConfig: {
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
            { text: '前言', link: '/数学/前言' },
          ]
        }
      ],
      // 语文板块
      '/语文/': [
        {
          text: '语文',
          items: [
            { text: '前言', link: '/语文/前言' },
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
