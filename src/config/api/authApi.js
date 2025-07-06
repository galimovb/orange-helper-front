import AxiosWrapper from "@/config/AxiosWrapper";

export default class AuthApi extends AxiosWrapper{
    static login(data) {
        return this.post('/login/check', data);
    }

    static register(data) {
        return this.post('/register', data);
    }

    static logout() {
        return this.get('/logout');
    }

}
