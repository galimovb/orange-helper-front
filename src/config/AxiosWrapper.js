import axios from "axios";
import {BASE_API_URL} from "@/config/apiConfig";

export default class AxiosWrapper {
    static axiosInstance = axios.create({
        baseURL: BASE_API_URL,
        withCredentials: true
    });

    static router = null;

    static initialize(routerInstance) {
        this.router = routerInstance;

        this.axiosInstance.interceptors.response.use(
            response => response,
            error => {
                // Проверяем, является ли текущий маршрут защищённым
                const requiresAuth = this.router.currentRoute.value.meta.requiresAuth;

                if (error.response?.status === 401 && requiresAuth) {
                    localStorage.removeItem('auth_token');

                    document.cookie.split(";").forEach((c) => {
                        document.cookie = c
                            .replace(/^ +/, "")
                            .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
                    });
                    if (this.router) {
                        this.router.push({ name: 'login' }); // редирект на роут с именем 'login'
                    } else {
                        window.location.href = '/login';
                    }
                }
                return Promise.reject(error);
            }
        );
    }


    static get(url, config = {}) {
        return this.axiosInstance.get(url, {
            ...config,
            withCredentials: true
        });
    }

    static post(url, data, config = {}) {
        return this.axiosInstance.post(url, data, {
            ...config,
            withCredentials: true
        });
    }

    static put(url, data) {
        return this.axiosInstance.put(url, data);
    }

    static delete(url) {
        return this.axiosInstance.delete(url);
    }
}
