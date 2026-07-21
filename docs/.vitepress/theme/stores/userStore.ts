import { defineStore } from 'pinia'

interface UserInfo {
    id: number
    username: string
    avatar: string
}

export const useUserStore = defineStore('user', {
    state: () => ({
        token: localStorage.getItem('token') || '',
        userInfo: null as UserInfo | null
    }),
    actions: {
        // 登录成功存储token和用户信息
        login(token: string, userInfo: UserInfo) {
            this.token = token
            this.userInfo = userInfo
            localStorage.setItem('token', token)
            if (userInfo) {
                localStorage.setItem('userInfo', JSON.stringify(userInfo))
            }
        },
        // 退出登录：清空本地存储
        logout() {
            this.token = ''
            this.userInfo = null
            localStorage.removeItem('token')
            localStorage.removeItem('userInfo')
        },
        // 页面刷新恢复用户信息
        restoreUser() {
            const userStr = localStorage.getItem('userInfo')
            if (!userStr || userStr === 'undefined') return
            try {
                this.userInfo = JSON.parse(userStr)
            } catch (err) {
                // 脏数据清除
                localStorage.removeItem('userInfo')
                this.userInfo = null
            }
        }
    }
})