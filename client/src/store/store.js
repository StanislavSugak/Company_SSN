import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import authReducer from './slices/authSlice';
import projectReducer from './slices/projectSlice';
import settingReducer from './slices/settingSlice';
import technologyReducer from './slices/technologySlice'
import modalReducer from './slices/modalSlice'

const store = configureStore({
    reducer: {
        user: userReducer,
        auth: authReducer,
        project: projectReducer,
        setting: settingReducer,
        technology: technologyReducer,
        modal: modalReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export default store;