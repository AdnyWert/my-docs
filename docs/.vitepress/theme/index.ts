// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import './custome01/styles.css'

import ElementPlus from 'element-plus'
// 全局引入Element Plus完整样式
import 'element-plus/dist/index.css'
// Element Plus 暗黑主题，自动跟随页面dark类切换
import 'element-plus/theme-chalk/dark/css-vars.css'


// @ts-ignore
import Counter from './components/Counter.vue' // [!code ++]
// @ts-ignore
import ClockFlip from './components/clock-flip/ClockFlip.vue'
// @ts-ignore
import PromoteBanner from './components/PromoteBanner.vue'

import './custome01/custom.css' // 直接导入不行：import 'tailwindcss'

// 引入头像组件
// @ts-ignore
import UserAvatar from './components/UserAvatar.vue'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'home-hero-info-after': () => h(ClockFlip),
      'doc-footer-before': () => h(PromoteBanner),
      // 使用插槽显示头像组件
      'nav-bar-content-after': () => h(UserAvatar),
    })
  },
  enhanceApp({ app, router, siteData }) {
    app.component("Counter", Counter),
    app.component("ClockFlip", ClockFlip),
    // 全局挂载ElementPlus，全局所有md页面、自定义组件均可直接使用el-xxx组件
    app.use(ElementPlus)
    // ...
  }
} satisfies Theme

