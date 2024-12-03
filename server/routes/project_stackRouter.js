const Router = require('express')
const router = new Router()
const project_stackController = require('../controllers/project_stackController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('teamlead'), project_stackController.create)
router.get('/:id_project', project_stackController.getAll)

module.exports = router 