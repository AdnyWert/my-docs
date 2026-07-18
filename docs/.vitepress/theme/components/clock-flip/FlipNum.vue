<template>
  <div class="num-box" :class="{flip: flipAnim}">
    <div class="num-top">{{ numStr }}</div>
    <div class="num-bottom">{{ numStr }}</div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
const props = defineProps(['num'])
const flipAnim = ref(false)
const numStr = computed(() => String(props.num).padStart(2, '0'))

watch(() => props.num, () => {
  flipAnim.value = true
  setTimeout(() => flipAnim.value = false, 400)
})
</script>

<style scoped>
.num-box {
  width: 100%;
  height: 100%;
  position: relative;
}
.num-top, .num-bottom {
  width: 100%;
  height: 50%;
  display: grid;
  place-items: center;
  font-size: 120px;
  font-weight: 900;
  color: var(--clock-text);
  overflow: hidden;
}
.num-top {
  border-bottom: 1px solid rgba(255,255,255,0.2);
}
.num-bottom {
  transform: translateY(-1px);
}
/* 翻转动画 */
.num-box.flip .num-top {
  animation: flipTop 0.4s ease-out forwards;
}
.num-box.flip .num-bottom {
  animation: flipBottom 0.4s ease-out forwards;
}
@keyframes flipTop {
  0% { transform: rotateX(0deg); opacity: 1; }
  100% { transform: rotateX(-90deg); opacity: 0; }
}
@keyframes flipBottom {
  0% { transform: rotateX(90deg); opacity: 0; }
  100% { transform: rotateX(0deg); opacity: 1; }
}
</style>