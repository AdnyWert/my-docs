<template>
  <div class="clock-wrapper">
    <div class="header">
      <span class="emoji">⏰</span>
      <span class="title">翻页时钟</span>
      <span class="emoji">📅</span>
    </div>

    <div class="date-line">
      <span class="date-emoji">🌸</span>
      <span>{{ dateStr }}</span>
      <span class="date-emoji">🌸</span>
    </div>

    <div class="flip-clock">
      <!-- 时 -->
      <DigitCard
        v-for="(digit, idx) in hourDigits"
        :key="'h' + idx"
        :current="digit"
        :prev="prevHourDigits[idx]"
      />
      <span class="colon">:</span>

      <!-- 分 -->
      <DigitCard
        v-for="(digit, idx) in minuteDigits"
        :key="'m' + idx"
        :current="digit"
        :prev="prevMinuteDigits[idx]"
      />
      <span class="colon">:</span>

      <!-- 秒 -->
      <DigitCard
        v-for="(digit, idx) in secondDigits"
        :key="'s' + idx"
        :current="digit"
        :prev="prevSecondDigits[idx]"
      />
    </div>

    <div class="footer">
      <span class="footer-emoji">💖</span>
      <span>每一秒都是新的开始</span>
      <span class="footer-emoji">✨</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import DigitCard from './DigitCard.vue'

const now = ref(new Date())
const prevNow = ref(new Date())
let timer = null

const weekList = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六']

const dateStr = computed(() => {
  const d = now.value
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day} ${weekList[d.getDay()]}`
})

const hourStr = computed(() => String(now.value.getHours()).padStart(2, '0'))
const minuteStr = computed(() => String(now.value.getMinutes()).padStart(2, '0'))
const secondStr = computed(() => String(now.value.getSeconds()).padStart(2, '0'))

const prevHourStr = computed(() => String(prevNow.value.getHours()).padStart(2, '0'))
const prevMinuteStr = computed(() => String(prevNow.value.getMinutes()).padStart(2, '0'))
const prevSecondStr = computed(() => String(prevNow.value.getSeconds()).padStart(2, '0'))

const hourDigits = computed(() => hourStr.value.split(''))
const minuteDigits = computed(() => minuteStr.value.split(''))
const secondDigits = computed(() => secondStr.value.split(''))

const prevHourDigits = computed(() => prevHourStr.value.split(''))
const prevMinuteDigits = computed(() => prevMinuteStr.value.split(''))
const prevSecondDigits = computed(() => prevSecondStr.value.split(''))

const updateTime = () => {
  prevNow.value = new Date(now.value)
  now.value = new Date()
}

onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style scoped>
.clock-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  padding: 24px 28px;
  background: linear-gradient(135deg, #fff0f5 0%, #ffe4ec 50%, #ffd6e7 100%);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(209, 77, 136, 0.15),
              inset 0 1px 0 rgba(255, 255, 255, 0.6);
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
  min-width: 320px;
}

.header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 700;
  color: #c44d82;
}

.emoji { font-size: 22px; }

.date-line {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #b85a8a;
  font-weight: 500;
  letter-spacing: 1px;
  background: rgba(255, 255, 255, 0.5);
  padding: 6px 14px;
  border-radius: 20px;
}

.date-emoji { font-size: 14px; }

.flip-clock {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.35);
  padding: 14px 18px;
  border-radius: 16px;
  backdrop-filter: blur(4px);
}

.colon {
  font-size: 24px;
  font-weight: 800;
  color: #c2185b;
  margin: 0 2px;
  align-self: center;
  opacity: 0.8;
}

.footer {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #c44d82;
  opacity: 0.7;
  font-weight: 500;
}

.footer-emoji { font-size: 14px; }
</style>