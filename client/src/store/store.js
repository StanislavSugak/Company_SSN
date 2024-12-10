import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import authReducer from './slices/authSlice';
import projectReducer from './slices/projectSlice';
import settingReducer from './slices/settingSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        auth: authReducer,
        project: projectReducer,
        setting: settingReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export default store;