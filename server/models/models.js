const sequelize = require("../db")
const {DataTypes} = require('sequelize')

const Direction = sequelize.define('direction', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    direction: {type: DataTypes.STRING(30), allowNull: true}
})

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    role: {type: DataTypes.STRING(20), defaultValue: "employee", allowNull: true},
    email: {type: DataTypes.STRING(45), unique: true, allowNull: true},
    password: {type: DataTypes.STRING, allowNull: true},
    id_direction: {type: DataTypes.INTEGER, references: { model: Direction, key: 'id' }}
})

const User_Personal = sequelize.define('user_personal', {
    id_user: {type: DataTypes.INTEGER, primaryKey: true, references: { model: User, key: 'id' }},
    name: {type: DataTypes.STRING(20), allowNull: true},
    surname: {type: DataTypes.STRING(20), allowNull: true},
    patronymic: {type: DataTypes.STRING(20)},
    birthday: {type: DataTypes.DATE, allowNull: true},
    telephone: {type: DataTypes.STRING(17), allowNull: true},
    address: {type: DataTypes.STRING, allowNull: true},
    image: {type: DataTypes.STRING, allowNull: true},
    vk_name: {type: DataTypes.STRING(35)},
    instagram_name: {type: DataTypes.STRING(35)},
    telegram_name: {type: DataTypes.STRING(35)},
    linkedIn_name: {type: DataTypes.STRING(35)},
    date_hire: {type: DataTypes.DATE, allowNull: true}
})

const Refresh_Token = sequelize.define('refresh_token', {
    id_user: {type: DataTypes.INTEGER, primaryKey: true, references: { model: User, key: 'id' }},
    refresh_token: {type: DataTypes.STRING, allowNull: true},
})

const Project = sequelize.define('project', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING(25), allowNull: true},
    description: {type: DataTypes.STRING, allowNull: true},
    date_start: {type: DataTypes.DATE, allowNull: true},
    date_delay: {type: DataTypes.DATE},
    date_end: {type: DataTypes.DATE},
    bus_factor: {type: DataTypes.INTEGER, defaultValue: 0, allowNull: true},
    id_teamlead: {type: DataTypes.INTEGER, references: { model: User, key: 'id' }},
})

const Stack = sequelize.define('stack', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING(25), allowNull: true},
    type: {type: DataTypes.STRING(15), allowNull: true},
    id_direction: {type: DataTypes.INTEGER, references: { model: Direction, key: 'id' }}
})

const Project_Stack = sequelize.define('project_stack', {
    id_project: {type: DataTypes.INTEGER, references: { model: Project, key: 'id' }},
    id_stack: {type: DataTypes.INTEGER, references: { model: Stack, key: 'id' }},
    count_required: {type: DataTypes.INTEGER, allowNull: true}
})

const User_Stack = sequelize.define('user_stack', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    id_user: {type: DataTypes.INTEGER, references: { model: User, key: 'id' }},
    id_stack: {type: DataTypes.INTEGER, references: { model: Stack, key: 'id' }},
    grade: {type: DataTypes.INTEGER, allowNull: true},
    is_mentor: {type: DataTypes.BOOLEAN, allowNull: true}
})

const Project_User = sequelize.define('project_user', {
    id_project: {type: DataTypes.INTEGER, primaryKey: true, references: { model: Project, key: 'id' }},
    id_user_stack: {type: DataTypes.INTEGER, primaryKey: true, references: { model: User_Stack, key: 'id' }},
    raiting: {type: DataTypes.INTEGER}
})

const User_Learn = sequelize.define('user_learn', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    id_user: {type: DataTypes.INTEGER, references: { model: User, key: 'id' }},
    id_stack: {type: DataTypes.INTEGER, references: { model: Stack, key: 'id' }},
    date_enter: {type: DataTypes.DATE, allowNull: true},
    date_end: {type: DataTypes.DATE},
    grade: {type: DataTypes.INTEGER}
})

const User_Learn_History = sequelize.define('user_learn_history', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    id_learn: {type: DataTypes.INTEGER, references: { model: User_Learn, key: 'id' }}, 
    date_learn: {type: DataTypes.DATE, allowNull: true}, 
    type: {type: DataTypes.STRING(30), allowNull: true},
    grade: {type: DataTypes.INTEGER, allowNull: true}
})

Direction.hasMany(User, {foreignKey: 'id_direction',sourceKey: 'id'});
User.belongsTo(Direction, { foreignKey: 'id_direction',targetKey: 'id'});

User.hasOne(User_Personal, {foreignKey: 'id_user',sourceKey: 'id'});
User_Personal.belongsTo(User, { foreignKey: 'id_user',targetKey: 'id'});

User.hasOne(Refresh_Token, {foreignKey: 'id_user',sourceKey: 'id'});
Refresh_Token.belongsTo(User, { foreignKey: 'id_user',targetKey: 'id'});

User.hasMany(Project, {foreignKey: 'id_teamlead',sourceKey: 'id',  as: 'projects'});
Project.belongsTo(User, { foreignKey: 'id_teamlead',targetKey: 'id', as: 'teamlead'});

Direction.hasMany(Stack, {foreignKey: 'id_direction',sourceKey: 'id'});
Stack.belongsTo(Direction, { foreignKey: 'id_direction',targetKey: 'id'});

Project.hasMany(Project_Stack, {foreignKey: 'id_project',sourceKey: 'id'});
Project_Stack.belongsTo(Project, { foreignKey: 'id_project',targetKey: 'id'});

Stack.hasMany(Project_Stack, {foreignKey: 'id_stack',sourceKey: 'id'});
Project_Stack.belongsTo(Stack, { foreignKey: 'id_stack',targetKey: 'id'});

Stack.hasMany(User_Stack, {foreignKey: 'id_stack',sourceKey: 'id'});
User_Stack.belongsTo(Stack, { foreignKey: 'id_stack',targetKey: 'id'});

User.hasMany(User_Stack, {foreignKey: 'id_user',sourceKey: 'id'});
User_Stack.belongsTo(User, { foreignKey: 'id_user',targetKey: 'id'});

Project.hasMany(Project_User, {foreignKey: 'id_project',sourceKey: 'id'});
Project_User.belongsTo(Project, { foreignKey: 'id_project',targetKey: 'id'});

User_Stack.hasMany(Project_User, {foreignKey: 'id_user_stack',sourceKey: 'id'});
Project_User.belongsTo(User_Stack, { foreignKey: 'id_user_stack',targetKey: 'id'});

Stack.hasMany(User_Learn, {foreignKey: 'id_stack',sourceKey: 'id'});
User_Learn.belongsTo(Stack, { foreignKey: 'id_stack',targetKey: 'id'});

User.hasMany(User_Learn, {foreignKey: 'id_user',sourceKey: 'id'});
User_Learn.belongsTo(User, { foreignKey: 'id_user',targetKey: 'id'});

User_Learn.hasMany(User_Learn_History, {foreignKey: 'id_learn',sourceKey: 'id'});
User_Learn_History.belongsTo(User_Learn, { foreignKey: 'id_learn',targetKey: 'id'});

module.exports = {
    User,
    Direction,
    User_Personal,
    Refresh_Token,
    Project,
    Stack,
    Project_Stack,
    User_Stack,
    Project_User,
    User_Learn,
    User_Learn_History
}