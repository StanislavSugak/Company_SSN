import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        // здесь могут быть и другие редьюсеры
    },
});

export default store;