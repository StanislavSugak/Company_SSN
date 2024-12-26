const ApiError = require("../error/ApiError");
const project_stackService = require("../service/project_stackService");
const Controller = require("./controller");

class Project_StackController extends Controller {
    async create(req, res) {
        const { id_project, id_stack, count_required } = req.body;
        const project_stackData = { id_project, id_stack, count_required };

        Controller.checkFields(project_stackData);

        const project_stack = await project_stackService.createProject(project_stackData);

        return res.json(project_stack);
    }

    async getAll(req, res) {
        const { id_project } = req.params;
        Controller.checkId(id_project);
        
        const project_stacks = await project_stackService.getAll(id_project);

        return res.json(project_stacks);
    }

}

module.exports = new Project_StackController();
