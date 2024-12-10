import React from "react";
import './ButtonSectionCard.scss';

const ButtonSectionCard = ({ image, active, onClick }) => {
   return(
    <div className={`button_card ${active ? 'active' : ''}`} onClick={onClick}>
            <img src={image} alt="f" />
        </div>
   )
}

export default ButtonSectionCard;