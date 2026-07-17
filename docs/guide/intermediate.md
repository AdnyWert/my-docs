# VitePress 使用指南 · 进阶篇（教科书精讲版）
适用人群：已读完基础篇、能独立搭建基础文档站，想要丰富网站功能、优化交互、拓展页面能力的开发者
前置储备：熟练掌握基础配置、目录结构、基础MD编写、dev/build/preview命令
学习目标：掌握高级页面语法、自定义导航/侧边栏、全文搜索、国际化、静态资源处理、页面交互、样式微调、部署优化等进阶能力
篇章说明：本篇承接基础篇，聚焦**功能增强与工程优化**；插件开发、自定义主题、SSR、CI/CD自动化部署等归入高级篇。

## 第1章 Markdown 进阶增强语法 📝
VitePress 在标准 Markdown 基础上扩展大量专属语法，是文档美化核心，进阶必备。
### 1.1 代码块增强功能
1. **代码行高亮**
```md
```js{2,4-6}
const name = "VitePress" // 不高亮
const age = 2 // 高亮第2行
function run() {
  console.log(name) // 高亮4-6行
  return age
}
```
```
2. **代码块显示行号**
全局开启（config.js）：
```js
export default defineConfig({
  markdown: {
    lineNumbers: true
  }
})
```
单块单独开启：
````md
```ts line-numbers
let a = 1
```
````
3. **代码分组切换（多语言示例）**
```md
::: code-group
```npm
npm install -D vitepress
```
```pnpm
pnpm add -D vitepress
```
```yarn
yarn add -D vitepress
```
:::
```

### 1.2 内置容器提示块（Tip/Warn/Danger/Info）
四种样式区分不同提示场景，文档高频使用
```md
::: info ℹ️ 信息提示
基础篇的目录路径必须全部放在docs根目录，否则路由失效
:::

::: tip 💡 小技巧
修改config.js无需重启dev服务，热更新实时生效
:::

::: warning ⚠️ 注意
打包后的dist文件夹不能直接修改，改动需改源文件重新build
:::

::: danger ❌ 危险操作
不要把node_modules、dist提交到Git仓库，体积巨大
:::
```

### 1.3 页面内锚点、目录抽取
1. 页面侧边自动生成TOC目录（可控制显示层级）
全局配置：
```js
themeConfig: {
  outline: [2,3] // 只展示h2、h3标题目录
}
```
单页关闭目录：在md顶部frontmatter添加
```md
---
outline: false
---
```
2. 自定义页面标题、侧边栏显示名称
```md
---
title: 自定义页面标题
sidebar_label: 进阶Markdown语法
---
```

### 1.4 Frontmatter 完整进阶参数
所有md文件顶部`--- ---`之间为页面配置，进阶常用参数汇总
```md
---
# 页面标题
title: 进阶篇Frontmatter
# 侧边栏展示文字
sidebar_label: Frontmatter详解
# 侧边栏隐藏当前页面
sidebar: false
# 是否显示页面目录
outline: 2
# 页面是否为草稿（打包忽略）
draft: false
# 页面访问权限（高级篇拓展）
# meta标签SEO优化
meta:
  - name: keywords
    content: VitePress,前端文档,静态站点
  - name: description
    content: VitePress进阶Frontmatter配置教程
---
```

## 第2章 导航与侧边栏高阶配置 🧭
基础篇仅演示简单数组写法，进阶支持分组折叠、自动目录、多侧边栏、外部链接区分。
### 2.1 顶部导航高阶用法
1. 下拉菜单分组导航
```js
nav: [
  { text: "教程", link: "/guide/" },
  {
    text: "资源",
    items: [
      { text: "Github仓库", link: "https://github.com", target: "_blank" },
      { text: "基础篇", link: "/base/" },
      { text: "进阶篇", link: "/advance/" }
    ]
  }
]
```
- `target:"_blank"`：新标签页打开外部链接
2. 导航栏深色/浅色切换开关（内置无需额外插件）
```js
themeConfig: {
  darkMode: true // 默认开启明暗切换
}
```

### 2.2 侧边栏高级配置
1. 可折叠分组侧边栏
```js
sidebar: [
  {
    text: "Markdown进阶",
    collapsible: true, // 支持折叠
    collapsed: false, // 默认展开
    items: [
      { text: "代码块增强", link: "/advance/code" },
      { text: "提示容器", link: "/advance/container" }
    ]
  },
  {
    text: "站点配置",
    collapsible: true,
    items: [
      { text: "导航配置", link: "/advance/nav" }
    ]
  }
]
```
2. 多页面独立侧边栏（不同目录显示不同侧边）
使用`multiSidebar`，根据路由匹配对应侧边栏
```js
sidebar: {
  "/base/": [
    { text: 基础入门, items: [...] }
  ],
  "/advance/": [
    { text: 进阶功能, items: [...] }
  ]
}
```

### 2.3 页脚自定义增强
基础篇仅简单copyright，进阶支持多列文本、链接分组
```js
footer: {
  message: "基于VitePress搭建开源文档站",
  copyright: "© 2026 All Rights Reserved",
  columns: [
    {
      title: "文档",
      links: [
        { text: "基础篇", link: "/base/" },
        { text: "进阶篇", link: "/advance/" }
      ]
    },
    {
      title: "社区",
      links: [
        { text: "GitHub", link: "https://github.com", target: "_blank" }
      ]
    }
  ]
}
```

## 第3章 全文搜索功能配置 🔍
VitePress内置本地离线搜索，无需后端，开箱即用，进阶文档必备。
### 3.1 基础本地搜索配置
```js
import { defineConfig } from 'vitepress'

export default defineConfig({
  themeConfig: {
    search: {
      provider: 'local', // 离线本地搜索
      options: {
        // 忽略搜索的页面路径
        exclude: ['/about/'],
        // 搜索展示结果数量
        limit: 10
      }
    }
  }
})
```
### 3.2 搜索进阶优化
1. 控制页面是否参与索引
在md文件frontmatter添加：
```md
---
search: false # 当前页面不加入搜索索引
---
```
2. 中文分词优化
内置`local`搜索对中文支持良好，无需额外插件；如需更强中文检索，高级篇讲解Algolia云端搜索。

## 第4章 静态资源与路由规范 📂
### 4.1 静态资源存放规则
- 全局图片/字体/图标：新建`docs/public/`文件夹，内部资源直接`/图片名.png`引用
  例：`![封面图](/cover.png)`
- 页面同级图片：和md文件同目录，使用相对路径`./logo.png`
> ⚠️ 禁止在.vitepress、node_modules存放静态资源，打包会丢失

### 4.2 路由自动生成规则（进阶重点）
VitePress 基于文件系统自动生成路由，无需手动配置路由表：
| 文件路径 | 访问路由 |
|--------|--------|
| docs/index.md | `/` 首页 |
| docs/advance/index.md | `/advance/` |
| docs/advance/search.md | `/advance/search.html` |
补充规则：
1. 文件夹下存在`index.md`，访问文件夹路径自动渲染该文件
2. 文件名空格、中文会自动转义，推荐全英文文件名
3. 隐藏页面：文件名加下划线`_draft.md`，不会生成路由

### 4.3 自定义站点基础路径（部署子目录必备）
如果网站部署在域名子路径，例如`https://xxx.github.io/docs/`，配置`base`：
```js
export default defineConfig({
  base: "/docs/" // 末尾必须带斜杠
})
```

## 第5章 页面交互：Markdown 嵌入 Vue 组件 🧩
VitePress 核心特性：MD中直接使用Vue3语法、自定义组件，进阶拓展页面交互。
### 5.1 行内Vue表达式
```md
当前年份：{{ new Date().getFullYear() }}
```
### 5.2 全局公共组件
1. 创建全局组件目录 `docs/.vitepress/components/Hello.vue`
```vue
<template>
  <div class="demo-box">
    <h3>自定义Vue组件 🎉</h3>
    <p>{{ msg }}</p>
  </div>
</template>
<script setup>
const msg = "VitePress进阶组件演示";
</script>
<style scoped>
.demo-box {
  padding: 12px;
  background: #f5f5f5;
  border-radius: 6px;
}
</style>
```
2. 全局自动注册（无需手动导入）
只要放在`.vitepress/components`下，所有md页面可直接使用：
```md
<Hello />
```
### 5.3 局部导入组件（单页面专用）
```md
<script setup>
import Demo from './Demo.vue'
</script>

<Demo />
```

## 第6章 全局样式自定义微调 🎨
进阶修改主题基础配色、全局字体、页面间距，无需重写完整主题。
### 6.1 新建全局样式文件
创建 `docs/.vitepress/theme/style.css`
```css
/* 主色调修改 */
:root {
  --vp-c-brand: #1890ff;
  --vp-c-brand-light: #40a9ff;
}
/* 全局字体 */
:root {
  --vp-font-family-base: "Microsoft YaHei", system-ui;
}
/* 代码块背景 */
.vp-code {
  background: #f6f8fa;
}
```
### 6.2 引入样式文件
新建 `docs/.vitepress/theme/index.js`
```js
import './style.css'
export default {}
```
重启dev服务，全局样式生效。

## 第7章 多语言国际化 i18n 🌐
适合需要中英文双语文档的项目，进阶标准功能。
### 7.1 目录结构规范
```
docs/
├── en/
│   ├── index.md
│   └── guide/
├── zh/
│   ├── index.md
│   └── guide/
└── .vitepress/config.js
```
### 7.2 多语言配置
```js
export default defineConfig({
  locales: {
    '/zh/': {
      label: '简体中文',
      lang: 'zh-CN',
      title: 'VitePress教程',
      description: 'VitePress进阶使用指南'
    },
    '/en/': {
      label: 'English',
      lang: 'en-US',
      title: 'VitePress Guide',
      description: 'VitePress advanced tutorial'
    }
  }
})
```
配置完成后导航栏自动出现语言切换下拉框。

## 第8章 打包优化与本地预览 📦
### 8.1 打包忽略无用文件
在项目根目录新建`.gitignore`，过滤不需要参与打包、提交的文件
```
node_modules
dist
.DS_Store
*.log
```
### 8.2 构建缓存提速
Vite自带缓存，存放于`node_modules/.vite`，多次打包速度大幅提升；
打包异常时可删除缓存重新执行`npm run build`。
### 8.3 预览打包产物
```bash
npm run build
npm run preview
```
preview会启动静态服务器，模拟线上环境，检查资源路径、图片、链接是否404，提前修复部署问题。

## 第9章 进阶篇核心知识点总结 🎯
完成本篇学习，你将掌握全部日常开发所需进阶能力：
1. 熟练使用VitePress扩展Markdown语法：代码高亮、分组、提示容器、页面目录控制
2. 导航、侧边栏高阶配置：下拉菜单、折叠分组、多页面独立侧边栏、多列页脚
3. 开启并配置离线全文搜索，控制页面索引范围
4. 掌握静态资源存放、文件路由规则、子目录部署base路径配置
5. 在Markdown中嵌入Vue组件，实现交互式页面
6. 自定义全局主题配色、字体、页面样式
7. 搭建多语言双语文档网站
8. 优化打包流程，提前预览线上静态文件

---
进阶篇到此结束🎉
下一部分为**高级篇**，内容包含：自定义完整主题开发、插件开发、Algolia云端搜索、GitPages/Gitee Pages自动化部署、Vite底层配置扩展、页面数据加载、SSR预渲染、项目工程化脚本等深度内容，需要我继续讲解高级篇吗？