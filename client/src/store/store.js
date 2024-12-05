import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import authReducer from './slices/authSlice';
import settingReducer from './slices/settingSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        auth: authReducer,
        setting: settingReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export default store;