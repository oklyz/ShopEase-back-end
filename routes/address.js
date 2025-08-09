const router = require('express').Router()
const middleware = require('../middlewares')
const addressController = require('../controllers/address')

router.post(
  '/new',
  middleware.stripToken,
  middleware.verifyToken,
  addressController.createAddress
)

router.put(
  '/update/:addressId',
  middleware.stripToken,
  middleware.verifyToken,
  addressController.UpdateAddress
)

router.delete(
  '/delete/:addressId',
  middleware.stripToken,
  middleware.verifyToken,
  addressController.DeleteAddress
)

module.exports = router
