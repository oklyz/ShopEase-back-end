const Address = require('../models/address')
const middleware = require('../middlewares/index')
const User = require('../models/user')

const createAddress = async (req, res) => {
  const { country, city, block, street, building, phone, userId } = req.body

  const address = await Address.create({
    country,
    city,
    block,
    street,
    building,
    phone,
    userId
  })

  await User.findByIdAndUpdate(address.userId, {
    $push: { addresses: address }
  })

  res.status(200).send(address)
}

const UpdateAddress = async (req, res) => {
  const address = await Address.findById(req.params.addressId)
  if (address.userId !== res.locals.payload.id) {
    return res.status(401).send('Unauthorized')
  }

  const UpdateAddress = await Address.findByIdAndUpdate(
    req.params.addressId,
    { ...req.body },
    { new: true }
  )

  res.status(200).send({ status: 'User address info Updated!', UpdateAddress })
}

const DeleteAddress = async (req, res) => {
  const address = await Address.findById(req.params.addressId)
  console.log(address.userId)
  console.log(res.locals.payload.id)
  if (address.userId !== res.locals.payload.id) {
    return res
      .status(401)
      .send("You don't have the privilieges to delete address")
  }
  await Address.findByIdAndDelete(req.params.addressId)
  res.status(200).send('Address Delete!')
}

module.exports = {
  createAddress,
  UpdateAddress,
  DeleteAddress
}
