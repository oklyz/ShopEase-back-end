const router = require('express').Router()
const middleware = require('../middlewares')
const iteamContorller = require('../controllers/item')
const multer = require('../config/multer')
router.post(
  '/',
  middleware.stripToken,
  middleware.verifyToken,
  multer.single('image'),
  iteamContorller.CreateItems
)

router.get('/', iteamContorller.GetItems)
router.get('/:itemId', iteamContorller.GetOneItem)

router.put(
  '/:itemId',
  middleware.stripToken,
  middleware.verifyToken,
  multer.single('image'),
  iteamContorller.UpdateItem
)

router.delete(
  '/:itemId',
  middleware.stripToken,
  middleware.verifyToken,
  iteamContorller.DeleteItem
)

module.exports = router
