import React, { useState } from 'react';
import "./ModalElement.scss";
import QuestionInput from '../../assets/icons/question_input.svg'

const Line = () => { 
    return (
        <div className='modal_line'></div>
    );
};

const LineNone = () => { 
    return (
        <div className='modal_line_none'></div>
    );
};

const ButtonBack = ({text}) => { // Принимаем closeModal как пропс
    return (
        <button className="button_back">
            <p className="text_mln_f16_l16">{text}</p>
        </button>
    );
};

const ButtonNext = ({text}) => { // Принимаем closeModal как пропс
    return (
        <button className="button_next">
            <p className="text_mln_f16_l16">{text}</p>
        </button>
    );
};

const ButtonField = ({textb, textn}) => {
    return(
        <div className="button_field">
            <ButtonBack text={textb}/>
            <ButtonNext text={textn}/>
        </div>
    );
};

const TextMain = ({direction, stack}) => { 
    return (
        <div className="text_main">
            <p className="text_mln_f20_l20">{direction}</p> 
            <p className="text_mln_f14_l14">{stack}</p>
        </div>
    );
};

//image
const EmployeeTeam = ({surName, direction}) => {
    return(
        <div className="employee_team">
            <span className='employee_team_image'></span>
            <TextMain direction={surName} stack={direction}/>
        </div>
    );
}

const Input = ({input}) => { 
    return (
        <form className="form_data">
            <input type="text" placeholder={input}/>
            <img src={QuestionInput} alt="q"></img>
        </form>
    );
};

const BlockPagination = ({ component: Component, data}) => {
    const maxItemsToShow = 3;
    const [currentPage, setCurrentPage] = useState(0);

    const totalPages = Math.ceil(data.length / maxItemsToShow);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const currentData = data.slice(currentPage * maxItemsToShow, (currentPage + 1) * maxItemsToShow);

    return (
        <>
            <div className='component_container'>
                {currentData.map((item, index) => ( <Component key={index} {...item} /> ))}
            </div>
            <Line />
            {totalPages > 1 && (
                <div className="pagination_dots">
                    {[...Array(totalPages)].map((_, index) => (
                        <div key={index} className={`dot ${currentPage === index ? 'active' : ''}`} onClick={() => handlePageChange(index)} ></div>
                    ))}
                </div>
            )}
        </>
    );
};


const Paggination = () => { 
    return (
        <></>
    );
};

export {Line, LineNone, ButtonBack, ButtonNext, ButtonField, TextMain, EmployeeTeam, BlockPagination, Input, Paggination};
