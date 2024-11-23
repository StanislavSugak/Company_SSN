const ApiError = require('../error/ApiError');
const directionService = require('../service/directionService');

class DirectionController{
    async create (req, res, next) {
        console.log(req.body)
        console.log('Request Headers:', req.headers); // Логируем заголовки
        console.log('Request Body:', req.body); // Логируем содержимое req.body
        try{
            const {direction} = req.body;
            console.log(direction)
            const directionData = await directionService.createDirection(direction);

            return res.json(directionData);
        } catch (e){
            next(e)
        }
    }

    async getAllDirection (req, res) {
        const directions = await directionService.getAllDirection();

        return res.json(directions)
    }
}

module.exports = new DirectionController()