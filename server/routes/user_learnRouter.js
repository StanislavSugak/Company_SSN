const Router = require('express')
const router = new Router()
const user_learnController = require('../controllers/user_learnController')

router.post('/', user_learnController.create)
router.delete('/', user_learnController.delete)
router.get('/:id_user', user_learnController.getAll)
router.get('/:id_user/:id_stack', user_learnController.getOne)

module.exports = router 