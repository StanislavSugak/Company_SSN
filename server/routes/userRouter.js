const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const {body} = require('express-validator')
const authMiddleware = require('../middleware/authMiddleware') //второй параметр
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/registration', checkRole('teamlead'), body('password').isLength({min: 2, max: 32}), userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/refresh', userController.refresh)
router.get('/', checkRole('teamlead'), userController.getAll)
router.get('/:id', userController.getOne)

module.exports = router 