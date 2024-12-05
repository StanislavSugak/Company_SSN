import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import './Aside.scss'
import { employeeRoutes, teamleadRoutes, basicRoutes } from '../../routes';
import { setBurgerOpen } from "../../store/slices/settingSlice";

const Aside = () => {
    const dispatch = useDispatch();
    const role = useSelector((state) => state.auth.user.role);
    const routes = role == "teamlead" ? [ ...employeeRoutes, ...teamleadRoutes,] : [...employeeRoutes];

    const isBurgerOpen = useSelector((state) => state.setting.isBurgerOpen)

    useEffect(() => {
        const handleResize = () => {
            const isWideScreen = window.innerWidth > 1025;

            if (isWideScreen) {
                // Если ширина больше 1025px, открываем меню, если оно закрыто
                if (!isBurgerOpen) {
                    console.log('Opening menu due to window resize');
                    dispatch(setBurgerOpen(true)); // Открываем меню
                }
            } else {
                // Если ширина меньше 1025px, не закрываем меню
                // Оставляем состояние как есть
                console.log('Menu state remains unchanged');
            }
        };

        handleResize(); // Проверяем при первом рендере

        // Добавляем обработчик события изменения размера
        window.addEventListener('resize', handleResize);

        // Убираем обработчик при размонтировании компонента
        return () => {
            window.removeEventListener('resize', handleResize); // Удаляем обработчик
        };
    }, [isBurgerOpen, dispatch]);

    return(
        <aside className={`${isBurgerOpen ? 'open' : 'closed'}`}>
            <ul>
                {routes.map(({ path, name, image }) => (
                    <li key={path}>
                        <img src={image} alt={name}/>
                        <NavLink to={path}>{name}</NavLink>
                    </li>
                ))}
            </ul>
            <ul>
                {basicRoutes.map(({ path, name, image }) => (
                    <li key={path}>
                        <img src={image} alt={name}/>
                        <NavLink to={path}>{name}</NavLink>
                    </li>
                ))}
            </ul>
        </aside>
    )
}

export default Aside;