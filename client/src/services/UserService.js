import $api from '../http/index';

class UserService {
    static async fetchUser() {
        try {
            const response = await $api.get('/users');
            return response.data; // Возвращаем данные пользователей
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error; // Обработка ошибок
        }
    }
}

export default UserService;