import React from "react";
import "./Authorization.scss";
import Login from "../../assets/icons/login.svg";
import Password from "../../assets/icons/password.svg";

//форм компонент
//lbd yb;ybq

const Authorization = () => {
    return (
        <main>
            <p className="text_mnt_f60_l60">SSN</p>
            <p className="text_mln_f36_l36">Entrance to the system</p>
            <form action="">
                <input type="text" placeholder="Login" />
                <img src={Login} alt="Login" />
            </form>
            <form action="">
                <input type="password" placeholder="Password" />
                <img src={Password} alt="Password" />
            </form>
            <div className="check">
                <input type="checkbox"/>
                <p className="text_mln_f22_l22">Non-disclosure agreement</p>
            </div>
            <button>
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
