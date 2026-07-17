# VitePress 使用指南 · 基础篇（教科书精讲版）

**适用人群**：零基础新手、文档建站初学者、个人博客/项目文档搭建者

**学习目标**：掌握 VitePress 核心基础能力，独立搭建、配置、运行、部署一套完整的静态文档网站

**前置知识**：基础命令行操作、简单 Markdown 语法

**篇章说明**：本文为**基础篇**，专注零基础入门与核心基础用法；进阶路由、主题定制、插件开发、自动化部署等内容将在后续进阶篇、高级篇讲解✅

---

# 第1章 认识 VitePress 📚

## 1\.1 什么是 VitePress？

VitePress 是一款**基于 Vite \+ Vue3** 驱动的轻量级静态文档生成工具，专门用于搭建项目文档、个人知识库、技术博客、教程网站等场景。

由 Vue 官方团队维护，主打**极速启动、轻量化、高性能、简洁美观**，完美适配前端技术文档开发需求。

## 1\.2 核心优势对比 ✨

- **极速体验**：依托 Vite 构建，热更新秒级响应，对比传统 VuePress 速度提升数倍

- **轻量化**：架构简洁、依赖更少，打包产物体积小，加载速度快

- **Vue 原生支持**：Markdown 中可直接使用 Vue3 语法、组件，扩展性极强

- **默认主题优雅**：自带适配移动端/桌面端的优质主题，无需复杂改造即可直接使用

- **开箱即用**：零复杂配置即可快速搭建标准文档网站

## 1\.3 基础篇学习大纲 📝

本章学完你将掌握：环境搭建 → 项目初始化 → 基础目录认知 → 核心配置 → 页面编写 → 本地运行 → 打包上线基础流程。

---

# 第2章 环境准备 🔧

VitePress 基于 Node\.js 运行，使用前必须完成环境安装配置。

## 2\.1 安装 Node\.js

**版本要求**：Node\.js 16\.0 及以上版本（推荐 18\+ 稳定版）

**下载地址**：[https://nodejs\.org/](https://nodejs.org/)

安装完成后，打开终端（CMD/终端/Git Bash），输入以下命令验证是否安装成功：

```Plain Text
node -v
npm -v
```

输出版本号即代表环境配置成功✅

## 2\.2 包管理器说明

支持 **npm / yarn / pnpm** 三种包管理器，基础篇统一使用 npm 演示，兼容性最好。

---

# 第3章 项目初始化与安装 🚀

## 3\.1 创建项目文件夹

新建空文件夹（例如 `vitepress-demo`），用于存放所有文档项目文件，进入该文件夹，打开终端。

## 3\.2 初始化项目

执行以下命令，生成 `package.json` 项目配置文件：

```Plain Text
npm init -y
```

## 3\.3 安装 VitePress 依赖

安装为项目开发依赖（局部安装，不全局安装）：

```Plain Text
npm install -D vitepress
```

## 3\.4 初次创建文档目录结构

VitePress 有固定的基础目录规范，基础篇只需掌握最简结构。手动创建如下文件夹和文件：

```Plain Text
vitepress-demo/
├── docs/                # 所有文档存放根目录（必须）
│   ├── .vitepress/     # VitePress 配置目录（必须）
│   │   └── config.js   # 核心配置文件
│   └── index.md        # 网站首页文件
└── package.json        # 项目依赖与脚本配置
```

💡 核心规则：**所有文档页面必须放在 docs 目录下**，否则无法识别渲染。

---

# 第4章 核心基础配置 ⚙️

配置文件 `docs/.vitepress/config.js` 是 VitePress 网站的核心，网站标题、描述、导航、侧边栏、logo 等基础功能均在此配置。

## 4\.1 写入基础配置代码

打开 `config.js`，写入零基础通用基础配置（可直接复制使用）：

```Plain Text
import { defineConfig } from 'vitepress'

// 基础配置导出
export default defineConfig({
  // 网站基础信息
  title: 'VitePress 基础教程',
  description: 'VitePress 零基础入门使用指南，适合新手搭建文档网站',

  // 网站头部导航栏
  themeConfig: {
    // 左上角网站logo文字
    siteTitle: 'VitePress基础指南',

    // 顶部导航菜单
    nav: [
      { text: '首页', link: '/' },
      { text: '基础教程', link: '/guide/' },
      { text: 'Github', link: 'https://github.com' }
    ],

    // 侧边栏菜单
    sidebar: [
      {
        text: '基础入门',
        items: [
          { text: '环境搭建', link: '/guide/env' },
          { text: '项目配置', link: '/guide/config' }
        ]
      }
    ],

    // 开启页脚版权信息
    footer: {
      copyright: 'Copyright © 2026 VitePress 基础教程'
    }
  }
})
```

## 4\.2 配置项详解（教科书重点）📌

- **title**：浏览器标签页标题、网站主标题

- **description**：网站简介，用于搜索引擎收录

- **siteTitle**：网站左上角展示的名称

- **nav**：顶部导航栏，text为展示文字，link为跳转路径（对应md文件路径）

- **sidebar**：左侧目录侧边栏，支持分组管理文档

---

# 第5章 编写首页与基础页面 ✍️

## 5\.1 编写网站首页（index\.md）

`docs/index.md` 是网站根首页，支持 VitePress 专属首页模板语法，写入以下内容：

```Plain Text
---
# 首页模板配置
layout: home

# 首页英雄区内容
hero:
  title: VitePress 基础教程
  subtitle: 零基础快速搭建技术文档网站
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/env
    - theme: alt
      text: 查看文档
      link: /guide/config

# 首页特性展示
features:
  - icon: ⚡️
    title: 极速构建
    details: 基于Vite驱动，秒级热更新，开发体验拉满
  - icon: 📖
    title: 简单易用
    details: 基于Markdown编写，零前端基础也能快速上手
  - icon: 🛠️
    title: 轻量化高性能
    details: 架构简洁，打包体积小，访问速度快
---
```

## 5\.2 创建教程子页面

根据上方配置的侧边栏路径，创建对应页面文件夹和文件，完善目录：

```Plain Text
docs/
├── guide/
│   ├── env.md      # 环境搭建页面
│   └── config.md   # 项目配置页面
├── .vitepress/config.js
└── index.md
```

在 `env.md` 和 `config.md` 中可自由编写 Markdown 内容，页面会自动匹配侧边栏导航。

---

# 第6章 配置启动脚本 \& 运行项目 ▶️

## 6\.1 配置 package\.json 脚本

打开项目根目录的 `package.json`，替换 `scripts` 字段内容：

```Plain Text
"scripts": {
  "dev": "vitepress dev docs",
  "build": "vitepress build docs",
  "preview": "vitepress preview docs"
}
```

脚本功能说明：

- **npm run dev**：启动本地开发服务，实时热更新（日常编写文档使用）

- **npm run build**：打包生成静态网站文件（上线部署使用）

- **npm run preview**：本地预览打包后的网站效果

## 6\.2 启动本地开发服务

终端执行启动命令：

```Plain Text
npm run dev
```

启动成功后，终端会输出访问地址（默认 `http://localhost:5173`），打开浏览器即可看到完整的文档网站✅

💡 开发特性：修改 Markdown 内容、配置文件，页面会**秒级自动刷新**，无需手动重启服务。

---

# 第7章 打包项目 \& 本地预览 📦

## 7\.1 打包静态资源

文档编写完成后，执行打包命令，生成可上线的静态网站文件：

```Plain Text
npm run build
```

打包成功后，项目会生成`docs/.vitepress/dist` 文件夹，该文件夹内的所有文件即为**最终上线资源**。

## 7\.2 本地预览打包效果

```Plain Text
npm run preview
```

可本地模拟线上访问效果，检查页面样式、链接是否正常。

---

# 第8章 基础篇核心知识点总结 🎯

通过基础篇学习，你已掌握以下核心能力：

1. 掌握 VitePress 定位、优势及运行环境要求

2. 熟练完成项目初始化、依赖安装、目录搭建

3. 读懂并编写基础网站配置（导航、侧边栏、网站信息）

4. 使用专属模板搭建精美首页，创建多级文档页面

5. 熟练使用开发、打包、预览三大核心脚本命令

6. 理解静态文档网站的基础运行、打包逻辑

**基础篇到此结束！**🎉 后续可继续学习进阶篇：主题深度定制、路由优化、Markdown 高级语法、组件引入、搜索优化等内容。

> （注：部分内容可能由 AI 生成）
