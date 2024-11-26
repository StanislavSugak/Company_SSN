const ApiError = require("../error/ApiError");
const user_personalService = require("../service/user_personalService");
const Controller = require("./controller");

class User_PersonalController extends Controller {
    async create(req, res, next) {
        const {id_user,name,surname,patronymic,birthday,telephone,address,vk_name,instagram_name,telegram_name,linkedIn_name,date_hire} = req.body;
        const { image } = req.files;

        const userData = {id_user,name,surname,patronymic,birthday,telephone,address,vk_name,instagram_name,telegram_name, image, linkedIn_name,date_hire}

        const user_personal = await user_personalService.create(userData);

        return res.json(user_personal);
    }

    async update(req, res, next) {
        const { id } = req.params;
        const {id_user,name,surname,patronymic,birthday,telephone,address,vk_name,instagram_name,telegram_name,linkedIn_name,date_hire} = req.body
        const image = req.files ? req.files.image : undefined;

        const userData = {id_user,name,surname,patronymic,birthday,telephone,address,vk_name,instagram_name,telegram_name, image, linkedIn_name,date_hire}

        const filteredUserData = Object.fromEntries(
            Object.entries(userData).filter(
                ([key, value]) => value !== null && value !== undefined
            )
        );

        const updatedUser = await user_personalService.update(id,filteredUserData);

        return res.json(updatedUser);
    }

    async getAll(req, res) {
        const users_personal = await user_personalService.getAll();

        return res.json(users_personal);
    }

    async getOne(req, res) {
        const { id } = req.params;
        Controller.checkId(id);

        const user_personal = await user_personalService.getOne(id);

        return res.json(user_personal);
    }
}

module.exports = new User_PersonalController();
