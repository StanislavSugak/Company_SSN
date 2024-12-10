import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './Project.scss';
import { getProjects } from "../../store/slices/projectSlice";
import Loading from "../../components/Loading/Loading";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import CreateIcon from '../../assets/icons/create_card.svg'

const Project = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuth);
    const dispatch = useDispatch();
    const { projects, isLoading } = useSelector((state) => state.project);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(getProjects({ id_user: 1, role: "employee" }));

        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [dispatch]);

    return (
        <>
            {loading || isLoading ? (
                <Loading />
            ) : (
                <>
                <div className="header_project">
                    <div className="header_project_main">

                    </div>
                    <div className="header_project_line"></div>
                </div>
                <div className="cards">
                    {projects.map(project => {
                        return <ProjectCard key={project.project_id} project={project} />;
                    })}
                    <div className="create_card">
                        <button className="create_task_plus">
                            <img src={CreateIcon} alt="fail" />
                        </button>
                        <button className="create_task_button">
                            <p className="text_mln_f20_l20">Create task</p>
                        </button>
                    </div>
                </div>
                </>
            )}
         </>
    );
}

export default Project;