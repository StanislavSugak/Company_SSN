const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const {body} = require('express-validator')
const authMiddleware = require('../middleware/authMiddleware') //второй параметр
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/registration', body('password').isLength({min: 2, max: 32}), userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/refresh', userController.refresh)
router.get('/users', userController.getUsers)
router.get('/:id', userController.getUser)

module.exports = router 