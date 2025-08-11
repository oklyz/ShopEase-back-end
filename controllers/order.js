const Order = require('../models/order')
const Item = require('../models/item')

const create_order_post = async (req, res) => {
  try {
    const { userId, itemIds, paymentMethod, quantityOrder } = req.body
    // Create the order
    if (res.locals.payload.id === userId) {
      const order = await Order.create({
        date: new Date(), // Current date/time
        paymentMethod,
        quantityOrder,
        user: userId, // Reference to user
        items: itemIds // Array of references to items
      })

      const oldItem = await Item.findById(itemIds)

      oldItem.quantity -= quantityOrder

      oldItem.numberOfSold += quantityOrder
      await oldItem.save()
      res.status(201).send({
        status: 'Order created successfully!',
        order
      })
    }
    res.status(400).send(`you don't have permission to order`)
  } catch (error) {
    console.log(error)
    res.status(401).send({
      status: 'Error',
      msg: 'an Error has ocurred while creating order',
      error: error.message
    })
  }
}

const get_order_byID_post = async (req, res) => {
  try {
    const orderInfo = await Order.findById(req.params.orderid)
      .populate('user', 'name email')
      .populate('items', 'name price')

    if (!orderInfo) {
      return res.status(404).send({
        status: 'Error',
        msg: 'Order not found'
      })
    }

    res.status(200).send({
      status: 'Order find successfully!',
      orderInfo
    })
  } catch (error) {
    console.log(error)
    res.status(400).send({
      status: 'Error',
      msg: 'an Error has ocurred while finding order',
      error: error.message
    })
  }
}

const get_orders_by_userId_get = async (req, res) => {
  try {
    const { userId } = req.params

    // Find all orders where `user` field matches `userId`
    let orders = await Order.find({ user: userId })
      .populate('user', 'name email')
      .populate('items', 'name price quantityOrder')

    if (!orders.length) {
      return res.status(404).send({ error: 'No orders found for this user' })
    }

    res.status(200).send({
      status: 'Success',
      orders
    })
  } catch (error) {
    res.status(500).send({
      status: 'Error',
      message: 'Failed to fetch orders',
      error: error.message
    })
  }
}

module.exports = {
  create_order_post,
  get_order_byID_post,
  get_orders_by_userId_get
}
