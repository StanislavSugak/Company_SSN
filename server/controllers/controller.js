const ApiError = require("../error/ApiError");

class Controller {
    constructor() {
        this.initializeAsyncMethods();
    }

   /* static AsyncCatch(fn) {
        return async (req, res, next) => {
            try {
                await fn(req, res, next);
            } catch (error) {
                next(error);
            }
        };
    }*/

    static AsyncCatch(fn) {
        return (req, res, next) => {
            Promise.resolve(fn(req, res, next)).catch(next); //?
        };
    }

    initializeAsyncMethods() {     
        const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(this)); //все методы текущего класса 
        
        // в AsyncCatch только те методы, которые являются функциями
        for (const method of methods) {
            if (typeof this[method] === 'function' && method !== 'constructor') {
                this[method] = Controller.AsyncCatch(this[method]);
            }
        }
    }
    
    static checkId(id) {
        if (!id || isNaN(id) || parseInt(id) <= 0) {
            throw ApiError.badRequest('Неккоректный id');
        }   
    }

    static checkString(line){
        if (!line || line.trim() === "") {
            throw ApiError.badRequest("Неккоректный параметр");
        }
    }
}

module.exports = Controller;

/*if(!id || isNaN(id) || parseInt(id) <= 0){
    throw ApiError.badRequest('Неккоректный id')
}*/

