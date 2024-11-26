const ApiError = require("../error/ApiError");
const directionService = require("../service/directionService");
const Controller = require("./controller");

class DirectionController extends Controller {
    async create(req, res) {
        const { direction } = req.body;
        Controller.checkString(direction);
    
        const directionData = await directionService.createDirection(direction);
    
        return res.json(directionData);
    }
    
    async getAll(req, res) {
        const directions = await directionService.getAll();
    
        return res.json(directions);
    }
    
    async getOne(req, res) {
        const { id } = req.params;
        Controller.checkId(id);
    
        const direction = await directionService.getOne(id);
    
        return res.json(direction);
    }
}

module.exports = new DirectionController();
