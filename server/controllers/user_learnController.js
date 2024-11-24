const ApiError = require('../error/ApiError');
const user_learnService = require('../service/user_learnService');

class User_LearnController{
    async create (req, res, next) {
        try{
            const {id_user, id_stack, date_enter} = req.body;
            const user_learnData = {id_user, id_stack, date_enter}

            const user_learn = await user_learnService.createStack(user_learnData);

            return res.json(user_learn);
        } catch (e){
            next(e)
        }
    }

    async delete(req, res, next){
        try {
            const { id_user, id_stack } = req.query;
            const user_learnData = {id_user, id_stack}
            console.log(user_learnData)
            const deletedUserLearn = await user_learnService.deleteStack(user_learnData);

            return res.status(200).json(deletedUserLearn);
        } catch (e) {
            next(e)
        }
    }

    async getAll (req, res) {
        const {id_user} = req.params;
        const user_learns = await user_learnService.getAll(id_user);

        return res.json(user_learns)
    }

    async getOne(req, res){
        const {id_user, id_stack} = req.params;
        const user_learnData = {id_user, id_stack}

        const user_learn = await user_learnService.getOne(user_learnData);

        return res.json(user_learn)
    }
}

module.exports = new User_LearnController()