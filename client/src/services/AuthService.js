import $api from "../http/index";
import {API_ENDPOINTS} from '../http/apiEndpoints'

export default class AuthService {
    static async login(email, password) {
        const response = await $api.post(API_ENDPOINTS.USER.LOGIN, { email, password });
        //обработать ошибки
        const authResponse = {
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
            user: {
                id: response.data.user.id,
                role: response.data.user.role
            },
        };
        console.log(authResponse);
        return authResponse; // Возвращаем весь объект ответа
    }
    ///////
    /* static async registration(email, password) {
        try {
            const response = await $api.post('/registration', { email, password });

            return authResponse; // Возвращаем весь объект ответа
        } catch (error) {
            console.error('Login failed:', error);
            throw error; // Обработка ошибок
        }
    } */

    static async logout() {
        try {
            return $api.post("/logout");
        } catch (error) {
            console.error("Login failed:", error);
            throw error; // Обработка ошибок
        }
    }
}
