import Analitic from "./pages/Analitic/Analitic";
import Authorization from "./pages/Authorization/Authorization";
import Employee from "./pages/Employee/Employee";
import Projet from "./pages/Project/Project";
import Shaping from "./pages/Shaping/Shaping";
import Workspace from "./pages/Workspace/Workspace";
import { ANALITIC_ROUTE, EMPLOYEE_ROUTE, LOGIN_ROUTE, PROJECT_ROUTE, SHAPING_ROUTE, WORKSPACE_ROUTE } from "./utils/consts";

export const teamleadRoutes = [
    {
        path: EMPLOYEE_ROUTE,
        Component: Employee,
    },
    {
        path: SHAPING_ROUTE,
        Component: Shaping,
    },
];

export const employeeRoutes = [
    {
        path: ANALITIC_ROUTE,
        Component: Analitic,
    },
    {
        path: LOGIN_ROUTE,
        Component: Authorization,
    },
    {
        path: PROJECT_ROUTE,
        Component: Projet,
    },
    {
        path: WORKSPACE_ROUTE, ///idd 1^16
        Component: Workspace,
    },
];
