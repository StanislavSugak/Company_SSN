const Router = require('express')
const router = new Router()
const user_personalController = require('../controllers/user_personalController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', user_personalController.create)
router.patch('/:id', user_personalController.update)
router.get('/', user_personalController.getAll)
router.get('/:id', user_personalController.getOne)

module.exports = router 