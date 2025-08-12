const router = require('express').Router()
const multer = require('../config/multer')
const controller = require('../controllers/auth')
const middleware = require('../middlewares')
router.post('/login', controller.Login)
router.post('/register', controller.Register)

router.get(
  '/session',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CheckSession
)

router.get(
  '/:id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.user_info_get
)
router.put(
  '/:id',
  middleware.stripToken,
  middleware.verifyToken,
  multer.single('image'),
  controller.user_update_put
)

module.exports = router
