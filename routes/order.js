const router = require('express').Router()
const controller = require('../controllers/order')

router.post('/', controller.create_order_post)
router.get('/:orderid', controller.get_order_byID_post)
module.exports = router
