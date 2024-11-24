const {User_Personal} = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')

class User_PersonalService{
    async create(userData){
        let filename =  uuid.v4() + ".jpg"
        userData.image.mv(path.resolve(__dirname,'..', 'static', filename))
        console.log(userData)
        const user_personal = await User_Personal.create({...userData, image: filename})

        return user_personal
    }//обрабоатть чтобы ошибка если с таким же айди и другие поля

    async update(id, user_personalData) {
        const user_personal = await User_Personal.findByPk(id);
        if (!user_personal) {
            throw ApiError.badRequest('Пользователь не найден');
        }

        if (user_personalData.image) {
            const filename = uuid.v4() + ".jpg";
            await user_personalData.image.mv(path.resolve(__dirname, '..', 'static', filename));
            user_personalData.image = filename; // Устанавливаем новое имя файла в user_personalData
        }
        
        const updated = await User_Personal.update(user_personalData, { where: { id_user: id },  returning: true});
    
        return updated;
    }
    
    async getAll() {
        const users_personal = await User_Personal.findAll({attributes: { exclude: ['createdAt', 'updatedAt'] } });
    
        return users_personal;
    }

    async getOne(id) {
        const user_personal = await User_Personal.findOne({where: {id}, attributes: { exclude: ['createdAt', 'updatedAt'] } });
    
        return user_personal;
    }
}

module.exports = new User_PersonalService()