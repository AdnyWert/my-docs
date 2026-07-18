<template>
  <div class="promote-banner">
    <div class="banner-item" v-for="(item, index) in list" :key="index">
      <span class="banner-text">{{ item.text }}</span>
      <a class="banner-link" :href="item.link" target="_blank">{{ item.linkText }} ></a>
    </div>
  </div>
</template>

<script setup>
// 可外部传入宣传列表，也可直接写死默认内容
const props = defineProps({
  list: {
    type: Array,
    default: () => [
      {
        text: "想要高效学习？想入门编程行业？想做出自己的产品？",
        linkText: "点击咨询",
        link: "https://example.com/consult"
      },
      {
        text: "想要做东西，但是不想学习编程？",
        linkText: "寻求帮助",
        link: "https://example.com/help"
      }
    ]
  }
})
</script>

<style>
/* 明暗主题变量 */
:root {
  --banner-bg: #f5f5f7;
  --banner-text-color: #333333;
  --banner-link-color: #4078f2;
  --banner-link-hover: #265ed7;
}
:global(.dark) {
  --banner-bg: #2a2a32;
  --banner-text-color: #e5e5e8;
  --banner-link-color: #73a7ff;
  --banner-link-hover: #94bdff;
}

.promote-banner {
  width: 100%;
  background: var(--banner-bg);
  border-radius: 16px;
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.banner-item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 1.2rem;
  flex-wrap: wrap;
  text-align: center;
}

.banner-text {
  color: var(--banner-text-color);
}

.banner-link {
  color: var(--banner-link-color);
  text-decoration: none;
  transition: color 0.24s ease;
}
.banner-link:hover {
  color: var(--banner-link-hover);
  text-decoration: underline;
}

/* 移动端自适应缩小字号 */
@media screen and (max-width: 768px) {
  .banner-item {
    font-size: 1.3rem;
  }
  .promote-banner {
    padding: 20px 16px;
    gap: 20px;
  }
}
</style>