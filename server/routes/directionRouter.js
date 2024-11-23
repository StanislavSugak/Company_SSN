const Router = require('express')
const router = new Router()
const directionController = require('../controllers/directionController')

router.post('/', directionController.create)
router.get('/', directionController.getAllDirection)


module.exports = router 