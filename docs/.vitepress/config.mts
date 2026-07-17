import { defineConfig } from 'vitepress'

export default defineConfig({
  // 站点标题
  title: '归至的知识积累',
  description: '知识分享',


  // ⭐ 关键：如果部署到子路径，需要设置 base
  // Cloudflare Pages 默认是根路径，不需要设置
  // base: '/my-docs/',

  // 语言设置
  lang: 'zh-CN',

  // 最后更新时间
  lastUpdated: true,

  // 主题配置
  themeConfig: {
    // 站点首页标题
    siteTitle: "归至",
    // 站点首页 icon
    logo: 'banana.svg',

    // 导航栏
    nav: [
      { text: '首页', link: "/" },
      { text: 'VitePress', link: 'guide/getting-started' },
      { text: 'Codex', items: [
          { text: "Codex 基础", link: 'codex/basic' },
          // 带分隔线的 选项菜单
          { items: [
              { text: "Codex 高阶", link: 'codex/advanced' }
            ] },
        ]},
      { text: 'API', link: '/api/' }
    ],

    // ⭐ 左侧侧边栏（文档目录）
    sidebar: {


      '/guide/': [{
          text: '入门指南',
          items: [
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '进阶篇', link: '/guide/intermediate.md' },
            { text: '高级篇', link: '/guide/advanced' } // ⭐ 添加新条目
          ]
        },{
          text: "写作",
          items: [
            { text: 'Markdown 扩展', link: '/guide/writting/Markdown 扩展.md' },
          ]}
      ],
      '/api/': [
        {
          text: 'API 文档',
          items: [
            { text: '概述', link: '/api/' }
          ]
        }
      ],



      '/codex/advanced/': [{
        text: '高级篇',
        items: [
          { text: '高级篇2完整教程', link: '/codex/advanced/Codex 使用指南（高级篇2·指令_Agent_Model_Skills 全解手册）.md' },
        ]
      }],


      '/codex/': [
        {
          text: 'Codex 使用教学',
          items: [
            { text: '入门篇', link: '/codex/Codex 使用指南（基础篇·教科书完整版）.md'},
            { text: '进阶篇', link: '/codex/Codex 使用指南（进阶篇·教科书完整版）.md'},
            // 一级子项：高级篇分类，内含嵌套三级子页面
            {
              text: 'Codex 高级篇',
              items: [
                { text: '高级篇完整教程', link: '/codex/advanced/Codex 使用指南（高级篇·教科书完整版）.md' },
                { text: '高级篇2完整教程', link: '/codex/advanced/Codex 使用指南（高级篇2·指令_Agent_Model_Skills 全解手册）.md' },
                // 在这里继续添加更多高级篇子页面，示例：
                // { text: '自定义指令', link: '/codex/advanced/custom.md' },
                // { text: '性能优化', link: '/codex/advanced/optimize.md' },
              ]
            }
          ]
        },
        // 单独分组
        {
          text: 'Codex 查表',
          items: [
            { text: '斜杠指令极简速查表', link: '/codex/lookup/Codex-CLI v0.142.0 斜杠指令极简速查表' },
            // 高级篇更多子页面放这里
          ]
        }
      ],
    },

    // 右侧文章目录（自动生成，无需配置）
    // VitePress 会自动提取 h2/h3 作为右侧目录

    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/AdnyWert/my-docs' },
      { icon: 'csdn', link: 'https://blog.csdn.net/m0_74197761' }
    ],

    // 编辑链接
    editLink: {
      pattern: 'https://github.com/AdnyWert/my-docs/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },

    // 搜索
    search: {
      provider: 'local'
    },
    // 页脚授权
    footer: {
      message: '归至而行，初心一道.',
      copyright: 'Copyright © 2026.07.17 @guizhi. All rights reserved  | 渝ICP备2026005423号-1'
    }
  },

  // markdown 样式
  markdown: {
    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详细信息'
    },
    // 添加代码行号
    lineNumbers: true,
    // 支持 LaTex 公式渲染
    math: true,
    image: {
      // 默认禁用；设置为 true 可为所有图片启用懒加载。
      lazyLoading: true
    }
  },

  // ⭐ 构建输出目录（Cloudflare Pages 默认读取） or ‘'../../dist'’
  outDir: '../dist'
})

