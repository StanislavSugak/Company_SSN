import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter/AppRouter";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import './styles/_body.scss'
import { checkAuth } from "./store/slices/authSlice";

const App = () => {
    const dispatch = useDispatch();

    const loading = useSelector(state => state.auth.isLoading)

    useEffect( () =>{
        if(localStorage.getItem('token')){
            dispatch(checkAuth());
        }
    }, [dispatch])

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <BrowserRouter>
            <Header />
            <AppRouter />
            <Footer />
        </BrowserRouter>
    );
};

export default App;
