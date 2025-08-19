const router = require('express').Router()
const middleware = require('../middlewares')
const addressController = require('../controllers/address')

router.post(
  '/',
  middleware.stripToken,
  middleware.verifyToken,
  addressController.createAddress
)

router.put(
  '/:addressId',
  middleware.stripToken,
  middleware.verifyToken,
  addressController.UpdateAddress
)

router.delete(
  '/:addressId',
  middleware.stripToken,
  middleware.verifyToken,
  addressController.DeleteAddress
)

module.exports = router
