const { Direction } = require("../models/models");
const ApiError = require("../error/ApiError");

class DirectionService {
    async createDirection(direction) {
        const candidate = await Direction.findOne({ where: { direction } });

        if (candidate) {
            throw ApiError.conflict("Направление уже существует");
        }

        const directionData = await Direction.create({ direction }); //mb DTO

        return directionData;
    }

    async getAll() {
        const directions = await Direction.findAll({
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });

        return directions;
    }

    async getOne(id) {
        const direction = await Direction.findOne({
            where: { id },
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });

        return direction;
    }
}

module.exports = new DirectionService();
