const Router = require('express')
const router = new Router()
const user_learn_historyController = require('../controllers/user_learn_historyController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('teamlead'), user_learn_historyController.create)
router.get('/:id_learn', user_learn_historyController.getAll)

module.exports = router 