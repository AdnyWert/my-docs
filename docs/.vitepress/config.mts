import { defineConfig } from 'vitepress'

export default defineConfig({
  // 站点标题
  title: '我的文档站',
  description: '基于 VitePress 的文档站点',

  // ⭐ 关键：如果部署到子路径，需要设置 base
  // Cloudflare Pages 默认是根路径，不需要设置
  // base: '/my-docs/',

  // 语言设置
  lang: 'zh-CN',

  // 最后更新时间
  lastUpdated: true,

  // 主题配置
  themeConfig: {
    // 导航栏
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/getting-started' },
      { text: 'API', link: '/api/' }
    ],

    // ⭐ 左侧侧边栏（文档目录）
    sidebar: {
      '/guide/': [
        {
          text: '入门指南',
          items: [
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '高级用法', link: '/guide/advanced' },
            { text: '新文章', link: '/guide/new-article' }  // ⭐ 添加新条目
          ]
        }
      ],
      '/api/': [
        {
          text: 'API 文档',
          items: [
            { text: '概述', link: '/api/' }
          ]
        }
      ]
    },

    // 右侧文章目录（自动生成，无需配置）
    // VitePress 会自动提取 h2/h3 作为右侧目录

    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/你的用户名/my-docs' }
    ],

    // 编辑链接
    editLink: {
      pattern: 'https://github.com/AdnyWert/my-docs/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },

    // 搜索
    search: {
      provider: 'local'
    }
  },

  // ⭐ 构建输出目录（Cloudflare Pages 默认读取） or ‘'../../dist'’
  outDir: '../dist'
})