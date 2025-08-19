const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema(
  {},
  {
    timestamps: true
  }
)

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart
