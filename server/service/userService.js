const {User} = require('../models/models')
const tokenService = require('./tokenService')
const UserDTO = require('../dtos/userDTO')
const ApiError = require('../error/ApiError')

class UserService{
    async registration (role, email, password, id_direction) {
        const candidate = await User.findOne({email})

        if(candidate){
            throw new Error('Пользвоатель таки мемйлов существует')
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const user = await User.create({role, email, password: hashPassword, id_direction})

        const userDTO = new UserDTO(user)
        const tokens = tokenService.generateTokens({...userDTO});
        
        await tokenService.saveToken(userDTO.id, tokens.refreshToken)

        return { ...tokens, user: userDTO}
    }

    async login (email, password) {
        const user = await User.findOne({email})
        
        if(!user){
            throw ApiError.badRequest('Пользвоатель не найден')
        }

        const isPassEquals = await bcrypt.compare(password, user.password)

        if(!isPassEquals){
            throw ApiError.badRequest('Пароли не верны')
        }

        const userDTO = new UserDTO(user);
        const tokens = tokenService.generateTokens({...userDTO})
    
        await tokenService.saveToken(userDTO.id, tokens.refreshToken)

        return { ...tokens, user: userDTO}
    }


    async logout(refreshToken){
        const token = await tokenService.removeToken(refreshToken);

        return token;
    }

    async refresh(refreshToken){
        if(!refreshToken){
            throw ApiError.badRequest('аноризейд')
        }

        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await tokenService.findToken(refreshToken)

        if(!userData || !tokenFromDb){
            throw ApiError.badRequest('не авторищовани')
        }
        const user = await User.findById(userData.id)
        const userDTO = new UserDTO(user);
        const tokens = tokenService.generateTokens({...userDTO})
    
        await tokenService.saveToken(userDTO.id, tokens.refreshToken)

        return { ...tokens, user: userDTO}
    }
}

module.exports = new UserService()