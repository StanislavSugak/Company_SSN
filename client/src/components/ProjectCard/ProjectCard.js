import React, { useState } from "react";
import "./ProjectCard.scss";
import LastProject from "../../assets/image/last_project.svg";
import NowProject from "../../assets/image/now_project.svg";
import FutureProject from "../../assets/image/future_project.svg";
import ProjectMain from "../../assets/icons/project_main.svg";
import ProjectSetting from "../../assets/icons/project_setting.svg";
import ProjectHome from "../../assets/icons/project_home.svg";
import ButtonSectionCard from "../ButtonSectionCard/ButtonSectionCard";

const images = [ProjectMain, ProjectSetting, ProjectHome];

const ProjectCard = ({ project }) => {
    const [section, setSection] = useState(0);

    const handleClick = (index) => {
        setSection(index); // Устанавливаем активную секцию при клике
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
                    {project.stacks &&
                        project.stacks.slice(0, 4).map((stack) => (
                            <div key={stack.stack_id} className="stack">
                                <div className="dot_stack"></div>
                                <p className="text_mln_f20_l20">
                                    {stack.stack_name}
                                </p>
                            </div>
                        ))}
                </div>
                <button className="more">
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
                <button className="home_team">
                    <p className="text_mln_f14_l14">show all team</p>
                </button>
                <button className="participate">
                    <p className="text_mln_f16_l16">Participate</p>
                </button>
            </div>
        );

    return (
        <div className="card">
            <img src={LastProject} alt="More" />
            <>{content}</>
            <div className="section">
                {images.map((image, index) => {
                    return (
                        <ButtonSectionCard key={index} image={image} active={section === index} onClick={() => handleClick(index)} />
                    );
                })}
            </div>
        </div>
    );
};

export default ProjectCard;
