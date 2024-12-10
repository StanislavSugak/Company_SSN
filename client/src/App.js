import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter/AppRouter";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import './styles/_body.scss'
import { checkAuth } from "./store/slices/authSlice";

const App = () => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.auth.isLoading);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(checkAuth()).finally(() => {
                setIsInitialized(true);
            });
        } else {
            setIsInitialized(true); // Если токена нет, сразу инициализируем приложение
        }
    }, [dispatch]);

    return (
        <BrowserRouter>
            <Header />
            {isInitialized ? (
                <AppRouter />
            ) : (
                <div>Loading...</div> // Индикатор загрузки между Header и Footer
            )}
            <Footer />
        </BrowserRouter>
    );
};

export default App;