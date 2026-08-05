// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import './custom.css'   // 引入自定义样式

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp?.(ctx)
    ctx.app.component('NavDivider', {
      render: () => h('div', { class: 'nav-divider' })
    })
  }
}
