import $api from "../http/index";
import { API_ENDPOINTS } from "../http/apiEndpoints";
import BaseService from "./BaseService";

class TechnologyService extends BaseService {
    async getDirections(){
        const response = await BaseService.request("get", API_ENDPOINTS.TECHNOLOGY.GET_DIRECTIONS, { });

        return response;
    }

    async getStacks(id_direction){
        console.log('2222223333333333333333333')
        const response = await BaseService.request("get", API_ENDPOINTS.TECHNOLOGY.GET_STACK, { params: { id_direction } });
        console.log('4444444444444444444444444')
        return response;
    }    
}

const tehnologyServiceInstance = new TechnologyService();

export default tehnologyServiceInstance;
