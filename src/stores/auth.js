import {defineStore} from 'pinia'
import {ref} from 'vue'
import authApi from "@/config/api/authApi"

export const useAuthStore = defineStore('auth', () => {
    const isAuthenticated = ref(false)
    const isChecked = ref(false)
    const user = ref(null)

    const check = async () => {
        try {
            const res = await authApi.authCheck();
            user.value = res.data
            isAuthenticated.value = true
        } catch (e) {
            isAuthenticated.value = false
            user.value = null
        } finally {
            isChecked.value = true
        }
    }

    const logout = () => {
        user.value = null
        isAuthenticated.value = false
        isChecked.value = false
    }

    return {
        isAuthenticated,
        isChecked,
        user,
        check,
        logout
    }
})
