<template>
  <el-dialog v-model="visible" title="用户登录" width="400px">
    <el-form ref="loginFormRef" :model="form" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="form.username" placeholder="输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password" placeholder="输入密码"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="handleLogin">登录</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { loginApi } from '../api/userApi'
import { useUserStore } from '../stores/userStore'

const visible = ref(false)
const loginFormRef = ref(null)
const form = ref({
  username: '',
  password: ''
})
const userStore = useUserStore()

// 直接导入消息提示，不依赖全局proxy
import { ElMessage } from 'element-plus'

// 登录逻辑
const handleLogin = async () => {
  try {
    // res 就是 {id,username,avatar,token}
    const res = await loginApi(form.value.username, form.value.password)
    // 第二个参数传完整用户对象，包含avatar
    userStore.login(res.token, res)
    visible.value = false
    ElMessage.success('登录成功')
  } catch (err) {
     ElMessage.error('登录失败')
  }
}

// 对外暴露打开弹窗方法
defineExpose({ visible })
</script>