require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const models = require('./models/models')
const cors = require('cors')
const cookiePerser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

const PORT = process.env.PORT || 5000;

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000', // Замените на ваш фронтенд
    credentials: true, // Разрешите отправку куки
};

app.use(cors(corsOptions)); // Переместите эту строку перед другими middleware

app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static'))) 
app.use(fileUpload({}))
//app.use(cors())
app.use(cookiePerser())
app.use('/api', router)

app.use(errorHandler)

app.get('/', (req,res) => {res.status(200).json({message: 'sdfd'})})


const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, console.log(`Server started on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
};

start()