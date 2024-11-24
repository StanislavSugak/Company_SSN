const { Project, Project_Stack} = require("../models/models");
const ApiError = require("../error/ApiError");

class Project_StackService {
    async createProject(project_stackData) {
        const project = await Project.findOne({
            where: {id: project_stackData.id_project}
        }); //hgjk
    
        if (!project) {
            throw ApiError.badRequest('Такого проекта не существует');
        }

        if(project.id_stack === project_stackData.id_stack){
            throw ApiError.conflict('Такая технология уже используется на проекте');
        }

        const project_stack = await Project_Stack.create({ ...project_stackData }); //mb DTO

        return project_stack;
    }
    //обработка айди
    
    async getAll(id_project) {
        const project_stacks = await Project_Stack.findAll({
            where: {id_project},
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });

        return project_stacks;
    }
}

module.exports = new Project_StackService();
