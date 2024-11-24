const ApiError = require('../error/ApiError');
const user_personalService = require('../service/user_personalService');

class User_PersonalController{
    async create(req, res, next){
        try{
            const {id_user, name, surname, patronymic, birthday, telephone, address, vk_name, instagram_name, telegram_name, linkedIn_name, date_hire} = req.body     
            const {image} = req.files;

            const userData = {id_user, name, surname, patronymic, birthday, telephone, address, image, vk_name, instagram_name, telegram_name, linkedIn_name, date_hire}

            const user_personal = await user_personalService.create(userData)

            return res.json(user_personal);
        } catch (e){
            next(e)
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { id_user, name, surname, patronymic, birthday, telephone, address, vk_name, instagram_name, telegram_name, linkedIn_name, date_hire } = req.body;     
            const image = req.files ? req.files.image : undefined;
    
            const userData = { id_user, name, surname, patronymic, birthday, telephone, address, image, vk_name, instagram_name, telegram_name, linkedIn_name, date_hire };
            console.log(userData);
            const filteredUserData = Object.fromEntries(
                Object.entries(userData).filter(([key, value]) => value !== null && value !== undefined)
            );
    
            const updatedUser = await user_personalService.update(id, filteredUserData);
    
            return res.json(updatedUser);
        } catch (e) {
            next(e);
        }
    }

    async getAll(req, res){
        const users_personal = await user_personalService.getAll();

        return res.json(users_personal)
    }

    async getOne(req, res){
        const {id} = req.params;

        const user_personal = await user_personalService.getOne(id);

        return res.json(user_personal)
    }
}

module.exports = new User_PersonalController()