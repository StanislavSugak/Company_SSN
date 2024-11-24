const ApiError = require('../error/ApiError');
const project_userService = require('../service/project_userService');

class Project_UserController{
    async create (req, res, next) {
        try{
            const {id_project, id_user_stack, raiting} = req.body;
            const project_userkData =  {id_project, id_user_stack};

            const project_user = await project_userService.createProject(project_userkData);

            return res.json(project_user);
        } catch (e){
            next(e)
        }
    }

    async getAll (req, res) {
        const {id_project} = req.params;
        const project_users = await project_userService.getAll(id_project);

        return res.json(project_users)
    }
}

module.exports = new Project_UserController()