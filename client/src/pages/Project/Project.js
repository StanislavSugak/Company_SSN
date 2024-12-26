import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Project.scss";
import { getProjects } from "../../store/slices/projectSlice";
import {Loading, ProjectCard, HeaderProject, Modal} from '../../utils/components'
import {CreateIcon, IconDone, IconFuture, IconNow, Search} from '../../utils/icon'
import {ButtonField, ButtonBack, LineNone, Input, BlockPagination, TextMain, SelectStack } from '../../components/ModalElement/ModalElement'
import { openModal, backModal, getResultModal, setName, setDescription } from '../../store/slices/modalSlice';

//--------------------------head project
const hp = {
    h1: "Task schedule",
    h2: "Daily operation"
}


//--------------------------icon filter
const statusPorject=[
    { image: IconDone, value: 'completed' },
    { image: IconNow, value: 'inProgress' },
    { image: IconFuture, value: 'notStarted' }
]


//--------------------------dontent_in_header
const content_search = (
    <div className="header_project_search">
        <img src={Search} alt="fail" />
        <p className="text_mln_f20_l20">Search...</p>
    </div>
);


//--------------------------modal
const content_modal = (
    <>
        <Input input="Name..."/>
        <Input input="Description..."/>
        <LineNone />
        <ButtonField textb={"Discard"} textn={"Next"} />
    </>
);

const Project = () => {
    const dispatch = useDispatch();

    const { projects, isLoading } = useSelector((state) => state.project);
    const role = useSelector((state) => state.auth.user.role);
    const { modal } = useSelector((state) => state.modal);
    const { name, description } = useSelector((state) => state.modal.createTack);

    const [currentFilter, setCurrentFilter] = useState('inProgress'); // Изначально показываем проекты в процессе
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(getProjects({ id_user: 1, role: role }));
            setLoading(false);
        }, 10000); // Задержка 100 мс

        // Очистка таймера при размонтировании компонента
        return () => clearTimeout(timer);
    }, [dispatch]);


    const handleFilterChange = (filter) => {
        setCurrentFilter(filter);
    };

    const filteredProjects = () => {
        switch (currentFilter) {
            case 'completed': return projects.completed;
            case 'notStarted': return projects.notStarted;
            case 'inProgress': return projects.inProgress;
        }
    };
    
    const info = [
        { name: "Successful task", count: projects.completed?.length || 0 },
        { name: "Available tasks", count: projects.notStarted?.length || 0 },
        { name: "Running tasks", count: projects.inProgress?.length || 0 }
    ];

    // const modal_create = (
    //     <>
    //         <BlockPagination component={TextMain} data={data}/>
    //         <ButtonBack text={"Back"} />
    //     </>
    // );

    const handleNameChange = (value) => {
        dispatch(setName(value)); // Обновляем имя в Redux
    };
    
    const handleDescriptionChange = (value) => {
        dispatch(setDescription(value)); // Обновляем описание в Redux
    };

    const openProjectModal = (type) => {
        let content, content1, content2;

        content = (
            <>
                <Input placeholder="Name..." value={name} onChange={handleNameChange} />
                <Input placeholder="Description..." value={description} onChange={handleDescriptionChange} />
                <LineNone />
                <ButtonField  textb={"Discard"} textn={"Next"} onBack={() => dispatch(backModal())}  onNext={() => dispatch(openModal({ content: content1, title: "Create Project" }))} 
                />
            </>
        );
        
        content1 = (
            <>
                <SelectStack />
                <ButtonField textb={"Back"} textn={"Next"} onBack={() => dispatch(backModal())} onNext={() => dispatch(openModal( {content: content2, title: type}))} />
            </>
        );

        content2 = (
            <>
                {/* select start date*/}
                <LineNone />
                <ButtonField textb={"Back"} textn={"Create"} onBack={() => dispatch(backModal())} onNext={() => dispatch(getResultModal())} />
            </>
        )


        dispatch(openModal({ content, title: type }));
    };

    return (
        <>
            {loading || isLoading ? (
                <Loading />
            ) : (
                <>
                    {modal.isOpen && <Modal closeModal={() => dispatch(backModal())} main_text={modal.title} component={modal.content} />}
                    <HeaderProject content_search={content_search} hp={hp} statusPorject={statusPorject} info={info} onFilterChange={handleFilterChange}/>
                    <div className="cards">
                        {filteredProjects().map((project) => (
                            <ProjectCard key={project.project_id} project={project} status={currentFilter}/>
                        ))} 
                        <div className="create_card">
                            <button className="create_task_plus">
                                <img src={CreateIcon} alt="fail" />
                            </button>
                            <button className="create_task_button" onClick={() => openProjectModal('Create task')}>
                                <p className="text_mln_f20_l20">Create task</p>
                            </button>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Project;

