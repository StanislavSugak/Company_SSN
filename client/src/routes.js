import Analitic from "./pages/Analitic/Analitic";
import Authorization from "./pages/Authorization/Authorization";
import Employee from "./pages/Employee/Employee";
import Projet from "./pages/Project/Project";
import Shaping from "./pages/Shaping/Shaping";
import Workspace from "./pages/Workspace/Workspace";
import Logout from './components/Logout/Logout'
import { ANALITIC_ROUTE, EMPLOYEE_ROUTE, LOGIN_ROUTE, PROJECT_ROUTE, SHAPING_ROUTE, WORKSPACE_ROUTE, SETTING_ROUTE, LOGOUT_ROUTE } from "./utils/consts";
import {IcAnalic, IcBack, IcEnployee, IcLogout, IcProject, IcSetting, IcShaping, IcWorkspace}from "./utils/consts";

export const teamleadRoutes = [
    {   
        path: EMPLOYEE_ROUTE,
        Component: Employee,
        name: "employee",
        image: IcEnployee
    },
    {
        path: SHAPING_ROUTE,
        Component: Shaping,
        name: "shaping",
        image: IcShaping
    }
];

export const employeeRoutes = [
    {
        path: PROJECT_ROUTE,
        Component: Projet,
        name: "project",
        image: IcProject
    },
    {
        path: ANALITIC_ROUTE,
        Component: Analitic,
        name: "analitic",
        image: IcAnalic
    },
    {
        path: WORKSPACE_ROUTE, ///idd 1^16
        Component: Workspace,
        name: "workspace",
        image: IcWorkspace
    },
];

export const commonRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Authorization,
        name: "authorization",
    }
];

export const basicRoutes = [
    {
        path: SETTING_ROUTE,
        Component: Logout,
        name: "setting",
        image: IcSetting
    },
    {
        path: LOGOUT_ROUTE,
        Component: Logout,
        name: "logout",
        image: IcLogout
    },

];