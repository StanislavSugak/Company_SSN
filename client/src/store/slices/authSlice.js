import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../../services/AuthService';
import { API_URL } from '../../http';
import axios from 'axios'

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

export const checkAuth = createAsyncThunk('auth/refresh', async () =>{
    const response = await axios.get(`${API_URL}/user/refresh`, {withCredentials: true})
    localStorage.setItem('token', response.accessToken);
    return response; 
});

const authSlice = createSlice({
    name: 'auth', 
    initialState: {
        user: {
            id: '',
            role: '',
        }, // Начальное состояние пользователя
        isAuth: false,
        isLoading: false,
    },
    reducers: {
        setAuth(state, action) {
            state.isAuth = action.payload;
            localStorage.setItem('isAuth', action.payload);
        },
        setUser(state, action) {
            state.user = action.payload;
        },
        setLoading(state, action){
            state.isLoading = action.payload;
        }
    },
    extraReducers: (builder) => {  //для асинхронных действий
        builder
            .addCase(login.fulfilled, (state, action) => {    //pending (ожидание) fulfilled (выполнено) rejected (отклонено)
                state.isAuth = true;
                state.user = action.payload.user; // Сохраняем пользователя
            })
            .addCase(logout.fulfilled, (state) => {
                state.isAuth = false;
                state.user = { id: '', role: '' }; // Сбрасываем пользователя
            })
            .addCase(checkAuth.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isAuth = true;
                state.user = action.payload.user; // Сохраняем пользователя
                state.isLoading = false;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.isLoading = false;
            });
    },
});

export const { setAuth, setUser } = authSlice.actions;

export default authSlice.reducer;