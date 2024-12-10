const Router = require('express')
const router = new Router()
const projectController = require('../controllers/projectController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', projectController.create)
router.get('/:id', projectController.getOne)
router.get('/', projectController.getAll)

module.exports = router 