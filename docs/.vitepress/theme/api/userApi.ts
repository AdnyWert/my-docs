import { http } from '../utils/http'

// 登录接口
export function loginApi(username: string, password: string) {
    return http.post<{ token: string; user: any }>('/user/login', {
        username,
        password
    })
}