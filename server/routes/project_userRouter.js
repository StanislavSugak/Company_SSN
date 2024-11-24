const Router = require('express')
const router = new Router()
const project_userController = require('../controllers/project_userController')

router.post('/', project_userController.create)
router.get('/:id_project', project_userController.getAll)

module.exports = router 