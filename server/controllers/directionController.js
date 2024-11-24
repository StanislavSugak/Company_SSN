const ApiError = require('../error/ApiError');
const directionService = require('../service/directionService');

class DirectionController{
    async create (req, res, next) {
        try{
            const {direction} = req.body;
            console.log(direction)
            const directionData = await directionService.createDirection(direction);

            return res.json(directionData);
        } catch (e){
            next(e)
        }
    }

    async getAll (req, res) {
        const directions = await directionService.getAll();

        return res.json(directions)
    }

    async getOne(req, res){
        const {id} = req.params;

        const direction = await directionService.getOne(id);

        return res.json(direction)
    }
}

module.exports = new DirectionController()