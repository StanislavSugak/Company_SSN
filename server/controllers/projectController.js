const ApiError = require("../error/ApiError");
const projectService = require("../service/projectService");
const Controller = require("./controller");

class ProjectController extends Controller {
    async create(req, res) {
        const { name, description, date_start, bus_factor, id_teamlead } = req.body;
        const projectData = {name,description,date_start,bus_factor,id_teamlead, };

        const project = await projectService.createProject(projectData);

        return res.json(project);
    }

    async getAll(req, res) {
        const projects = await projectService.getAll();

        return res.json(projects);
    }

    async getOne(req, res) {
        const { id } = req.params;
        Controller.checkId(id);

        const project = await projectService.getOne(id);

        return res.json(project);
    }
}

module.exports = new ProjectController();
