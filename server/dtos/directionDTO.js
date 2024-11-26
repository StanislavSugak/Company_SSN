module.exports = class UserDTO{
    id;
    direction;

    constructor(model){
        this.id = model.id;
        this.direction = model.direction;
    }
}   