const { Stack, Direction } = require("../models/models");
const ApiError = require("../error/ApiError");
const sequelize = require("../db"); // Импортируйте sequelize

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

    async getAll(id_direction) {
        const queries = directionQueries.stack; 

        const stacks = await sequelize.query(queries.allStackByDirection, { bind: [id_direction], type: sequelize.QueryTypes.SELECT });
        console.log(stacks)
        return stacks;        
    }

    async getOne(id) {
        const direction = await Stack.findOne({
            where: { id },
            include: [{ model: Direction, as: "direction" }],
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        return direction;        
    }

    async getAll(id_direction) {
        const queries = directionQueries.stack; 

        const stacks = await sequelize.query(queries.allStackByDirection, { bind: [id_direction], type: sequelize.QueryTypes.SELECT });
        console.log(stacks)
        return stacks;        
    }

    
}

module.exports = new StackService();
