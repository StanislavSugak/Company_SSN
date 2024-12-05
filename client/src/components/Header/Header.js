import React from "react";
import "./Header.scss";
import Profile from "../../assets/icons/profile.svg";
import Search from "../../assets/icons/search.svg";
import More from "../../assets/icons/more.svg";
import { useDispatch, useSelector } from "react-redux";
import { setBurgerOpen } from "../../store/slices/settingSlice";

const Header = () => {

    const dispatch = useDispatch(); // Получаем доступ к dispatch

    const isBurgerOpen = useSelector((state) => state.setting.isBurgerOpen); // Получаем текущее состояние

    const handleBurgerClick = () => {
        // Отправляем действие для обновления состояния
        dispatch(setBurgerOpen(!isBurgerOpen)); // Переключаем состояние
    };

    return (
        <header>
            <div className="hello">
                <p className="text_mnt_f30_l30">SSN</p>
                <span className="line_name"></span>
                <p className="text_mln_f24_l24">Hi, person</p>
            </div>
            <div className="tool"> 
                <div className="icon">
                    <img src={Profile} alt="Person" />
                    <img src={Search} alt="Search" />
                    <img src={More} alt="More" />
                </div>
                <button className='button_deadline' /*onClick={onClick}*/>
                    <p className="text_mln_f22_l22">Deadline</p>
                </button>
                <div className="burder_menu" onClick={handleBurgerClick}>
                    <span></span>
                    <span></span>
                    <span></span>   
                </div>
            </div>
        </header>
    );
};

export default Header;
