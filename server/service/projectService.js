const { Project, User } = require("../models/models");
const ApiError = require("../error/ApiError");

class projectService {
    async createProject(projectData) {
        const teamlead = await User.findOne({
            where: {
                id: projectData.id_teamlead,
                role: 'teamlead'
            }
        });
    
        if (!teamlead) {
            throw ApiError.badRequest('Пользователь не найден или не является teamlead');
        }

        const project = await Project.create({ ...projectData }); //mb DTO

        return project;
    }

    async getAll() {
        const projects = await Project.findAll({
            include: [
                {
                    model: User,
                    as: 'teamlead',
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                },
            ],
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });

        return projects;
    }//получаю из юсера а может надо еще и из персонал?

    async getOne(id) {
        const project = await Project.findOne({
            where: {id},
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
}

module.exports = new projectService();
