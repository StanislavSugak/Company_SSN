import React, { useState, useEffect } from "react";
import "./Modal.scss";

const Modal = ({ closeModal, main_text, component}) => {
    useEffect(() => {
        // Добавление класса при открытии модала
        document.body.classList.add("modal-open");
        
        // Очистка при размонтировании
        return () => {
            document.body.classList.remove("modal-open");
        };
    }, []);


    return (
        <div className="modal-overlay" onClick={closeModal}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <button className="close_button" onClick={closeModal}>
                    <div></div>
                    <div></div>
                </button>
                <p className="text_mln_f26_l26">{main_text}</p>
                {component}
            </div>
        </div>
    );
};

export default Modal;
