const ApiError = require('../error/ApiError');
const user_stackService = require('../service/user_stackService');

class User_StackController{
    async create (req, res, next) {
        try{
            const {id_user, id_stack, grade, is_mentor} = req.body;
            const user_stackData =  {id_user, id_stack, grade, is_mentor}

            const user_stack= await user_stackService.createStack(user_stackData);

            return res.json(user_stack);
        } catch (e){
            next(e)
        }
    }

    async update(req, res, next){
        try {
            const {id_user, id_stack} = req.params;
            const { grade, is_mentor } = req.body;     
    
            const user_stackData =  { id_user, id_stack, grade, is_mentor }

            const filteredUserData = Object.fromEntries(
                Object.entries(user_stackData).filter(([key, value]) => value !== null && value !== undefined)
            );
    
            const user_stackUpdated = await user_stackService.updateStack(user_stackData);
    
            return res.json(user_stackUpdated);
        } catch (e) {
            next(e);
        }
    }

    async getAll (req, res) {
        const {id_user} = req.params;
        const user_stacks = await user_stackService.getAll(id_user);

        return res.json(user_stacks)
    }

    async getOne(req, res){
        const {id_user, id_stack} = req.params;
        const user_stackData = {id_user, id_stack}

        const user_stack = await user_stackService.getOne(user_stackData);

        return res.json(user_stack)
    }
}

module.exports = new User_StackController()