const ApiError = require('../error/ApiError');
const userService = require('../service/userService');
const {validationResult} = require('express-validator')

class UserController{
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('Ошибка при валидации', errors.array()));
            }
    
            const { role, email, password, id_direction } = req.body;
    
            const userData = await userService.registration(role, email, password, id_direction);
            if (!userData) {
                return next(ApiError.internal('Ошибка при создании пользователя'));
            }
    
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return next(ApiError.badRequest('Email и пароль обязательны для входа'));
            }
    
            const userData = await userService.login(email, password);
            if (!userData) {
                return next(ApiError.unauthorized('Неверный email или пароль'));
            }
    
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30 дней
                httpOnly: true
            });
    
            return res.json(userData);
        } catch (e) {
            next(e);
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

    async getAll(req, res){
        const users = await userService.getAll();

        return res.json(users)
    }

    async getOne(req, res){
        const {id} = req.params;
        console.log(id)
        const user = await userService.getOne(id);

        return res.json(user)
    }
}

module.exports = new UserController()