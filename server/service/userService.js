const { User, Direction } = require("../models/models");
const tokenService = require("./tokenService");
const UserDTO = require("../dtos/userDTO");
const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");

class UserService {
    async registration(role, email, password, id_direction) {
        const candidate = await User.findOne({ where: { email } });

        if (candidate) {
            throw ApiError.conflict(
                "Пользователь с таким email уже существует"
            );
        }

        const hashPassword = await bcrypt.hash(password, 3);
        const user = await User.create({
            role,
            email,
            password: hashPassword,
            id_direction,
        });

        const userDTO = new UserDTO(user);
        const tokens = tokenService.generateTokens({ ...userDTO });

        await tokenService.saveToken(userDTO.id, tokens.refreshToken);

        return { ...tokens, user: userDTO };
    }

    async login(email, password) {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            throw ApiError.unauthorized("Пользователь не найден");
        }

        const isPassEquals = await bcrypt.compare(password, user.password);

        if (!isPassEquals) {
            throw ApiError.unauthorized("Пароли не верны");
        }

        const userDTO = new UserDTO(user);
        const tokens = tokenService.generateTokens({ ...userDTO });

        await tokenService.saveToken(userDTO.id, tokens.refreshToken);

        return { ...tokens, user: userDTO };
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);

        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.badRequest("Токен не предоставлен");
        }
        console.log('sdfffffffffffffffffffffffffffffffff')
        console.log(refreshToken)
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        console.log('wwwwwwwwwwwwwwwwwwwwwwwww1252413243524324353244')
        console.log(userData)
        console.log(tokenFromDb)

        if (!userData || !tokenFromDb) {
            console.log('1252413243524324353244')
            throw ApiError.unauthorized("Не авторизован");
        }
        const user = await User.findByPk(userData.id);
        if (!user) {
            throw ApiError.notFound("Пользователь не найден");
        }

        const userDTO = new UserDTO(user);
        const tokens = tokenService.generateTokens({ ...userDTO });
        if (!tokens) {
            throw ApiError.internal("Ошибка при создании токенов");
        }

        await tokenService.saveToken(userDTO.id, tokens.refreshToken);

        return { ...tokens, user: userDTO };
    }
    
    async getAll() {
        const users = await User.findAll({
            include: [
                {
                    model: Direction,
                    as: "direction",
                    attributes: { exclude: ["createdAt", "updatedAt"] },
                },
            ],
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });

        return users;
    }

    async getOne(id) {
        const user = await User.findOne({
            where: { id },
            include: [
                {
                    model: Direction,
                    as: "direction",
                    attributes: { exclude: ["createdAt", "updatedAt"] },
                },
            ],
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });

        return user;
    }
}

module.exports = new UserService();
