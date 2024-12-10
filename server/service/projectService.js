const { Project, User, Project_User, User_Stack, Project_Stack, Stack, User_Personal} = require("../models/models");
const ApiError = require("../error/ApiError");
const { stringify } = require("uuid");
const sequelize  = require('../db'); // Импортируйте sequelize
const {GET_PROJECTS_DATA_BY_EMPLOYEE, GET_PROJECTS_DATA_BY_TEAMLEAD} = require('../queries/queries')

function transformProjectData(project) {
    // Получаем данные о проекте
    const transformedProject = {
        id: project.id,
        name: project.name,
        description: project.description,
        date_start: project.date_start,
        date_delay: project.date_delay,
        date_end: project.date_end,
        bus_factor: project.bus_factor,
        teamlead: {
            id: project.teamlead.id,
            personal: project.teamlead.user_personal, // Добавляем персональные данные тимлида
        },
        stacks: project.project_stack.map(ps => ({
            id_stack: ps.id_stack,
            count_required: ps.count_required,
            name: ps.stack.name,
            type: ps.stack.type,
            id_direction: ps.stack.id_direction,
        })),
        personals: project.project_user.map(pu => ({
            id_user: pu.user_stack.id_user,
            id_stack: pu.user_stack.id_stack,
            grade: pu.user_stack.grade,
            is_mentor: pu.user_stack.is_mentor,
            user: {
                id: pu.user_stack.user.id,
                email: pu.user_stack.user.email,
                personal: pu.user_stack.user.user_personal, // Добавляем персональные данные пользователя
            },
        })),
    };

    return transformedProject;``
}

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

    async getProjectsByUser(userId, role) {       
        // Начало замера времени
        const startTime = Date.now();

        const projects = await sequelize.query( role == 'teamlead' ? GET_PROJECTS_DATA_BY_TEAMLEAD : GET_PROJECTS_DATA_BY_EMPLOYEE, 
            { bind: [userId], type: sequelize.QueryTypes.SELECT } 
        );

        const duration = Date.now() - startTime; // Конец замера времени
        console.log(`Запрос выполнился за ${duration} миллисекунд`);

        //console.log(JSON.stringify(projects, null, 2));

        return projects; // Результаты функции
}


    
}

module.exports = new projectService();
