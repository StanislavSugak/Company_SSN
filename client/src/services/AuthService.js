import $api from "../http/index";

export default class AuthService {
    static async login(email, password) {
        const response = await $api.post("user/login", { email, password });
//обработать ошибки
        const authResponse = {
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
            user: {
                id: response.data.user.id,
                email: response.data.user.email,
                role: response.data.user.role,
                id_direction: response.data.user.id_direction,
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
