
<template>
  <div class="poem-card w-full max-w-md mx-auto rounded-2xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1
    bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
    <!-- 头部：标题+作者朝代 -->
    <div class="flex justify-between items-start mb-4">
      <h2 class="text-2xl font-bold text-rose-600 dark:text-rose-400 tracking-wide">{{ poem.title }}</h2>
      <span class="px-2 py-1 rounded text-xs font-medium bg-rose-100 dark:bg-rose-900 text-rose-700 dark:text-rose-200">
        {{ poem.dynasty }}
      </span>
    </div>
    <p class="text-slate-500 dark:text-slate-400 mb-5 text-sm">作者：{{ poem.author }}</p>

    <!-- 诗歌正文 -->
    <div class="space-y-3 py-4 border-y border-dashed border-slate-200 dark:border-slate-600">
      <p
        v-for="(line, idx) in poem.content"
        :key="idx"
        class="text-center text-lg text-slate-800 dark:text-slate-100 font-serif leading-relaxed"
      >
        {{ line }}
      </p>
    </div>

    <!-- 底部赏析标签 -->
    <div class="mt-5 flex flex-wrap gap-2">
      <span class="text-sm font-medium text-slate-600 dark:text-slate-300">标签：</span>
      <span
        v-for="tag in poem.tags"
        :key="tag"
        class="px-2 py-0.5 rounded-full text-xs bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-200"
      >
        {{ tag }}
      </span>
    </div>

    <!-- 赏析区域 -->
    <div class="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
      <h4 class="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">诗文赏析</h4>
      <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
        {{ poem.analysis }}
      </p>
    </div>
  </div>
</template>

<script setup>
// 诗歌数据，可外部传入复用
const props = defineProps({
  poem: {
    type: Object,
    required: true,
    default: () => ({
      title: "静夜思",
      dynasty: "唐",
      author: "李白",
      content: [
        "床前明月光，",
        "疑是地上霜。",
        "举头望明月，",
        "低头思故乡。"
      ],
      tags: ["思乡", "五言绝句", "月亮"],
      analysis: "诗人看见窗前月光，恍惚以为是寒霜，抬头望月时，心中涌起对家乡与亲人的思念，语言朴素直白，却流传千年。"
    })
  }
})
</script>