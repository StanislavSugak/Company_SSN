const ApiError = require("../error/ApiError");
const userService = require("../service/userService");
const { validationResult } = require("express-validator");
const Controller = require("./controller");

class UserController extends Controller {
    async registration(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(
                ApiError.badRequest("Ошибка при валидации", errors.array())
            );
        }
        //исправить валидацию
        const { role, email, password, id_direction } = req.body;
        const user_regData = { role, email, password, id_direction }
        ///передеать
        Controller.checkFields(user_regData);

        const userData = await userService.registration(role, email, password, id_direction);

        if (!userData) {
            return next(ApiError.internal("Ошибка при создании пользователя"));
        }

        res.cookie("refreshToken", userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});

        return res.json(userData);
    }

    async login(req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            throw ApiError.badRequest("Email и пароль обязательны для входа")
        }

        const userData = await userService.login(email, password);
        if (!userData) {
            throw ApiError.unauthorized("Неверный email или пароль");
        }
        //console.log('sdfsdfsdfrefresssss')
        //console.log(userData.refreshToken)
        res.cookie("refreshToken", userData.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 дней
            httpOnly: true,
        });

        return res.json(userData);
    }

    async logout(req, res) {
        const { refreshToken } = req.cookies;
        const token = await userService.logout(refreshToken);

        res.clearCookie("refreshToken");

        return res.json(token); //200 status
    }

    async refresh(req, res) {
        const { refreshToken } = req.cookies;

        const userData = await userService.refresh(refreshToken);

        res.cookie("refreshToken", userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true,});
        //console.log('ttttttttttttyyyy')
        return res.json(userData);
    }

    async getAll(req, res) {
        const users = await userService.getAll();

        return res.json(users);
    }

    async getOne(req, res) {
        const { id } = req.params;
        Controller.checkId(id);
        
        const user = await userService.getOne(id);

        return res.json(user);
    }
}

module.exports = new UserController();

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Niwicm9sZSI6InRlYW1sZWFkIiwiaWF0IjoxNzMzMzM4NjMwLCJleHAiOjE3MzU5MzA2MzB9.NH9DMrgh84QzAJka_Ac68Eh0lf5DXtd-gHoqwdZEoG0
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJ0ZWFtbGVhZEBnbWFpbC5jb20iLCJyb2xlIjoidGVhbWxlYWQiLCJpZF9kaXJlY3Rpb24iOjEsImlhdCI6MTczMjgzNDMyNSwiZXhwIjoxNzM1NDI2MzI1fQ.kDPYut4PY-QwV0XKqK95BoEsT5Ic-BMS6a39L6jGUHY
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Niwicm9sZSI6InRlYW1sZWFkIiwiaWF0IjoxNzMzMzM4NzM0LCJleHAiOjE3MzU5MzA3MzR9.7LYaznxTq1fu8PG6szzERIAozpVkRoWj-4VQab35tuc
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJ0ZWFtbGVhZEBnbWFpbC5jb20iLCJyb2xlIjoidGVhbWxlYWQiLCJpZF9kaXJlY3Rpb24iOjEsImlhdCI6MTczMjgzNDMyNSwiZXhwIjoxNzM1NDI2MzI1fQ.kDPYut4PY-QwV0XKqK95BoEsT5Ic-BMS6a39L6jGUHY