import React from "react";
import {  useSelector} from "react-redux";

const Project = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuth);
    

    console.log(isAuthenticated)
    return(
        <div>
            Project
        </div>
    )
}

export default Project