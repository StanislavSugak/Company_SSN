const ApiError = require('../error/ApiError');
const project_stackService = require('../service/project_stackService');

class Project_StackController{
    async create (req, res, next) {
        try{
            const {id_project, id_stack, count_required} = req.body;
            const project_stackData =  {id_project, id_stack, count_required};

            const project_stack = await project_stackService.createProject(project_stackData);

            return res.json(project_stack);
        } catch (e){
            next(e)
        }
    }

    async getAll (req, res) {
        const {id_project} = req.params;
        const project_stacks = await project_stackService.getAll(id_project);

        return res.json(project_stacks)
    }
}

module.exports = new Project_StackController()