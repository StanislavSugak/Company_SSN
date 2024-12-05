import $api from "../http/index";
import { API_ENDPOINTS } from "../http/apiEndpoints";
import BaseService from "./BaseService";

class AuthService extends BaseService {
    async login(email, password) {
        const response = await BaseService.request("post", API_ENDPOINTS.USER.LOGIN, { email, password });

        //поменять на метод
        const authResponse = {
            accessToken: response.accessToken,
            refreshToken: response.refreshToken,
            user: {
                id: response.user.id,
                role: response.user.role,
            },
        };
        
        return authResponse; // Успешный ответ
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

    async logout() {
        try {
            return $api.post("/logout");
        } catch (error) {
            console.error("Login failed:", error);
            throw error; // Обработка ошибок
        }
    }

    static createAuthResponse(data) {
        return {
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            user: {
                id: data.user.id,
                role: data.user.role,
            },
        };
    }
}

const authServiceInstance = new AuthService();

export default authServiceInstance;
