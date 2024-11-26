const {User_Learn, User_Learn_History} = require('../models/models')
const ApiError = require('../error/ApiError')

class User_LearnService{
    async createStack(user_learnData){
        const candidate = await User_Learn.findOne({ where: {id_user: user_learnData.id_user, id_stack: user_learnData.id_stack, grade: null} })

        if(candidate){
            throw ApiError.conflict('Уже записаны на это направление');
        }

        const user_learn = await User_Learn.create({...user_learnData})//mb DTO

        return user_learn;
    }

    async deleteStack(user_learnData){
        const user_learn = await this.getOne(user_learnData)
        console.log(user_learn)
        
        const historyCount = await User_Learn_History.count({
            where: {
                id_learn: user_learn.id
            }
        });
    
        if (historyCount > 0) {
            throw ApiError.badRequest('Невозможно удалить запись, так как существуют связанные записи в истории обучения.');
        }

        const deletedCount = await User_Learn.destroy({
            where: {
                id_user: user_learnData.id_user,
                id_stack: user_learnData.id_stack
            }
        });

        if (deletedCount === 0) {
            throw ApiError.notFound('Запись не найдена или уже удалена');
        }

        return user_learn;
    }

    async getAll(id_user){
        const user_learns = await User_Learn.findAll({where: {id_user: id_user}, attributes: { exclude: ['createdAt', 'updatedAt'] } });
    
        return user_learns;
    }

    async getOne(user_learnData) {
        const user_learn = await User_Learn.findOne({ where: { id_user: user_learnData.id_user, id_stack: user_learnData.id_stack}, attributes: { exclude: ['createdAt', 'updatedAt'] } });
        
        if (!user_learn) {
            throw ApiError.notFound('Запись не найдена');
        }

        return user_learn;
    }

}

module.exports = new User_LearnService()