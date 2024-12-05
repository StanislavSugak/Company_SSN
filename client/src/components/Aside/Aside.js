import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import './Aside.scss'
import { employeeRoutes, teamleadRoutes, basicRoutes } from '../../routes';

const Aside = () => {
    const role = useSelector((state) => state.auth.user.role);
    const routes = role == "teamlead" ? [ ...employeeRoutes, ...teamleadRoutes,] : [...employeeRoutes];

    return(
        <aside>
            <ul>
                {routes.map(({ path, name, image }) => (
                    <li key={path}>
                        <img src={image} alt={name}/>
                        <NavLink to={path}>{name}</NavLink>
                    </li>
                ))}
            </ul>
            <ul>
                {basicRoutes.map(({ path, name, image }) => (
                    <li key={path}>
                        <img src={image} alt={name}/>
                        <NavLink to={path}>{name}</NavLink>
                    </li>
                ))}
            </ul>
        </aside>
    )
}

export default Aside;