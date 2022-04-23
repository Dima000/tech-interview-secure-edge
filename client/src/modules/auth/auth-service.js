import { api, publicApi } from "../../plugins/api";

export default class AuthService {
    static async login(email, password) {
        const data = {
            email,
            password,
        }
        const res = await publicApi.post('/login', data);
        return res.data;
    }

    static async verifyAuth() {
        await api.post('/verify');
    }
}
