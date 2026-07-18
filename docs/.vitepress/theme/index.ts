// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import './custome01/styles.css'

// @ts-ignore
import Counter from './components/Counter.vue' // [!code ++]
// @ts-ignore
import ClockFlip from './components/clock-flip/ClockFlip.vue'
// @ts-ignore
import PromoteBanner from './components/PromoteBanner.vue'
export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'home-hero-info-after': () => h(ClockFlip),
      'doc-footer-before': () => h(PromoteBanner),
    })
  },
  enhanceApp({ app, router, siteData }) {
    app.component("Counter", Counter),  // [!code ++]
    app.component("ClockFlip", ClockFlip)  // [!code ++]
    // ...
  }
} satisfies Theme
