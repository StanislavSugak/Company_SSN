import React, { useEffect, useNavigate } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { teamleadRoutes, employeeRoutes, commonRoutes, basicRoutes } from "../../routes";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Authorization from "../../pages/Authorization/Authorization";
import Project from "../../pages/Project/Project";
import Employee from "../../pages/Employee/Employee";
import Shaping from "../../pages/Shaping/Shaping";
import Analitic from "../../pages/Analitic/Analitic";
import Workspace from "../../pages/Workspace/Workspace";

const AppRouter = () => {
    const auth = useSelector((state) => state.auth.isAuth);
    const role = useSelector((state) => state.auth.user.role);

    console.log('Авторизирован')
    console.log(auth)

    const dispatch = useDispatch();

    return (
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
    );
};

export default AppRouter;
