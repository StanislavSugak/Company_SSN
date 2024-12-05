import React, { useState, useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import './Project.scss'
import Aside from '../../components/Aside/Aside'


const Project = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuth);
    

    console.log(isAuthenticated)


    return(
        <main className="project">
            <div className="main">
                sdfsdf
            </div>
            <Aside />
        </main>
    )
}

export default Project