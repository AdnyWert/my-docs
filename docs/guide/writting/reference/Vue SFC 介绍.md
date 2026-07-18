Vue SFC（Single-File Component，单文件组件）是 Vue.js 特有的以**.vue**为扩展名的文件格式，将**模板（HTML）、逻辑（JS/TS）和样式（CSS）**封装在单一文件中，用于构建模块化、可复用的组件 。

### 核心结构

- `<template>`：定义组件的 HTML 结构（必选，通常需有唯一根节点）
- `<script>`：编写组件逻辑（数据、方法、生命周期等，必选；支持 ES Module 导出）
- `<style>`：定义组件样式（可选；支持 `scoped` 实现局部作用域，也可使用 Sass/Less 等预处理器）

### 关键特性

- **模块化开发**：相关代码紧耦合，提升维护性与可读性
- **工程化支持**：需通过构建工具（如 Vite、Webpack + vue-loader）编译为浏览器可执行代码
- **高级能力**：支持热重载、响应式样式（Vue 3 中 via `v-bind` in CSS）、TypeScript 及预处理器集成 

该格式是 Vue 生态的标准组件写法，官方脚手架（如 Vite + Vue 模板）默认生成此类文件 。
[Vue SFC 介绍.md](Vue%20SFC%20%E4%BB%8B%E7%BB%8D.md)