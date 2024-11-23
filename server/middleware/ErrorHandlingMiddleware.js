const ApiError = require('../error/ApiError')

module.exports = function (err, req, res, next) {
    console.log(err)
    if(err instanceof ApiError){ //мой класс ли
        res.status(err.status).json({message: err.message}) 
    }
    return res.status(500).json({message: "Непредвиденная ошибка"})
}
