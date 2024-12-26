const { Direction } = require("../models/models");
const ApiError = require("../error/ApiError");
const { directionQueries } = require("../queries/queries");
const sequelize = require("../db"); // Импортируйте sequelize

class DirectionService {
    async createDirection(direction) {
        const candidate = await Direction.findOne({ where: { direction } });

        if (candidate) {
            throw ApiError.conflict("Направление уже существует");
        }

        const directionData = await Direction.create({ direction });
        
        return directionData;
    }

    async getAll() {
        const queries = directionQueries.direction; 

        const directions = await sequelize.query(queries.allDirection, { type: sequelize.QueryTypes.SELECT });

        // const directions = await Direction.findAll({
        //     attributes: { exclude: ["createdAt", "updatedAt"] },
        // });

        // if(!directions){
        //     throw ApiError.badRequest('Нету записей о направлениях')
        // }

        return directions;
    }
       
    async getOne(id) {
        const direction = await Direction.findOne({
            where: { id },
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });

        if(!direction){
            throw ApiError.badRequest('Направления с таким id не существует')
        }

        return direction;
    }
}

module.exports = new DirectionService();
