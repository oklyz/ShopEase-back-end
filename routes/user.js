const router = require('express').Router()
const controller = require('../controllers/user')

router.get('/:id', controller.user_info_get)

module.exports = router
