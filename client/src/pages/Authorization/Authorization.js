import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./Authorization.scss";
import Login from "../../assets/icons/login.svg";
import Password from "../../assets/icons/password.svg";
import { login } from "../../store/slices/authSlice"; 
//форм компонент
//lbd yb;ybq

const Authorization = () => {
    const dispatch = useDispatch(); //для отправки , селектор чтобы извлеьч state = state.auth.isAuth
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        dispatch(login({ email, password })); // Отправляем данные в Redux

    };

    return (
        <main>
            <p className="text_mnt_f60_l60">SSN</p>
            <p className="text_mln_f36_l36">Entrance to the system</p>
            <form action="">
                <input onChange={e => setEmail(e.target.value)} value={email} type="text" placeholder="Login" />
                <img src={Login} alt="Login" />
            </form>
            <form action="">
                <input onChange={e => setPassword(e.target.value)} value={password} type="password" placeholder="Password" />
                <img src={Password} alt="Password" />
            </form>
            <div className="check">
                <input type="checkbox"/>
                <p className="text_mln_f22_l22">Non-disclosure agreement</p>
            </div>
            <button type="button" onClick={handleLogin}>
                <p className="text_mln_f26_l26">Authorisation</p>
            </button>
            <div className="restore_item">
                <div className="restore">
                    <p className="text_mln_f22_l22">Restore login</p>
                    <div></div>
                </div>
                <div className="restore">
                    <p className="text_mln_f22_l22">Restore password</p>
                    <div></div>
                </div>
            </div>
        </main>
    );
};

export default Authorization;
