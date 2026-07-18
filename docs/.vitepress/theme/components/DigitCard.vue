<template>
  <div class="digit-card" :class="{ flipping: isFlipping }">
    <!-- 静态底层：上下两半 -->
    <div class="card-inner">
      <div class="half top-half">
        <span class="num top-num">{{ current }}</span>
      </div>
      <div class="gap"></div>
      <div class="half bottom-half">
        <span class="num bottom-num">{{ current }}</span>
      </div>
    </div>

    <!-- 翻页动画层 -->
    <div class="flip-layer">
      <div class="flipper top-flipper">
        <span class="num top-num">{{ prev }}</span>
      </div>
      <div class="flipper bottom-flipper">
        <span class="num bottom-num">{{ current }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch, ref } from 'vue'

const props = defineProps(['current', 'prev'])
const isFlipping = ref(false)

watch(() => props.current, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    isFlipping.value = true
    setTimeout(() => {
      isFlipping.value = false
    }, 600)
  }
})
</script>

<style scoped>
.digit-card {
  width: 34px;
  height: 42px;
  position: relative;
  perspective: 200px;
}

.card-inner {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(209, 77, 136, 0.12);
}

.half {
  width: 100%;
  height: 20px;
  position: relative;
  overflow: hidden;
}

.top-half {
  border-radius: 6px 6px 0 0;
  background: linear-gradient(to bottom, #fce4ec, #f8bbd0);
}

.bottom-half {
  border-radius: 0 0 6px 6px;
  background: linear-gradient(to bottom, #f8bbd0, #f48fb1);
}

.gap {
  height: 2px;
  background: transparent;
  flex-shrink: 0;
}

.num {
  position: absolute;
  left: 50%;
  font-size: 24px;
  font-weight: 800;
  color: #c2185b;
  line-height: 40px;
  font-family: 'SF Mono', 'Courier New', monospace;
}

.top-num {
  bottom: 0;
  transform: translateX(-50%) translateY(50%);
}

.bottom-num {
  top: 0;
  transform: translateX(-50%) translateY(-50%);
}

/* ========== 翻页动画层 ========== */
.flip-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.flipper {
  position: absolute;
  left: 0;
  width: 100%;
  height: 20px;
  overflow: hidden;
  backface-visibility: hidden;
  transform-style: preserve-3d;
}

.top-flipper {
  top: 0;
  background: linear-gradient(to bottom, #fce4ec, #f8bbd0);
  border-radius: 6px 6px 0 0;
  transform-origin: center bottom;
  z-index: 2;
}

.bottom-flipper {
  bottom: 0;
  background: linear-gradient(to bottom, #f8bbd0, #f48fb1);
  border-radius: 0 0 6px 6px;
  transform-origin: center top;
  transform: rotateX(90deg);
  z-index: 1;
}

/* 翻页动画 */
.digit-card.flipping .top-flipper {
  animation: flipTopDown 0.55s ease-in forwards;
}

.digit-card.flipping .bottom-flipper {
  animation: flipBottomUp 0.55s ease-out 0.05s forwards;
}

@keyframes flipTopDown {
  0%   { transform: rotateX(0deg); }
  100% { transform: rotateX(-90deg); }
}

@keyframes flipBottomUp {
  0%   { transform: rotateX(90deg); }
  100% { transform: rotateX(0deg); }
}
</style>