require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const models = require('./models/models')
const cors = require('cors')
const cookiePerser = require('cookie-parser')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')


const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors())
app.use(cookiePerser())
app.use(express.json())
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