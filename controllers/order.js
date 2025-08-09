const Order = require('../models/order')
const middleware = require('../middlewares')

const create_order_post = async (req, res) => {
  try {
    const { userId, itemIds, payment_method, quantity_ordered } = req.body
    // Create the order
    const order = await Order.create({
      date: new Date(), // Current date/time
      payment_method,
      quantity_ordered,
      user: userId, // Reference to user
      items: itemIds // Array of references to items
    })

    res.status(201).send({
      status: 'Order created successfully!',
      order
    })
  } catch (error) {
    console.log(error)
    res.status(401).send({
      status: 'Error',
      msg: 'an Error has ocurred while creating order',
      error: error.message
    })
  }
}

module.exports = {
  create_order_post
}
