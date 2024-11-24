const Router = require('express')
const router = new Router()
const user_stackController = require('../controllers/user_stackController')

router.post('/', user_stackController.create)
router.patch('/:id_user/:id_stack', user_stackController.update)
router.get('/:id_user', user_stackController.getAll)
router.get('/:id_user/:id_stack', user_stackController.getOne)

module.exports = router 