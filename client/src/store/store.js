import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import authReducer from './slices/authSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        auth: authReducer
    },
    devTools: process.env.NODE_ENV !== 'production'
});

export default store;