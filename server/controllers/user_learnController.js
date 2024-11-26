const ApiError = require("../error/ApiError");
const user_learnService = require("../service/user_learnService");
const Controller = require("./controller");

class User_LearnController extends Controller {
    async create(req, res) {
        const { id_user, id_stack, date_enter } = req.body;
        const user_learnData = { id_user, id_stack, date_enter };

        const user_learn = await user_learnService.createStack(user_learnData);

        return res.json(user_learn);
    }

    async delete(req, res) {
        const { id_user, id_stack } = req.query;
        const user_learnData = { id_user, id_stack };

        const deletedUserLearn = await user_learnService.deleteStack(user_learnData);

        return res.status(200).json(deletedUserLearn);
    }

    async getAll(req, res) {
        const { id_user } = req.params;
        Controller.checkId(id_user);

        const user_learns = await user_learnService.getAll(id_user);

        return res.json(user_learns);
    }

    async getOne(req, res) {
        const { id_user, id_stack } = req.params;
        Controller.checkId(id_user);
        Controller.checkId(id_stack);

        const user_learnData = { id_user, id_stack };

        const user_learn = await user_learnService.getOne(user_learnData);

        return res.json(user_learn);
    }
}

module.exports = new User_LearnController();
