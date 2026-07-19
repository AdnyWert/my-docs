---
layout: doc
title: VitePress 自定义页面.md
author: LuminKi
date: 2026-07-19 09:26:10
lastUpdate: 2026-07-19 09:26:10
tags:
  - 开发文档
  - 教程
description: 纵有千种风情，更与何人说。
path: docs/guide/writting/VitePress 自定义页面.md
---

# VitePress 自定义页面

## tailwindcss
Tailwind v4

1、**安装依赖**

```bash
npm install -D tailwindcss @tailwindcss/vite
```

2、修改 `.vitepress/config.js` 引入 Vite 插件

```js
import { defineConfig } from 'vitepress'
import tailwind from '@tailwindcss/vite'

export default defineConfig({
  vite: {
    plugins: [tailwind()]
  }
})
```

3、新增 `custom.css`

```css
@import "tailwindcss";
```

4、引入到 `.vitepress/theme/index.js`

```js
import './custom.css'
```

5、使用案例

写一个诗歌的卡片**PoemCard.md**

::: details PoemCard.md 代码

<<< ./parts/PoemCard.md

:::

**输出**

<!--@include: ./parts/PoemCard.md-->

## 集成Element-Plus

**安装依赖**

```bash
# 安装 element-plus
npm install element-plus
# 图标（可选）
npm install @element-plus/icons-vue
# 自动导入所需插件（可选，推荐，不用手动逐个import组件）
npm install -D unplugin-vue-components unplugin-auto-import
```

在`.vitepress/theme/index.ts`中导入使用

```ts
// 补充缺失导入
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import ElementPlus from 'element-plus'  // [!code ++]
// 全局引入Element Plus完整样式
import 'element-plus/dist/index.css'  // [!code ++]

const Theme = DefaultTheme

export default {
  extends: Theme,
  Layout: () => {
    // 保留VitePress默认布局插槽
    return h(Theme.Layout, null, {
      // 你可以在这里自定义插槽：hero、doc-before、footer等
    })
  },
  enhanceApp({ app, router, siteData }) {
    // 全局挂载ElementPlus，全局所有md页面、自定义组件均可直接使用el-xxx组件
    app.use(ElementPlus)  // [!code ++]
  }
}
```

### 首页显示登录头像





