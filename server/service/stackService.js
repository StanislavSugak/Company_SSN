const { Stack, Direction } = require("../models/models");
const ApiError = require("../error/ApiError");

class StackService {
    async createStack(stackData) {
        const candidate = await Stack.findOne({
            where: { name: stackData.name },
        });

        if (candidate) {
            throw ApiError.conflict("Технология уже существует");
        }

        const stack = await Stack.create({ ...stackData }); //mb DTO

        return stack;
    }

    async getAll() {
        const directions = await Stack.findAll({
            include: [{ model: Direction, as: "direction" }],
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });

        return directions;
    }

    async getOne(id) {
        const direction = await Stack.findOne({
            where: { id },
            include: [{ model: Direction, as: "direction" }],
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        return direction;
    }
}

module.exports = new StackService();
