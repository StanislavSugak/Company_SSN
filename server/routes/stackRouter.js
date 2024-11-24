const Router = require('express')
const router = new Router()
const stackController = require('../controllers/stackController')

router.post('/', stackController.create)
router.get('/', stackController.getAll)
router.get('/:id', stackController.getOne)

module.exports = router 