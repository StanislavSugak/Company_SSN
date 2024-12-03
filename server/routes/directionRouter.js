const Router = require('express')
const router = new Router()
const directionController = require('../controllers/directionController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('teamlead'), directionController.create)
router.get('/', directionController.getAll)
router.get('/:id', directionController.getOne)

module.exports = router 