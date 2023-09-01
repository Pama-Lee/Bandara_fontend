import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {LoginService} from "@/services/user/user";
import router from '@/router';

// 用户状态
export enum UserStatus {
    // 未登录
    UNLOGIN = 0,
    // 已登录
    LOGINED = 1,
}

// 用户信息
export interface UserInfo {
    // 用户名
    username: string
    // 用户状态
    status: UserStatus
    // token
    token: string
    loading: boolean
}

export const useUserStore = defineStore('user',{
    state: (): UserInfo => ({
        username: '',
        status: UserStatus.UNLOGIN,
        token: '',
        loading: false
    }),
    actions: {
        // 登录
        login(token: string) {
            this.loading = true
            LoginService({token: token}).then((res) => {
                if (res.code === 1) {
                    this.username = res.data.name
                    this.status = UserStatus.LOGINED
                    if (res.data.name == "" || res.data.name == null) {
                        localStorage.setItem('needInfo', 'true')
                    }
                    this.loading = false
                } else {
                    this.loading = false
                    localStorage.removeItem('_token')
                    localStorage.removeItem('username')

                    router.push("/login")
                }
            }).catch(err => {
                console.log(err)
            })
        },
        // 退出登录
        logout() {
            this.username = ''
            this.token = ''
            this.status = UserStatus.UNLOGIN
            if (window.localStorage) {
                window.localStorage.removeItem('username')
                window.localStorage.removeItem('_token')
            }
        },
        async getLoginStatus() {
            if (this.loading) {
                // 等待登录结果
                return new Promise((resolve, reject) => {
                    const timer = setInterval(() => {
                        if (!this.loading) {
                            clearInterval(timer)
                            resolve(this.status)
                        }
                    }, 100)
                })
            } else {
                return this.status
            }
        }
    }
})