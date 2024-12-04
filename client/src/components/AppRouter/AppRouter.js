import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { employeeRoutes, teamleadRoutes } from '../../routes';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'; // Импортируйте ваш компонент
import Authorization from '../../pages/Authorization/Authorization';

const AppRouter = () => {
    const user = useSelector((state) => state.auth);
    
    return (
        <Routes>
            {/* Используем ProtectedRoute для защищённых маршрутов teamlead */}
            {user.isAuth && teamleadRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<ProtectedRoute element={<Component />} />} 
                />
            ))}

            {/* Используем ProtectedRoute для защищённых маршрутов employee, если требуется */}
            {user.isAuth && employeeRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<ProtectedRoute element={<Component />} />} 
                />
            ))}

            {/* Если не авторизованы, перенаправляем на страницу логина */}
            <Route path="/login" element={<Authorization />} />

            {/* Перенаправление на главную страницу или другую страницу по умолчанию */}
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
};

export default AppRouter;