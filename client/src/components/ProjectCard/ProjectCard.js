import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import "./ProjectCard.scss";
import { LastProject, NowProject, FutureProject } from '../../utils/images';
import { ProjectMain, ProjectSetting, ProjectHome } from '../../utils/icon';
import { ButtonSectionCard, Modal } from '../../utils/components';
import { ButtonField, ButtonBack, LineNone, EmployeeTeam, BlockPagination, TextMain } from '../../components/ModalElement/ModalElement';
import { openModal, backModal } from '../../store/slices/modalSlice';

const images = [ProjectMain, ProjectSetting, ProjectHome];

const ProjectCard = ({ project, status }) => {
    const [section, setSection] = useState(0);
    const role = useSelector((state) => state.auth.user.role);
    const dispatch = useDispatch();
    const { modal } = useSelector((state) => state.modal);

    const handleClick = (index) => {
        setSection(index);
    };

    const openProjectModal = (type) => {
        let content;

        if (type === 'Technology') {
            content = (
                <>
                    <BlockPagination component={TextMain} data={project.stacks ? project.stacks.map(stack => ({
                        direction: stack.direction_name,
                        stack: stack.stack_name
                    })) : []} />
                    <ButtonBack text={"Back"} onClose={() => dispatch(backModal())} />
                </>
            );
        } else if (type === 'Team') {
            content = (
                <>
                    <EmployeeTeam surName={`${project.project_teamlead_name} ${project.project_teamlead_surname}`} direction={'Teamlead'} />
                    <LineNone />
                    <BlockPagination component={EmployeeTeam} data={project.users ? project.users.map(user => ({
                        surName: `${user.user_name} ${user.user_surname}`,
                        direction: user.user_direction
                    })) : []} />
                    <ButtonBack text={"Back"} onClose={() => dispatch(backModal())} />
                </>
            );
        }

        dispatch(openModal({ content, title: type }));
    };

    let content =
        section === 0 ? (
            <div className="main">
                <p className="text_mln_f26_l26">{project.project_name}</p>
                <p className="text_mln_f20_l24">{project.project_description}</p>
            </div>
        ) : section === 1 ? (
            <div className="setting">
                <p className="text_mln_f26_l26">Technology</p>
                <div className="technology">
                    {project.stacks && project.stacks.length > 0 ? (
                        project.stacks.slice(0, 4).map((stack) => (
                            <div key={stack.stack_id} className="stack">
                                <div className="dot_stack"></div>
                                <p className="text_mln_f20_l20">{stack.stack_name}</p>
                            </div>
                        ))
                    ) : (
                        <p className="technology_none text_mln_f14_l14">There is no information at the moment</p>
                    )}
                </div>
                <button className="more" onClick={() => openProjectModal('Technology')}>
                    <p className="text_mln_f16_l16">More</p>
                </button>
            </div>
        ) : (
            <div className="home">
                <p className="text_mln_f26_l26">Team</p>
                <div className="teamlead">
                    <div className="image_teamlead"></div>
                    <div className="teamlead_text">
                        <p className="text_mln_f20_l20">{project.project_teamlead_name} {project.project_teamlead_surname}</p>
                        <p className="text_mln_f14_l14">Teamlead</p>
                    </div>
                </div>
                <div className="teamlead_line"></div>
                <button className="home_team" onClick={() => openProjectModal('Team')}>
                    <p className="text_mln_f14_l14">show all team</p>
                </button>
                {role !== 'teamlead' ? (
                    <button className="participate">
                        <p className="text_mln_f16_l16">Participate</p>
                    </button>
                ) : (
                    <div className="participate"></div>
                )}
            </div>
        );

    return (
        <>
            {modal.isOpen && <Modal closeModal={() => dispatch(backModal())} main_text={modal.title} component={modal.content} />}
            <div className="card">
                <img src={status === 'completed' ? LastProject : status === 'notStarted' ? FutureProject : NowProject} alt="image_project" />
                <>{content}</>
                <div className="section">
                    {images.map((image, index) => (
                        <ButtonSectionCard key={index} image={image} active={section === index} onClick={() => handleClick(index)} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default ProjectCard;