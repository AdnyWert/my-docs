<template>
  <div class="user-avatar-wrap ml-3">
    <el-dropdown trigger="hover" popper-class="avatar-dropdown-popper">
      <!-- 头像容器 -->
      <div class="avatar-box w-9 h-9 rounded-full overflow-hidden border-2 border-transparent hover:border-indigo-400 transition-all">
        <img
          v-if="isLogin"
          :src="avatarUrl"
          alt="用户头像"
          class="w-full h-full object-cover"
        />
        <div v-else class="w-full h-full flex items-center justify-center text-xl bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-gray-300">
          👤
        </div>
      </div>

      <template #dropdown>
        <el-dropdown-menu>
          <!-- 未登录：点击登录直接模拟登录 -->
          <el-dropdown-item v-if="!isLogin" @click="handleSimLogin">
            登录
          </el-dropdown-item>
          <!-- 已登录：退出 -->
          <template v-else>
            <el-dropdown-item @click="handleSimLogout">退出登录</el-dropdown-item>
          </template>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vitepress'

const router = useRouter()
// public目录下的香蕉svg
const avatarUrl = ref('/banana.svg')
const isLogin = ref(false)

// 页面初始化读取本地登录状态
onMounted(() => {
  const token = localStorage.getItem('user_token')
  if (token) isLogin.value = true
})

// 模拟一键登录
const handleSimLogin = () => {
  // 存入标识，模拟登录成功
  localStorage.setItem('user_token', 'mock-login-token-001')
  isLogin.value = true
}

// 模拟退出登录
const handleSimLogout = () => {
  localStorage.removeItem('user_token')
  isLogin.value = false
  router.push('/')
}
</script>

<style scoped>
.user-avatar-wrap {
  display: inline-flex;
  align-items: center;
}
.avatar-box {
  flex-shrink: 0;
}
</style>

<style>
/* 下拉弹窗样式，自动适配明暗主题 */
.avatar-dropdown-popper {
  width: 110px !important;
  padding: 4px 0;
}
/* 浅色模式 */
:root .avatar-dropdown-popper .el-dropdown-menu {
  background: #ffffff;
  border: 1px solid #e5e7eb;
}
:root .avatar-dropdown-popper .el-dropdown-menu__item {
  color: #333333;
}
:root .avatar-dropdown-popper .el-dropdown-menu__item:hover {
  background-color: #f3f4f6;
}
/* 暗黑模式 */
html.dark .avatar-dropdown-popper .el-dropdown-menu {
  background: #1e293b;
  border: 1px solid #475569;
}
html.dark .avatar-dropdown-popper .el-dropdown-menu__item {
  color: #e2e8f0;
}
html.dark .avatar-dropdown-popper .el-dropdown-menu__item:hover {
  background-color: #334155;
}
</style>