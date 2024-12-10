import React from "react";
import { useLocation } from "react-router-dom";
import './Main.scss';
import Aside from '../../components/Aside/Aside';

const Main = ({ children }) => {
    const location = useLocation(); // Получаем текущий путь
    return (
        <main>
            <div className="children">
                {children}
            </div>
            {location.pathname !== '/login' && <Aside />}
        </main>
    );
}

export default Main;