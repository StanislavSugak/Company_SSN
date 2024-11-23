const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const {body} = require('express-validator')
const authMiddleware = require('../middleware/authMiddleware') //второй параметр


router.post('/registration', body('password').isLength({min: 2, max: 32}), userController.registration)
router.post('/login')
router.post('/logout')
router.get('/')
router.get('/:id')
router.delete('/')

module.exports = router 