const ApiError = require("../error/ApiError");
const project_userService = require("../service/project_userService");
const Controller = require("./controller");

class Project_UserController extends Controller {
    async create(req, res) {
        const { id_project, id_user_stack } = req.body;
        const project_userkData = { id_project, id_user_stack };

        const project_user = await project_userService.createProject(project_userkData);

        return res.json(project_user);
    }

    async getAll(req, res) {
        const { id_project } = req.params;
        Controller.checkId(id_project);

        const project_users = await project_userService.getAll(id_project);

        return res.json(project_users);
    }
}

module.exports = new Project_UserController();
