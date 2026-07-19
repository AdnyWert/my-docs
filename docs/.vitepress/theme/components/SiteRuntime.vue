<template>
  <div class="runtime-text flex flex-wrap items-center justify-center gap-2 my-3 text-gray-500 dark:text-gray-400">
    <el-icon color="#6366f1"><Clock /></el-icon>
    <span>网站已经坚持度过了：</span>
    <span class="text-indigo-600 dark:text-indigo-400 font-medium">
      {{ time.years }}年 {{ time.days }}天 {{ time.hours }}时 {{ time.minutes }}分 {{ time.seconds }}秒
    </span>
    <!-- 没有 实心爱心 HeartFilled / 空心 HeartOutline 二选一 -->
    <el-icon color="#ef4444"><Moon/></el-icon>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
// 修正图标导出名称
import { Clock, Moon } from '@element-plus/icons-vue'

import { calcSiteRunTime } from '../utils/siteTime'

// 建站初始日期：你的建站时间 2026-07-17
const START_DATE = '2026-07-17 00:00:00'
const time = ref(calcSiteRunTime(START_DATE))
let timer = null

// 每秒更新计时
onMounted(() => {
  timer = setInterval(() => {
    time.value = calcSiteRunTime(START_DATE)
  }, 1000)
})

// 页面销毁清除定时器，防止内存泄漏
onUnmounted(() => {
  clearInterval(timer)
})
</script>