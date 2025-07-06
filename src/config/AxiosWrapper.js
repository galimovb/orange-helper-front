import axios from "axios";

export default class AxiosWrapper {
    static axiosInstance = axios.create({
        baseURL: '', // потом задашь
        withCredentials: true
    });

    static router = null;

    static initialize(routerInstance) {
        this.router = routerInstance;

        this.axiosInstance.interceptors.response.use(
            response => response,
            error => {
                if (error.response?.status === 401) {
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
