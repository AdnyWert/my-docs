/** VitePress 指南模块：导航入口 + 侧边栏目录 */
export default {
  // 顶部导航菜单
  navItem: {
    text: 'VitePress',
    link: 'guide/getting-started'
  },
  // 当前模块对应的侧边栏路由映射
  sidebarMap: {
    '/guide/': [
      {
        text: '入门指南',
        items: [
          { text: '快速开始', link: '/guide/getting-started' },
          { text: '进阶篇', link: '/guide/intermediate.md' },
          { text: '高级篇', link: '/guide/advanced' }
        ]
      },
      {
        text: "写作",
        items: [
          { text: 'Markdown 扩展', link: '/guide/writting/Markdown 扩展.md' },
          { text: '在 Markdown 中使用 Vue', link: '/guide/writting/在 Markdown 中使用 Vue.md' },
          { text: 'VitePress 自定义组件样式', link: '/guide/writting/VitePress 自定义组件样式.md' },
          { text: 'VitePress 自定义页面', link: '/guide/writting/VitePress 自定义页面.md' },
        ]
      }
    ]
  }
}