<script setup>
import { ref } from 'vue'
const count = ref(0)
const increment = () => {
  count.value++
}
</script>

<template>
  <div class="counter-wrap">
    <p class="counter">Count: {{ count }}</p>
    <button class="i-click" @click="increment">Increment</button>
  </div>
</template>

<!-- Vue 中 <style scoped> 的含义是‌将样式限定在当前组件内生效，
    通过编译时注入唯一数据属性（data-v-xxxx）实现组件级样式隔离，防止全局污染和命名冲突‌。‌‌ -->
<style >
/* 外层容器，增加间距 */
.counter-wrap {
  margin: 1.5rem 0;
}

.counter {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 500;
  letter-spacing: 0.5px;
}

/* 按钮基础美化 + 明暗主题变量 */
:root {
  --btn-i-primary: #00bfa5;
  --btn-i-primary-hover: #00a892;
  --btn-i-text: #ffffff;
  --btn-i-shadow: rgba(0, 191, 165, 0.25);
}
/* 暗色适配 */
:root.dark {
  --btn-i-primary: #00d1b5;
  --btn-i-primary-hover: #00e0c1;
  --btn-i-text: #111111;
  --btn-i-shadow: rgba(0, 209, 181, 0.2);
}

button.i-click {
  padding: 0.6rem 1.4rem;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  border-radius: 8px;
  background-color: var(--btn-i-primary);
  color: var(--btn-i-text);
  font-weight: 500;
  /* 平滑过渡所有属性 */
  transition: all 0.22s ease;
  box-shadow: 0 2px 8px var(--btn-i-shadow);
}

/* 悬浮效果 */
button.i-click:hover {
  background-color: var(--btn-i-primary-hover);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px var(--btn-i-shadow);
}

/* 点击按压效果 */
button.i-click:active {
  transform: translateY(0);
  box-shadow: 0 1px 4px var(--btn-i-shadow);
}

/* 禁用状态预留（可选） */
button.i-click:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}
</style>