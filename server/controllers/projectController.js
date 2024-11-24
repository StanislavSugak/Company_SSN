const ApiError = require('../error/ApiError');
const projectService = require('../service/projectService');

class projectController{
    async create (req, res, next) {
        try{
            const {name, description, date_start, bus_factor, id_teamlead} = req.body;
            const projectData =  {name, description, date_start, bus_factor, id_teamlead}

            const project = await projectService.createProject(projectData);

            return res.json(project);
        } catch (e){
            next(e)
        }
    }

    async getAll (req, res) {
        const projects = await projectService.getAll();

        return res.json(projects)
    }

    async getOne(req, res){
        const {id} = req.params;

        const project = await projectService.getOne(id);

        return res.json(project)
    }
}

module.exports = new projectController()