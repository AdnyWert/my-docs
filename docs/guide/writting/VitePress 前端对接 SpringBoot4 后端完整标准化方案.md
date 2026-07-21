# VitePress 前端对接 SpringBoot4 后端完整标准化方案
## 目录
1. 整体架构合理性评估 & 统一后端返回格式规范（标准后端JSON结构）
2. 前端必备依赖清单（请求/持久化/权限）
3. 全局统一Axios请求封装（自动携带token、统一请求体、拦截异常、区分开发/生产后端域名）
4. 全局状态存储封装（用户登录信息持久化）
5. 全局异常统一处理（401未授权、403无权限、500服务宕机、网络超时、跨域）
6. 环境域名区分标准方案（`.env`环境文件，不硬编码地址）
7. 完整登录业务交互示例（前端组件+接口请求+状态存储+路由跳转）
8. 扩展完善优化点（权限路由、接口加密、请求防抖、请求loading）

---

# 一、后端统一返回格式标准化（修正结构缺陷，行业通用规范）
## 1. 原始结构缺陷
```js
{code: 数字, msg: '描述信息', 真实值}
```
缺陷：业务数据无固定字段名，解构、TS类型定义、统一拦截器无法通用。

## 2. 标准通用响应结构（前后端统一约定，SpringBoot全局统一返回）
```ts
// 全局统一后端返回TS类型
interface R<T> {
  code: number;       // 业务状态码
  msg: string;        // 提示信息
  data: T | null;     // 核心业务数据（统一命名data，所有业务数据放这里）
}
```
### 字段严格规范（后端Spring必须完全对齐）
| 字段 | 类型 | 含义 | 标准码约定 |
|------|------|------|------------|
| `code` | number | 业务状态码 | 200=成功；401=未登录/token过期；403=权限不足；404=接口不存在；500=服务异常 |
| `msg` | string | 操作提示文案 | 成功：操作成功；失败：账号密码错误/无权限 |
| `data` | any/null | 业务载体 | 查询列表、用户信息、token、分页数据全部存在data；无数据返回`null` |

### 正确成功示例（登录返回用户+token）
```json
{
  "code": 200,
  "msg": "登录成功",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "userId": 10001,
    "username": "guizhi",
    "avatar": "/banana.svg"
  }
}
```
### 失败示例（账号错误）
```json
{
  "code": 400,
  "msg": "用户名或密码错误",
  "data": null
}
```
### 未授权示例（token失效）
```json
{
  "code": 401,
  "msg": "登录已过期，请重新登录",
  "data": null
}
```

## 3. 该设计合理性总结 ✅
1. 行业通用，SpringBoot + Vue/Vite 生态标准规范；
2. 前端拦截器可统一判断`code===200`区分业务成功失败；
3. TS泛型完美适配任意接口返回数据，类型安全；
4. 后端全局统一`@RestControllerAdvice`即可统一封装，不用每个接口手动封装；
5. 异常、正常、空数据场景全覆盖，无歧义。

## 4. 完善补充规则
1. HTTP状态码统一返回`200`，业务逻辑全部交给`code`区分（不使用401/500 HTTP状态码，避免前端跨域、OPTIONS预检异常）；
2. 分页数据统一放在`data`内，结构：`{ records: [], total: 100, pageNum:1, pageSize:10 }`；
3. 列表无数据时`data.records=[]`，不返回`null`；

---

# 二、前端必须安装依赖（VitePress 环境）
## 1. 核心网络请求库：axios（处理http请求、拦截器）
```bash
npm add axios
```
## 2. 持久化存储（token、用户信息本地存储）
浏览器内置`localStorage`够用，无需额外库；复杂状态可搭配`pinia`（VitePress内置Vue3，支持）
```bash
npm add pinia
```
## 3. 可选工具（统一参数处理、时间、加密）
```bash
# 参数序列化、工具函数
npm add lodash
# TS类型提示（开发依赖）
npm add -D @types/lodash
```

### 完整安装命令
```bash
npm add axios pinia lodash
npm add -D @types/lodash
```

---

# 三、环境域名区分标准方案（开发本地后端/线上后端分离）
## 方案：Vite 环境变量 `.env` 文件（标准工业做法，不硬编码地址）
### 1. 新建两个环境文件，放在项目根 `docs/` 同级
#### `.env.development` 本地开发环境（pnpm docs:dev）
```env
# 本地SpringBoot后端地址
VITE_API_BASE_URL=http://127.0.0.1:8080
```
#### `.env.production` 线上打包环境（pnpm docs:build）
```env
# 线上后端域名
VITE_API_BASE_URL=shturl.cc/gPFvJUwun95pEpjH5
```
### 2. 使用规则
Vite自动根据运行命令读取对应env：
- `pnpm docs:dev` → 读取 `.env.development`
- `pnpm docs:build` → 读取 `.env.production`
### 3. 代码读取环境变量
```ts
// 任意ts文件读取后端基础地址
const baseUrl = import.meta.env.VITE_API_BASE_URL
```

### 优势
1. 切换环境无需修改代码，只改env配置；
2. CI/CD打包可替换线上地址；
3. 多人协作本地后端端口不一致，可本地`.env.local`自定义，不提交git；

---

# 四、全局Axios统一请求封装（完整可直接使用）
新建文件：`.vitepress/utils/request.ts`
功能：

1. 自动拼接后端基础域名
2. 请求拦截器：自动在请求头携带`Authorization: Bearer token`
3. 响应拦截器：统一解析后端`code`，全局捕获异常
4. 统一错误处理：401/403/网络失败/超时/服务500
5. 统一请求数据格式（post自动包裹data）

```typescript
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

// 后端基础地址（自动区分开发/生产）
const baseURL = import.meta.env.VITE_API_BASE_URL

// 创建axios实例
const service = axios.create({
  baseURL,
  timeout: 10000, // 10秒超时
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})

// ===================== 请求拦截器 =====================
service.interceptors.request.use(
  (config) => {
    // 从本地存储读取token，自动塞入请求头
    const token = localStorage.getItem('user_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (err) => Promise.reject(err)
)

// ===================== 响应拦截器（核心统一处理后端返回） =====================
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data
    // 匹配后端标准 R<T> 结构
    const { code, msg, data } = res

    // 业务成功
    if (code === 200) {
      return data
    }

    // 401 未登录 / token过期
    if (code === 401) {
      localStorage.removeItem('user_token')
      localStorage.removeItem('user_info')
      // 跳转到登录页面
      location.href = '/login'
      window.$message?.error(msg || '登录失效，请重新登录')
      return Promise.reject(res)
    }

    // 403 权限不足
    if (code === 403) {
      window.$message?.error(msg || '暂无操作权限')
      return Promise.reject(res)
    }

    // 其余业务错误（400、500等）
    window.$message?.error(msg || '操作失败')
    return Promise.reject(res)
  },
  // 网络层面异常：跨域、后端无法访问、超时、服务宕机
  (networkErr) => {
    if (!networkErr.response) {
      window.$message?.error('无法连接后端服务，请检查后端是否启动')
    } else if (networkErr.response.status === 404) {
      window.$message?.error('接口地址不存在')
    } else if (networkErr.response.status >= 500) {
      window.$message?.error('后端服务异常，请稍后重试')
    } else {
      window.$message?.error('网络请求失败')
    }
    return Promise.reject(networkErr)
  }
)

// 封装通用请求函数
export function request<T>(config: AxiosRequestConfig): Promise<T> {
  return service(config)
}

// 封装常用GET/POST简化调用
export function get<T>(url: string, params?: any) {
  return request<T>({ url, method: 'GET', params })
}

export function post<T>(url: string, data?: any) {
  return request<T>({ url, method: 'POST', data })
}

export default service
```

## 配套全局消息提示（Element Plus $message）
在`.vitepress/theme/index.ts`全局挂载，全局任意组件调用`$message`：
```ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export default {
  enhanceApp({ app }) {
    app.use(ElementPlus)
    // 全局挂载消息提示
    app.config.globalProperties.$message = ElementPlus.ElMessage
    // 图标全局注册省略...
  }
}
```

---

# 五、用户状态持久化封装（Pinia 登录状态仓库）
新建：`.vitepress/store/user.ts`
作用：统一管理登录状态、用户信息、token读写，替代零散localStorage代码

```typescript
import { defineStore } from 'pinia'

export interface UserInfo {
  token: string
  userId: number
  username: string
  avatar: string
}

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: null as UserInfo | null
  }),
  getters: {
    // 判断是否登录
    isLogin: (state) => !!state.userInfo?.token
  },
  actions: {
    // 登录保存用户信息
    setUser(info: UserInfo) {
      this.userInfo = info
      localStorage.setItem('user_token', info.token)
      localStorage.setItem('user_info', JSON.stringify(info))
    },
    // 退出登录清空
    logout() {
      this.userInfo = null
      localStorage.removeItem('user_token')
      localStorage.removeItem('user_info')
      // 跳转登录页
      location.href = '/login'
    },
    // 页面初始化从本地缓存恢复登录状态
    loadFromLocal() {
      const token = localStorage.getItem('user_token')
      const infoStr = localStorage.getItem('user_info')
      if (token && infoStr) {
        try {
          this.userInfo = JSON.parse(infoStr)
        } catch (e) {
          this.logout()
        }
      }
    }
  }
})
```

## 在入口初始化pinia
`.vitepress/theme/index.ts`
```ts
import { createPinia } from 'pinia'
const pinia = createPinia()

export default {
  enhanceApp({ app }) {
    app.use(pinia)
    // 页面加载读取本地登录缓存
    const userStore = useUserStore()
    userStore.loadFromLocal()
  }
}
```

---

# 六、完整业务示例：登录交互（登录页面组件）
接口约定：
- 后端接口地址：`POST /api/auth/login`
- 请求入参：`{username: string, password: string}`
- 返回 `R<UserInfo>`

新建登录页面组件 `login.vue`
```vue
<template>
<div class="login-box">
  <el-form ref="loginFormRef" :model="form" label-width="80px">
    <el-form-item label="用户名">
      <el-input v-model="form.username" placeholder="输入账号"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="form.password" show-password placeholder="输入密码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleLogin">登录</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue'
import { post } from '../utils/request'
import { useUserStore } from '../store/user'
import { useRouter } from 'vitepress'

const { proxy } = getCurrentInstance()
const $message = proxy.$message
const router = useRouter()
const userStore = useUserStore()

// 表单数据
const form = ref({
  username: '',
  password: ''
})

// 登录请求
const handleLogin = async () => {
  try {
    // 调用后端登录接口
    const userInfo = await post('/api/auth/login', form.value)
    // 存入全局状态+本地缓存
    userStore.setUser(userInfo)
    $message.success('登录成功')
    // 跳转到首页
    router.push('/')
  } catch (err) {
    // 错误已经在request拦截器统一弹窗，无需额外处理
  }
}
</script>
```

## 导航头像组件联动退出（复用你之前UserAvatar.vue）
```ts
import { useUserStore } from '../store/user'
const userStore = useUserStore()

// 退出方法
const handleLogout = () => {
  userStore.logout()
}
```

---

# 七、补充完善优化建议（生产环境必备）
## 1. 跨域处理
- 本地开发：Vite代理（可选，不用改后端跨域）
```ts
// .vitepress/config.mts vite配置
vite: {
  server: {
    proxy: {
      '/api': {
        target: import.meta.env.VITE_API_BASE_URL,
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '/api')
      }
    }
  }
}
```
## 2. 请求防抖/加载遮罩
在request.ts增加全局loading，频繁接口防止重复请求；
## 3. 路由权限控制
全局路由前置钩子，未登录自动拦截需要授权的页面；
## 4. token自动刷新
增加过期前刷新token接口，避免频繁跳登录；
## 5. 请求加密
生产环境用户名密码RSA加密传输，防止明文泄露；
## 6. 统一TS接口类型
所有后端接口单独建`api/`文件夹管理，分类auth、user、doc接口。

---

# 八、核心问题汇总回答
## 1. 本地后端8080、线上https域名如何区分？
标准做法：`.env.development` / `.env.production` 环境变量，axios自动读取，无需改业务代码。
## 2. 后端返回真实数据字段命名为什么是data？
行业统一规范，便于拦截器、泛型、分页、列表统一处理，无歧义。
## 3. 这套前后端交互设计合理吗？
完全合理，中小企业、开源文档后台通用标准；分层清晰：环境配置→请求拦截→状态管理→业务组件，异常全覆盖。
## 4. 无法访问后端、401未授权怎么处理？
axios响应拦截统一捕获，弹窗提示，401自动清空token跳转登录，全局只写一次逻辑，所有接口复用。
## 5. 自动携带授权字段怎么做？
请求拦截器读取localStorage的token，统一塞入`Authorization`请求头，所有接口自动携带，无需每个接口手动传。