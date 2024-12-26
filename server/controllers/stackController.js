const ApiError = require("../error/ApiError");
const stackService = require("../service/stackService");
const Controller = require("./controller");

class DirectionController extends Controller {
    async create(req, res) {
        const { name, type, id_direction } = req.body;
        const stackData = { name, type, id_direction };

        Controller.checkFields(stackData);

        const stack = await stackService.createStack(stackData);

        return res.json(stack);
    }

    async getAll(req, res) {
        const { id_direction } = req.query;

        const stacks = await stackService.getAll(id_direction);

        return res.json(stacks);
    }

    async getOne(req, res) {
        const { id } = req.params;
        Controller.checkId(id);
        
        const stack = await stackService.getOne(id);

        return res.json(stack);
    }
}

module.exports = new DirectionController();
