import envConfig from '../../config/env'

/**
 * 获取当前环境后端接口基础地址
 */
// export function getApiBaseUrl() {
//     // Vite内置环境变量
//     // @ts-ignore
//     const isDev = import.meta.env.DEV
//     return isDev ? envConfig.dev.baseUrl : envConfig.production.baseUrl
// }
export function getApiBaseUrl() {
    const isDev = import.meta.env.DEV
    // 开发使用相对路径，走vite代理；生产使用完整域名
    return isDev ? '/api' : envConfig.production.baseUrl
}