import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import "./ModalElement.scss";
import {QuestionInput, SelectArrow, Delete} from '../../utils/icon'
import { getDirections, getStacks } from '../../store/slices/technologySlice';
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

const ButtonBack = ({text, onClose}) => { // Принимаем closeModal как пропс
    return (
        <button className="button_back" onClick={onClose}>
            <p className="text_mln_f16_l16">{text}</p>
        </button>
    );
};

const ButtonNext = ({text, onNext}) => { // Принимаем closeModal как пропс
    return (
        <button className="button_next" onClick={onNext}>
            <p className="text_mln_f16_l16">{text}</p>
        </button>
    );
};

const ButtonField = ({ textb, textn, onBack, onNext }) => {
    return (
        <div className="button_field">
            <ButtonBack text={textb} onClose={onBack} />
            <ButtonNext text={textn} onNext={onNext} />
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

const Input = ({ placeholder, value, onChange }) => {
    const handleChange = (e) => {
        if (onChange) {
            onChange(e.target.value); 
        }
    };

    return (
        <form className="form_data">
            <input type="text" placeholder={placeholder} value={value} onChange={handleChange} />
            <img src={QuestionInput} alt="Help" />
        </form>
    );
};

const BlockPagination = ({ component: Component, data, onRemove}) => {
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
                {currentData.length != 0 ? currentData.map((item, index) => ( <Component key={index} {...item} 
                   {...(onRemove && { onRemove: () => onRemove(currentPage * maxItemsToShow + index) })}  />
                ))
                :
                (<p className="text_mln_f14_l14">There is no information at the moment</p>)}
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

const BlockStack = ({direction, stack, onRemove}) => {

    return(
        <div className='block_stack'>
            <TextMain direction={direction} stack={stack} />
            <span>
                <input type="text" defaultValue={0} maxLength={1} className='input_block'/>
                <img src={Delete} alt="d" onClick={onRemove}/>
            </span>
        </div>
    )
}

const CustomSelect = ({ isOpen, toggle, value, options, onSelect }) => {
    return (
        <div className='select_ds'>
            <div className="custom_select" onClick={toggle}>
                <div className="selected_option">
                    <img src={SelectArrow} alt="Стрелка" className="arrow" />
                    <p className="text_mln_f16_l16">{value || 'Select'}</p>
                </div>
            </div>
            {isOpen && (
                <ul className="options_list">
                    {options.map((option) => (
                        <li key={option.direction || option.name} onClick={() => onSelect(option.id, option.direction || option.name)}>
                            {option.direction || option.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

const SelectStack = () => { 
    const dispatch = useDispatch();
    const direction = useSelector((state) => state.technology.direction);
    const stack = useSelector((state) => state.technology.stack);

    useEffect(() => {
        dispatch(getDirections());
    }, [dispatch]);    

    const [valueDirection, setDirectionSelect] = useState(null); 
    const [valueStack, setStackSelect] = useState(null); 
    const [isDirectionOpen, setIsDirectionOpen] = useState(false);
    const [isStackOpen, setIsStackOpen] = useState(false);
    const [data, setData] = useState([]);

    const selectDirection = (id_direction, direction) => {
        setDirectionSelect(direction); 
        setStackSelect(null); 

        if (id_direction) {
            dispatch(getStacks(id_direction));
        }

        setIsDirectionOpen(false);
    };

    const selectStack = (id_stack, stack) => {
        setStackSelect(stack); 

        setData((prevData) => [
            ...prevData,
            { direction: valueDirection, stack } // Сохраняем выбранное направление и стек
        ]);

        setDirectionSelect(null);
        setStackSelect(null);

        setIsStackOpen(false);
    };

    const toggleDirection = () => {
        setIsDirectionOpen(!isDirectionOpen);
        if (isStackOpen) {
            setIsStackOpen(false); 
        }
    };

    const toggleStack = () => {
        setIsStackOpen(!isStackOpen);
        if (isDirectionOpen) {
            setIsDirectionOpen(false); 
        }
    };

    const removeBlock = (index) => {
        setData((prevData) => prevData.filter((_, i) => i !== index)); // Удаляем элемент по индексу
    };

    return (
        <>
            <div className='select_stack'>
                <CustomSelect isOpen={isDirectionOpen} toggle={toggleDirection} value={valueDirection} options={direction} onSelect={selectDirection}/>
                <CustomSelect isOpen={isStackOpen} toggle={toggleStack} value={valueStack} options={stack} onSelect={selectStack}/>
            </div>
            <Line />

            <BlockPagination component={BlockStack} data={data} onRemove={removeBlock}/>
        </>
    );
};

export {Line, LineNone, ButtonBack, ButtonNext, ButtonField, TextMain, EmployeeTeam, BlockPagination, Input, SelectStack};
