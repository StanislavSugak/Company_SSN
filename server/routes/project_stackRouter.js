const Router = require('express')
const router = new Router()
const project_stackController = require('../controllers/project_stackController')

router.post('/', project_stackController.create)
router.get('/:id_project', project_stackController.getAll)

module.exports = router 