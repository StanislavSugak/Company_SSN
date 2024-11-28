import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import { employeeRoutes, teamleadRoutes } from '../../routes'

const AppRouter = () => {
    const isAuth = false;

    return (
        <Routes>
            {isAuth && teamleadRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
            ))}
            {employeeRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
            ))}
            {/* Перенаправление на главную страницу или другую страницу по умолчанию */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};


export default AppRouter