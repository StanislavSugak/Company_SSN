const ApiError = require('../error/ApiError');
const stackService = require('../service/stackService');

class DirectionController{
    async create (req, res, next) {
        try{
            const {name, type, id_direction} = req.body;
            const stackData = {name, type, id_direction}

            const stack = await stackService.createStack(stackData);

            return res.json(stack);
        } catch (e){
            next(e)
        }
    }

    async getAll (req, res) {
        const stacks = await stackService.getAll();

        return res.json(stacks)
    }

    async getOne(req, res){
        const {id} = req.params;

        const stack = await stackService.getOne(id);

        return res.json(stack)
    }
}

module.exports = new DirectionController()