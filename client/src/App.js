import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter/AppRouter";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Loading from "./components/Loading/Loading";
import './styles/_body.scss'
import { checkAuth } from "./store/slices/authSlice";
import Main from "./components/Main/Main";

const App = () => {
    const dispatch = useDispatch();
    
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
            <Main>
                {isInitialized ? ( <AppRouter /> ) : ( <Loading /> )}
            </Main>
            <Footer />
        </BrowserRouter>
    );
};

export default App;