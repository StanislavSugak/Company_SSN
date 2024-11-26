const Router = require('express')
const router = new Router()
const user_learn_historyController = require('../controllers/user_learn_historyController')

router.post('/', user_learn_historyController.create)
router.get('/:id_learn', user_learn_historyController.getAll)

module.exports = router 