<template>
  <div class="clock-container">
    <div class="date-text">{{ dateStr }}</div>

    <div class="flip-wrap">
      <!-- 时 -->
      <div class="flip-card">
        <div class="flip-panel">
          <div class="flip-top">
            <span class="num-text">{{ hourStr }}</span>
          </div>
          <div class="flip-bottom">
            <span class="num-text">{{ hourStr }}</span>
          </div>
        </div>
      </div>

      <span class="split">:</span>

      <!-- 分 -->
      <div class="flip-card">
        <div class="flip-panel">
          <div class="flip-top">
            <span class="num-text">{{ minuteStr }}</span>
          </div>
          <div class="flip-bottom">
            <span class="num-text">{{ minuteStr }}</span>
          </div>
        </div>
      </div>

      <span class="split">:</span>

      <!-- 秒 -->
      <div class="flip-card">
        <div class="flip-panel" :class="{ flip: flipAnim }">
          <div class="flip-top">
            <span class="num-text">{{ secondStr }}</span>
          </div>
          <div class="flip-bottom">
            <span class="num-text">{{ secondStr }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'

const now = ref(new Date())
const flipAnim = ref(false)
let timer = null

const dateStr = computed(() => {
  const d = now.value
  const weekList = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const week = weekList[d.getDay()]
  return `${year}-${month}-${day} ${week}`
})

const hourStr = computed(() => String(now.value.getHours()).padStart(2, '0'))
const minuteStr = computed(() => String(now.value.getMinutes()).padStart(2, '0'))
const secondStr = computed(() => String(now.value.getSeconds()).padStart(2, '0'))

const updateTime = () => {
  now.value = new Date()
}

watch(secondStr, () => {
  flipAnim.value = true
  setTimeout(() => {
    flipAnim.value = false
  }, 600)
})

onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style scoped>
:root {
  --clock-bg: #f7e1ef;
  --clock-card: #f2c6e0;
  --clock-card-deeper: #e8a8c8;
  --clock-text: #d14d88;
  --clock-split: #d14d88;
  --clock-date: #c8689c;
}

:global(.dark) {
  --clock-bg: #2e1c28;
  --clock-card: #3d2836;
  --clock-card-deeper: #4a3340;
  --clock-text: #f8d8e8;
  --clock-split: #f8d8e8;
  --clock-date: #f0b8d2;
}

.clock-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 18px 24px;
  background: var(--clock-bg);
  border-radius: 16px;
  margin: 2rem 0;
}

.date-text {
  font-size: 16px;
  color: var(--clock-date);
  font-weight: 500;
  letter-spacing: 1px;
}

.flip-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
}

.flip-card {
  width: 52px;
  height: 64px;
  background: var(--clock-card);
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.4), 0 4px 10px rgba(0, 0, 0, 0.08);
}

.flip-panel {
  width: 100%;
  height: 100%;
  position: relative;
  perspective: 180px;
}

.flip-top,
.flip-bottom {
  width: 100%;
  height: 50%;
  overflow: hidden;
  position: relative;
  background: var(--clock-card);
}

.flip-top {
  border-bottom: 1px solid rgba(255, 255, 255, 0.35);
}

.flip-bottom {
  background: linear-gradient(
    to bottom,
    var(--clock-card),
    var(--clock-card-deeper)
  );
}

.num-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 24px;
  font-weight: 800;
  color: var(--clock-text);
  line-height: 1;
}

.flip-top .num-text {
  bottom: 0;
  transform: translateX(-50%) translateY(50%);
}

.flip-bottom .num-text {
  top: 0;
  transform: translateX(-50%) translateY(-50%);
}

.split {
  font-size: 24px;
  color: var(--clock-split);
  font-weight: 800;
  margin-bottom: 4px;
}

/* 翻页动作 */
.flip-panel.flip .flip-top {
  transform-origin: center bottom;
  animation: flipTop 0.6s ease-in forwards;
}

.flip-panel.flip .flip-bottom {
  transform-origin: center top;
  animation: flipBottom 0.6s ease-out forwards;
}

@keyframes flipTop {
  0% {
    transform: rotateX(0deg);
  }
  100% {
    transform: rotateX(-90deg);
  }
}

@keyframes flipBottom {
  0% {
    transform: rotateX(90deg);
  }
  100% {
    transform: rotateX(0deg);
  }
}
</style>