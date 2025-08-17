const Address = require('../models/address')
const middleware = require('../middlewares/index')
const User = require('../models/user')

const createAddress = async (req, res) => {
  try {
    const { country, city, block, street, building, phone, userId } = req.body

    if (res.locals.payload.id === userId) {
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
      res.status(201).send('Address Created!')
    }
    res.status(400).send('faild to create address')
  } catch (error) {
    res.status(400).send({
      status: 'Error',
      msg: 'An error has occurred when create address!',
      error: error.message
    })
  }
}

const UpdateAddress = async (req, res) => {
  try {
    const address = await Address.findById(req.params.addressId)
    if (!address) {
      return res
        .status(404)
        .send({ status: 'Error', msg: 'Address not found!' })
    }
    if (address.userId !== res.locals.payload.id) {
      return res.status(401).send('Unauthorized')
    }

    const UpdateAddress = await Address.findByIdAndUpdate(
      req.params.addressId,
      req.body,
      { new: true }
    )

    return res
      .status(200)
      .send({ status: 'User address info Updated!', UpdateAddress })
  } catch (error) {
    res.status(401).send({
      status: 'Error',
      msg: 'An error has occurred when updata address!',
      error: error.message
    })
  }
}

const DeleteAddress = async (req, res) => {
  try {
    const address = await Address.findById(req.params.addressId)
    if (!address) {
      return res
        .status(404)
        .send({ status: 'Error', msg: 'Address not found!' })
    }
    if (address.userId !== res.locals.payload.id) {
      return res
        .status(403)
        .send("You don't have the privilieges to delete address")
    }
    await Address.findByIdAndDelete(req.params.addressId)
    res.status(200).send('Address Delete!')
  } catch (error) {
    res.status(401).send({
      status: 'Error',
      msg: 'An error has occurred!',
      error: error.message
    })
  }
}

module.exports = {
  createAddress,
  UpdateAddress,
  DeleteAddress
}
