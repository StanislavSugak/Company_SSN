const {User_Learn_History} = require('../models/models')
const ApiError = require('../error/ApiError')

class User_Learn_HistoryService{
    async createStack(user_learn_historyData){
        const user_learn_history = await User_Learn.create({...user_learn_historyData})

        return user_learn_history;
    }

    async getAll(id_learn){
        const user_learns = await User_Learn_History.findAll({where: {id_learn: id_learn}, attributes: { exclude: ['createdAt', 'updatedAt'] } });
    
        return user_learns;
    }
}

module.exports = new User_Learn_HistoryService()