# Python 语言

## Python 基础知识
<div class="card-grid">
  <div class="category-card">
    <div class="card-title">Python 核心编程</div>
    <div class="card-desc">Python 编程的核心知识点。</div>
  </div>
  <div class="category-card">
    <div class="card-title">Python 高级开发</div>
    <div class="card-desc">内置函数、内置模块、网络编程、并发编程、装饰器、迭代器、生成器、魔法函数，都是进阶内容。</div>
  </div>
  <div class="category-card">
    <div class="card-title">Python 开发桌面程序</div>
    <div class="card-desc">tkinter 非常方便，兼容性也不错，而且是 Python 自带，用来写小工具非常合适。</div>
  </div>
  <div class="category-card">
    <div class="card-title">Python 自动化办公</div>
    <div class="card-desc">Python 非常适合编写小脚本提高办公的效率。</div>
  </div>
</div>

## Python Web 开发
<div class="card-grid">
  <div class="category-card">
    <div class="card-title">网站开发 - 前端基础</div>
    <div class="card-desc">快速入门 Python web 前端开发。</div>
  </div>
  <div class="category-card">
    <div class="card-title">网站开发 - flask 框架</div>
    <div class="card-desc">flask 是一个非常易于学习的框架，适合一步步深入的学习，最终搭建复杂的应用。</div>
  </div>
  <div class="category-card">
    <div class="card-title">网站开发 - 后台管理系统</div>
    <div class="card-desc">flask + layui 快速搭建后台管理系统</div>
  </div>
  <div class="category-card">
    <div class="card-title">网站开发 - 正心论坛</div>
    <div class="card-desc">利用 flask 框架知识，结合业务知识，完成正心论坛的项目实战。</div>
  </div>
</div>

## Python 数据科学
<div class="card-grid">
  <div class="category-card">
    <div class="card-title">Python - 数据分析</div>
    <div class="card-desc">通往数据科学的第一步</div>
  </div>
  <div class="category-card">
    <div class="card-title">Python - 机器学习</div>
    <div class="card-desc">深度挖掘数据的价值</div>
  </div>
</div>

<style>
/* 分类大标题样式 */
.section-main-title {
  font-size: 28px;
  font-weight: 600;
  margin: 40px 0 12px;
  color: #222;
}
.section-sub-title {
  font-size: 22px;
  font-weight: 500;
  margin: 32px 0 16px;
  color: #333;
}

/* 卡片网格容器，自动自适应列数 */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 20px;
  margin-bottom: 24px;
}

/* 卡片基础样式 */
.category-card {
  padding: 28px 24px;
  border-radius: 12px;
  background-color: #f7f7f8;
  transition: all 0.24s ease;
  cursor: pointer;
  border: 1px solid transparent;
}
/* 悬浮蓝色半透美化 */
.category-card:hover {
  background-color: rgba(41, 118, 227, 0.12);
  border-color: rgba(41, 118, 227, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(41, 118, 227, 0.08);
}

/* 卡片标题文字 */
.card-title {
  font-size: 18px;
  font-weight: 500;
  color: #1e293b;
  margin-bottom: 10px;
}
/* 卡片描述小字 */
.card-desc {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
}

/* ========== 深色模式适配 ========== */
:root.dark .section-main-title {
  color: #eee;
}
:root.dark .section-sub-title {
  color: #ddd;
}
:root.dark .category-card {
  background-color: #242428;
}
:root.dark .category-card:hover {
  background-color: rgba(70, 145, 245, 0.18);
  border-color: rgba(70, 145, 245, 0.25);
}
:root.dark .card-title {
  color: #e8e8ed;
}
:root.dark .card-desc {
  color: #a0a0b0;
}
</style>