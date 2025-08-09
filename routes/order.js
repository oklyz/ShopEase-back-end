const router = require('express').Router()
const controller = require('../controllers/order')

router.post('/', controller.create_order_post)
router.get('/:orderid', controller)
module.exports = router
