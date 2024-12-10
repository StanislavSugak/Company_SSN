import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { teamleadRoutes, employeeRoutes, commonRoutes, basicRoutes } from "../../routes";
import Authorization from "../../pages/Authorization/Authorization";

const AppRouter = () => {
    const auth = useSelector((state) => state.auth.isAuth);
    const role = useSelector((state) => state.auth.user.role);

    return (
        <>
            <Routes>
                {auth ? (
                    <>
                        {/* Отображение маршрутов в зависимости от роли пользователя */}
                        {role === 'teamlead' && teamleadRoutes.map(({ path, Component }) => (
                            <Route key={path} path={path} element={<Component />} />
                        ))}
                        {employeeRoutes.map(({ path, Component }) => (
                            <Route key={path} path={path} element={<Component />} />
                        ))}
                        {commonRoutes.map(({ path, Component }) => (
                            <Route key={path} path={path} element={<Component />} />
                        ))}
                        {basicRoutes.map(({ path, Component }) => (
                            <Route key={path} path={path} element={<Component />} />
                        ))}

                        <Route path="*" element={<Navigate to="/project" />} />
                    </>
                ) : (
                    <>
                        {/* Если пользователь не авторизован, перенаправляем на страницу логина */}
                        <Route path="/login" element={<Authorization />} />
                        <Route path="*" element={<Navigate to="/login" />} />
                    </>
                )}
            </Routes>
        </>
    );
};

export default AppRouter;
