import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './Project.scss';
import Aside from '../../components/Aside/Aside';
import { getProjects } from "../../store/slices/projectSlice";
import Loading from "../../components/Loading/Loading";


const Project = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuth);
    const dispatch = useDispatch();
    const { projects, isLoading } = useSelector((state) => state.project);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(getProjects({ id_user: 1, role: "employee" }));

        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, [dispatch]);

    return (
        <>
            {loading || isLoading ? (
                <Loading />
            ) : (
                <div>
                    <h1>Projects</h1>
                </div>
            )}
         </>
    );
}

export default Project;