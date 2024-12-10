import $api from "../http/index";
import { API_ENDPOINTS } from "../http/apiEndpoints";
import BaseService from "./BaseService";

class ProjectService extends BaseService {
    async getProjects(id_user, role){
        const response = await BaseService.request("get", API_ENDPOINTS.PROJECT.GET_PROJECTS, { params: { id_user, role } });

        return response;
    }
}

const projectServiceInstance = new ProjectService();

export default projectServiceInstance;
