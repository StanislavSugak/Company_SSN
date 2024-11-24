const { Project, Project_User } = require("../models/models");
const ApiError = require("../error/ApiError");

class Project_UserService {
    async createProject(project_userData) {
        const project = await Project.findOne({
            where: {id: project_userData.id_project}
        }); //hgjk
        
        if (!project) {
            throw ApiError.badRequest('Такого проекта не существует');
        }

        const candidate = await this.getAll(project_userData.id_project)
        console.log(candidate)
      /*  if(project.id_user_stack === project_userData.id_stack){
            throw ApiError.conflict('Такая технология уже используется на проекте');
        }*/

        const project_user = await Project_User.create({ ...project_userData }); //mb DTO

        return project_user;
    }
    //обработка айди
    
    async getAll(id_project) {
        const project_users = await Project_User.findAll({
            where: {id_project},
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });

        return project_users;
    }
}

module.exports = new Project_UserService();
