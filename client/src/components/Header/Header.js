import React from "react";
import "./Header.scss";
import Profile from "../../assets/icons/profile.svg";
import Search from "../../assets/icons/search.svg";
import More from "../../assets/icons/more.svg";
//мап каритнки
const Header = () => {
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
                <div className="burder_menu">
                    <span></span>
                    <span></span>
                    <span></span>   
                </div>
            </div>
        </header>
    );
};

export default Header;
