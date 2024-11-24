const {User_Stack} = require('../models/models')
const ApiError = require('../error/ApiError')

class User_StackService{
    async createStack(user_stackData){
        const candidate = await User_Stack.findOne({ where: {id_user: user_stackData.id_user, id_stack: user_stackData.id_stack} })

        if(candidate){
            throw ApiError.conflict('Данное направление уже существует');
        }

        const user_stack = await User_Stack.create({...user_stackData})//mb DTO

        return user_stack;
    }
    //обработка айди

    async updateStack(user_stackData){
        const user_stack = await this.getOne(user_stackData)
        if (!user_stack) {
            throw ApiError.badRequest('Пользователь или технология не найдена');
        }
        
        const updated = await User_Stack.update(user_stackData, { where: { id_user: user_stackData.id_user, id_stack: user_stackData.id_stack},  returning: true});
    
        return updated;
    }

    async getAll(id_user){
        const user_stacks = await User_Stack.findAll({where: {id_user: id_user}, attributes: { exclude: ['createdAt', 'updatedAt'] } });
    
        return user_stacks;
    }

    async getOne(user_stackData) {
        const user_stack = await User_Stack.findOne({ where: { id_user: user_stackData.id_user, id_stack: user_stackData.id_stack}, attributes: { exclude: ['createdAt', 'updatedAt'] } });
    
        return user_stack;
    }
}

module.exports = new User_StackService()