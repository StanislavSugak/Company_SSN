const {
    Project,
    User,
    Project_User,
    User_Stack,
    Project_Stack,
    Stack,
    User_Personal,
} = require("../models/models");
const ApiError = require("../error/ApiError");
const { stringify } = require("uuid");
const sequelize = require("../db"); // Импортируйте sequelize
const {
    GET_PROJECTS_DATA_BY_EMPLOYEE,
    GET_PROJECTS_DATA_BY_TEAMLEAD,
} = require("../queries/queries");

class projectService {
    async createProject(projectData) {
        const teamlead = await User.findOne({
            where: {
                id: projectData.id_teamlead,
                role: "teamlead",
            },
        });

        if (!teamlead) {
            throw ApiError.badRequest(
                "Пользователь не найден или не является teamlead"
            );
        }

        const project = await Project.create({ ...projectData }); //mb DTO

        return project;
    }

    async getOne(id) {
        const project = await Project.findOne({
            where: { id },
            include: [
                {
                    model: User,
                    as: "teamlead",
                    attributes: { exclude: ["createdAt", "updatedAt"] },
                },
            ],
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });

        return project;
    }

    async getProjectsByUser(userId, role) {
        const projects = await sequelize.query(
            role == "teamlead" ? GET_PROJECTS_DATA_BY_TEAMLEAD : GET_PROJECTS_DATA_BY_EMPLOYEE,
            { bind: [userId], type: sequelize.QueryTypes.SELECT }
        );

        return projects;
    }
}

module.exports = new projectService();

//const startTime = Date.now();
//const duration = Date.now() - startTime; // Конец замера времени
//console.log(`Запрос выполнился за ${duration} миллисекунд`)
//console.log(JSON.stringify(projects, null, 2));