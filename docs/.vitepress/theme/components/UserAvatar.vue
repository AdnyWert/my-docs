<template>
  <div class="user-avatar-wrap ml-3">
    <!-- Element Plus 悬浮下拉组件 -->
    <el-dropdown trigger="hover" popper-class="avatar-dropdown-popper">
      <!-- 头像触发器 -->
      <div class="avatar-box w-9 h-9 rounded-full overflow-hidden border-2 border-transparent hover:border-indigo-400 transition-all">
        <img
          v-if="isLogin"
          :src="avatarUrl"
          alt="用户头像"
          class="w-full h-full object-cover"
        />
        <div v-else class="w-full h-full flex items-center justify-center text-xl bg-gray-100  text-gray-500 dark:text-gray-300">
          👤
        </div>
      </div>

      <!-- 下拉菜单 -->
      <template #dropdown>
        <el-dropdown-menu>
          <!-- 未登录：仅登录 -->
          <!-- <el-dropdown-item v-if="!isLogin" @click="$router.push('/login')"> -->
          <el-dropdown-item v-if="!isLogin" @click="handleSimLogin">
            登录
          </el-dropdown-item>
          <!-- 已登录：账号设置 + 退出 -->
          <template v-else>
            <el-dropdown-item @click="$router.push('/account')">账号设置</el-dropdown-item>
            <el-dropdown-item divided @click="handleLogout">退出登录</el-dropdown-item>
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
// const avatarUrl = ref('https://picsum.photos/id/64/100/100')
const avatarUrl = ref('https://picsum.photos/200/300')
// const avatarUrl = ref('static/image/apple.svg')

// 登录状态持久化
const isLogin = ref(false)

// 页面加载读取本地登录标识
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

// 退出登录逻辑
const handleLogout = () => {
  localStorage.removeItem('user_token')
  localStorage.removeItem('user_info')
  isLogin.value = false
  // router.push('/')
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

<!-- 全局样式：修复下拉框主题、宽度、对齐、黑色背景问题 -->
<style>
/* 自定义下拉弹窗样式，跟随VitePress明暗主题 */
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
:root .avatar-dropdown-popper .el-dropdown-menu__divider {
  background-color: #e5e7eb;
}

/* 暗黑模式自动适配（VitePress html.dark 标识） */
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
html.dark .avatar-dropdown-popper .el-dropdown-menu__divider {
  background-color: #475569;
}
</style>