<template>
  <div class="num-box" :class="{ flip: flipAnim }">
    <!-- 上半部分：显示数字的上半截 -->
    <div class="num-top">
      <span class="num-text">{{ numStr }}</span>
    </div>
    <!-- 下半部分：显示数字的下半截 -->
    <div class="num-bottom">
      <span class="num-text">{{ numStr }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps(['num'])

const flipAnim = ref(false)
const numStr = computed(() => String(props.num).padStart(2, '0'))

watch(() => props.num, () => {
  flipAnim.value = true
  setTimeout(() => {
    flipAnim.value = false
  }, 500)
})
</script>

<style scoped>
.num-box {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px; /* 上下块间距 10px */
}

/* 上半块 & 下半块共用样式 */
.num-top,
.num-bottom {
  width: 100%;
  height: calc(50% - 5px); /* 各占一半，减去间距的一半 */
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fce4ec; /* 浅粉色背景 */
  border-radius: 6px;
  overflow: hidden;
  font-size: 24px;
  font-weight: 900;
  color: #d14d88;
  position: relative;
  backface-visibility: hidden;
  box-shadow: inset 0 2px 6px rgba(209, 77, 136, 0.10);
}

/* 上半块：数字底部对齐 → 显示上半截 */
.num-top {
  align-items: flex-end;
  border-radius: 6px 6px 0 0;
}

/* 下半块：数字顶部对齐 → 显示下半截 */
.num-bottom {
  align-items: flex-start;
  border-radius: 0 0 6px 6px;
}

.num-text {
  line-height: 1;
  user-select: none;
  transform: translateY(0);
}

/* ========== 翻页动画 ========== */
.num-box.flip .num-top {
  animation: flipTop 0.5s ease-in forwards;
}

.num-box.flip .num-bottom {
  animation: flipBottom 0.5s ease-out forwards;
}

/* 上半块：向上翻走（0° → -90°） */
@keyframes flipTop {
  0% {
    transform: rotateX(0deg);
    opacity: 1;
  }
  100% {
    transform: rotateX(-90deg);
    opacity: 0;
  }
}

/* 下半块：从下翻入（90° → 0°） */
@keyframes flipBottom {
  0% {
    transform: rotateX(90deg);
    opacity: 0;
  }
  100% {
    transform: rotateX(0deg);
    opacity: 1;
  }
}
</style>