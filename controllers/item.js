const Item = require('../models/item')

const CreateItems = async (req, res) => {
  try {
    if (res.locals.payload.role === 'admin') {
      req.body.image = req.file.filename
      const item = await Item.create(req.body)
      return res.status(201).send({ status: 'Item created Successfully', item })
    }
    res.status(401).send("You don't have the privileges to create item")
  } catch (error) {

    res.status(400).send({
      status: 'Error',
      msg: 'An error has occured while create Item',
      error: error.message
    })
  }
}

const GetItems = async (req, res) => {
  try {
    const items = await Item.find({})
    res.status(200).send(items)
  } catch (error) {
    res.status(401).send({
      status: 'Error',
      msg: 'An error has occured while getting items',
      error: error.message
    })
  }
}

const GetOneItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.itemId).populate('comments')
    res.status(200).send(item)
  } catch (error) {
    res.status(401).send({
      status: 'Error',
      msg: 'An error has occured while getting specific item',
      error: error.message
    })
  }
}

const UpdateItem = async (req, res) => {
  try {
    if (res.locals.payload.role === 'admin') {
      req.body.image=req.file.filename
      const item = await Item.findByIdAndUpdate(
        req.params.itemId,
        { ...req.body },
        { new: true }
      )
      return res.status(200).send({ status: 'Item Update!', item })
    }
    res.status(401).send("You can't Update item you have to be admin")
  } catch (error) {
    res.status(400).send({
      status: 'Error',
      msg: 'An error has occured while Updating Item',
      error: error.message
    })
  }
}

const DeleteItem = async (req, res) => {
  try {
    if (res.locals.payload.role === 'admin') {
      await Item.findByIdAndDelete(req.params.itemId)
      res.status(200).send('Item delete!')
    }
    res.status(401).send("You can't delete item you have to be admin")
  } catch (error) {
    res.status(400).send({
      status: 'Error',
      msg: 'An error has occured while Deleting Item',
      error: error.message
    })
  }
}

module.exports = {
  CreateItems,
  UpdateItem,
  DeleteItem,
  GetItems,
  GetOneItem
}
