import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Project.scss";
import { getProjects } from "../../store/slices/projectSlice";
import {Loading, ProjectCard, HeaderProject, Modal} from '../../utils/components'
import {CreateIcon, IconDone, IconFuture, IconNow, Search} from '../../utils/icon'
import {ButtonField, ButtonBack, LineNone, Input, BlockPagination, TextMain } from '../../components/ModalElement/ModalElement'

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

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(getProjects({ id_user: 1, role: role }));
            setLoading(false);
        }, 1000); // Задержка 100 мс

        // Очистка таймера при размонтировании компонента
        return () => clearTimeout(timer);
    }, [dispatch]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const [currentFilter, setCurrentFilter] = useState('inProgress'); // Изначально показываем проекты в процессе

    const handleFilterChange = (filter) => {
        setCurrentFilter(filter);
    };

    const filteredProjects = () => {
        switch (currentFilter) {
            case 'completed':
                return projects.completed;
            case 'notStarted':
                return projects.notStarted;
            case 'inProgress':
                return projects.inProgress;
        }
    };
    
    const info = [
        { name: "Successful task", count: projects.completed?.length || 0 },
        { name: "Available tasks", count: projects.notStarted?.length || 0 },
        { name: "Running tasks", count: projects.inProgress?.length || 0 }
    ];

    const data = [
        { direction: 'North', stack: 'Stack 1' },
        { direction: 'South', stack: 'Stack 2' },
        { direction: 'East', stack: 'Stack 3' },
        { direction: 'West', stack: 'Stack 4' }
    ];

    const modal_stack = (
        <>
            <BlockPagination component={TextMain} data={data}/>
            <ButtonBack text={"Back"} />
        </>
    );

    return (
        <>
            {loading || isLoading ? (
                <Loading />
            ) : (
                <>
                    {isModalOpen && <Modal closeModal={closeModal} main_text={"Create task"} component={modal_stack} />} {/* Передаем функцию закрытия */}
                    <HeaderProject content_search={content_search} hp={hp} statusPorject={statusPorject} info={info} onFilterChange={handleFilterChange}/>
                    <div className="cards">
                        {filteredProjects().map((project) => (
                            <ProjectCard key={project.project_id} project={project} status={currentFilter}/>
                        ))} 
                        <div className="create_card">
                            <button className="create_task_plus">
                                <img src={CreateIcon} alt="fail" />
                            </button>
                            <button className="create_task_button" onClick={openModal}>
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

