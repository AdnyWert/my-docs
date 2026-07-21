import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { getApiBaseUrl } from './envHelper'
import { useUserStore } from '../stores/userStore'
import { ElMessage } from 'element-plus'

// 创建axios实例
const service = axios.create({
    baseURL: getApiBaseUrl(),
    timeout: 10000, // 10秒超时
    headers: {
        'Content-Type': 'application/json'
    }
})

// ========== 请求拦截器：自动注入Authorization token ==========
service.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        const userStore = useUserStore()
        const token = userStore.token
        // 存在token则自动添加鉴权头
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (err) => Promise.reject(err)
)

// ========== 响应拦截器：统一处理后端返回 + 全局异常 ==========
service.interceptors.response.use(
    (response: AxiosResponse) => {
        const res = response.data
        // 1. 业务成功 code=20000 直接返回data
        if (res.code === 20000) {
            return res.data
        }

        // 2. 未登录 / token过期 40001
        if (res.code === 40001) {
            const userStore = useUserStore()
            userStore.logout() // 清空本地登录状态
            ElMessage.error('登录已过期，请重新登录')
            return Promise.reject(res)
        }

        // 3. 权限不足 40002
        if (res.code === 40002) {
            ElMessage.warning('当前账号无操作权限')
            return Promise.reject(res)
        }

        // 4. 其他业务错误（参数错误、业务失败）
        ElMessage.error(res.msg || '操作失败')
        return Promise.reject(res)
    },
    // 网络异常捕获：超时、断网、跨域、502、404
    (networkErr) => {
        if (!networkErr.response) {
            // 后端无法连接：断网/服务未启动
            ElMessage.error('无法连接后端服务，请检查网络或服务状态')
        } else {
            // HTTP状态码异常 500/404
            ElMessage.error(`服务异常，错误码：${networkErr.response.status}`)
        }
        return Promise.reject(networkErr)
    }
)

// 统一导出请求方法
export function request<T>(config: AxiosRequestConfig): Promise<T> {
    return service(config)
}

// 封装常用请求简写
export const http = {
    get: <T>(url: string, params?: any) => request<T>({ method: 'GET', url, params }),
    post: <T>(url: string, data?: any) => request<T>({ method: 'POST', url, data }),
    put: <T>(url: string, data?: any) => request<T>({ method: 'PUT', url, data }),
    delete: <T>(url: string, params?: any) => request<T>({ method: 'DELETE', url, params })
}