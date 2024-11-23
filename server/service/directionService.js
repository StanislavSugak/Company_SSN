const jwt = require('jsonwebtoken')
const {Direction} = require('../models/models')

class DirectionService{
    async createDirection(direction){
        const candidate = await Direction.findOne({ where: { direction } })

        if(candidate){
            throw new Error('Направление уже существует таки мемйлов существует')
        }

        const directionData = await Direction.create({direction})//mb DTO

        return directionData;
    }

    async getAllDirection(){
        const directions = await Direction.findAll();
    
        return directions;
    }
}

module.exports = new DirectionService()