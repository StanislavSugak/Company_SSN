import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './Project.scss';
import Aside from '../../components/Aside/Aside';
import { getProjects } from "../../store/slices/projectSlice";

const Project = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuth);
    const dispatch = useDispatch();
    const { projects, isLoading } = useSelector((state) => state.project); // Получаем проекты и состояние загрузки
    const [loading, setLoading] = useState(true); // Локальное состояние для управления задержкой

    useEffect(() => {
        // Вызовите метод getProjects при монтировании компонента
        dispatch(getProjects({ id_user: 1, role: "employee" }));

        // Установите задержку для отображения индикатора загрузки
        const timer = setTimeout(() => {
            setLoading(false); // Убираем индикатор загрузки через 1 секунду
        }, 1000); // Задержка в 1000 мс (1 секунда)

        // Очистка таймера при размонтировании компонента
        return () => clearTimeout(timer);
    }, [dispatch]);

    return (
        <main className="project">
            <div className="main">
                {loading || isLoading ? ( // Показываем индикатор, если идёт загрузка
                    <div>Loading...</div>
                ) : (
                    <div>
                        <h1>Projects</h1>
                        {projects.length > 0 ? (
                            <ul>
                                {projects.map((project) => (
                                    <li key={project.project_id}>
                                        <h2>{project.project_name}</h2>
                                        <p>{project.project_description}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No projects found.</p>
                        )}
                    </div>
                )}
            </div>
            <Aside />
        </main>
    );
}

export default Project;