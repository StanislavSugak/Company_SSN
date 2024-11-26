module.exports = class UserDTO{
    id;
    email;
    role;
    id_direction;

    constructor(model){
        this.email = model.email;
        this.id = model.id;
        this.role = model.role;
        this.id_direction = model.id_direction;
    }
}   