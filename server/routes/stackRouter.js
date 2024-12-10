const Router = require('express')
const router = new Router()
const stackController = require('../controllers/stackController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', stackController.create)
router.get('/', stackController.getAll)
router.get('/:id', stackController.getOne)

module.exports = router 