const Router = require('express')
const router = new Router()
const user_stackController = require('../controllers/user_stackController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('teamlead'), user_stackController.create)
router.patch('/:id_user/:id_stack', checkRole('teamlead'), user_stackController.update)
router.get('/:id_user', user_stackController.getAll)
router.get('/:id_user/:id_stack', user_stackController.getOne)

module.exports = router 