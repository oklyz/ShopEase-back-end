const router = require('express').Router()
const controller = require('../controllers/auth')
const middleware = require('../middlewares')
router.post('/login', controller.Login)
router.post('/register', controller.Register)
router.get('/:id', controller.user_info_get)
router.put('/:id', controller.user_update_put)

module.exports = router
