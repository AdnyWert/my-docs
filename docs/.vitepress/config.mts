import { defineConfig } from 'vitepress'
import markdownItMark from 'markdown-it-mark'
// @ts-ignore
import tailwind from '@tailwindcss/vite'


// 引入自动生成导航、侧边栏的工具函数
import { getNav, getSidebar } from './modules'

export default defineConfig({
  // 站点标题
  title: '归至的知识积累',
  description: '知识分享',
  // 设置网站图标
  head: [
    ['link', {rel: 'icon', href: 'static/image/banana.svg'}],
  ],
  // ,
  vite: {
    plugins: [
      tailwind(),
    ]
  },

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
    logo: '/static/image/banana.svg',

    // 导航栏
    nav: getNav(),
    // 自动合并所有模块侧边栏
    sidebar: getSidebar(),

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
      copyright: `Copyright © 2026.07.17-${ new Date().getFullYear() } @guizhi. All rights reserved  | 渝ICP备2026005423号-1`,
    },
    // 最后更新时间
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        era: "narrow",
      },
    },
    // 文档页脚
    docFooter: {
      prev: '上一页',
    },

    // 中文配置
    langMenuLabel: "多语言",
    returnToTopLabel: "回到顶部",
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: "切换到浅色模式",
    // outlineTitle: '页面导航', // 已过时
    outline: {
      label: '页面目录', level: 'deep', // 2级标题+
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
    },
    config(md) {
      md.use(markdownItMark)
    }
  },

  // ⭐ 构建输出目录（Cloudflare Pages 默认读取） or ‘'../../dist'’
  // outDir: './dist', // docs/dist/
  outDir: '../dist', // dist/
  // outDir: '../kk/dist', kk/dist/

})

