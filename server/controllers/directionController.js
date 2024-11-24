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
        const directions = await directionService.getAllDirection();

        return res.json(directions)
    }
}

module.exports = new DirectionController()