const ApiError = require('../error/ApiError');
const userService = require('../service/userService');
const {validationResult} = require('express-validator')

class UserController{
    async registration (req, res, next) {
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return next(ApiError.badRequest('ошибка при валидации ', errors.array()))
            }


            const {role, email, password, id_direction} = req.body;
            const userData = await userService.registration(role, email, password, id_direction)

            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

            return res.json(userData);
        } catch (e){
            next(e)
        }
    }

    async login (req, res, next) {
        try{
            const {email, password} = req.body;

            const userData = await userService.login(email, password)

            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

            return res.json(userData);
        } catch (e){
            next(e)
        }
    }

    async logout (req, res, next) {
        try{
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken);

            res.clearCookie('refreshToken');
            return res.json(token); //200 status
        } catch (e){
            next(e)
        }
    }

    async refresh(req, res, next){
        try{
            const {refreshToken} = req.cookies;

            const userData = await userService.refresh(refreshToken)

            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

            return res.json(userData);
        } catch (e){
            next(e)
        }
    }

    async getUsers(req, res){
        const users = await userService.getAllUsers();

        return res.json(users)
    }

    async getUser(req, res){
        const {id} = req.params;

        const user = await userService.getOneUser(id);

        return res.json(user)
    }
}

module.exports = new UserController()