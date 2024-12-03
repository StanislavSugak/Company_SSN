import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../../services/AuthService';
import axios from 'axios'
import { API_URL } from '../../http';

//имя слайса/ действие
export const login = createAsyncThunk('auth/login', async ({ email, password }) => {
    const response = await AuthService.login(email, password);
    localStorage.setItem('token', response.accessToken);
    return response;
});
//уведовления 
export const registration = createAsyncThunk('auth/registration', async ({ email, password }) => {
    const response = await AuthService.registration(email, password);
    localStorage.setItem('token', response.accessToken);
    return response; 
});

export const logout = createAsyncThunk('auth/logout', async () => {
    await AuthService.logout();
    localStorage.removeItem('token');
});

//try catch ..в сервис .. в апп джс проверка юс эффект если есть в локал сторадж токен, тогда вызвать эту функцию
/*export const checkAuth = createAsyncThunk('auth/checkAuth', async () => {
    try {
     //   const response = await axios.get(`${API_URL}/refresh`, { withCredentials: true });
        localStorage.setItem('token', response.data.accessToken);
        return response.data; 
    } catch (error) {
        console.error('Ошибка при проверке аутентификации:', error);
        throw error; 
    }
});*/

const authSlice = createSlice({
    name: 'auth', 
    initialState: {
        user: {
            id: '',
            role: '',
        }, // Начальное состояние пользователя
        isAuth: false,
    },
    reducers: {
        setAuth(state, action) {
            state.isAuth = action.payload;
        },
        setUser(state, action) {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {  //для асинхронных действий
        builder
            .addCase(login.fulfilled, (state, action) => {    //pending (ожидание) fulfilled (выполнено) rejected (отклонено)
                state.isAuth = true;
                state.user = action.payload.user; // Сохраняем пользователя
            })
            .addCase(registration.fulfilled, (state, action) => {
                state.isAuth = true;
                state.user = action.payload.user; // Сохраняем пользователя
            })
            .addCase(logout.fulfilled, (state) => {
                state.isAuth = false;
                state.user = { id: '', role: '' }; // Сбрасываем пользователя
            })
           /* .addCase(checkAuth.fulfilled, (state) => {
                state.isAuth = false;
                state.user = { id: '', email: '', role: '', id_direction: '' }; // Сбрасываем пользователя
            });*/
    },
});

export const { setAuth, setUser } = authSlice.actions;

export default authSlice.reducer;