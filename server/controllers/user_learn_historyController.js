const ApiError = require("../error/ApiError");
const user_learn_historyService = require("../service/user_learn_historyService");
const Controller = require("./controller");

class User_Learn_HistoryController extends Controller {
    async create(req, res) {
        const { id_learn, date_learn, type, grade } = req.body;
        const user_learn_historyData = { id_learn, date_learn, type, grade };

        Controller.checkFields(user_learn_historyData);

        const user_learn_history = await user_learn_historyService.createStack(user_learn_historyData);

        return res.json(user_learn_history);
    }


    //
    async getAll(req, res) {
        const { id_learn } = req.params;
        const user_learns_history = await user_learn_historyService.getAll(id_learn);

        return res.json(user_learns_history);
    }
}

module.exports = new User_Learn_HistoryController();
