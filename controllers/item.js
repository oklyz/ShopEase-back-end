const Item = require("../models/item")
const middleware = require("../middlewares/index")
const { findOne } = require("../models/address")

const CreateItems = async (req, res) => {
  try {
    
    if (res.locals.payload.role === "admin") {
      const item = await Item.create({...req.body})
      return res.status(200).send({ status: "Item created Successfully", item })
    }
    res.status(401).send("You can't create item you have to be admin")
  } catch (error) {
    console.log(error)
    res.status(400).send("An error has occured while create Item")
  }
}

const GetItems = async (req, res) => {
  try {
    
    const items = await Item.find({})
    res.status(200).send(items)
  } catch (error) {
    console.log(error)
    res.status(400).send("An error has occured while getting items")
  }
}

const GetOneItem = async (req, res) => {
  try {
    
    const item = await Item.findById(req.params.itemId)
    res.status(200).send(item)
  } catch (error) {
    console.log(error)
    res.status(400).send("An error has occured while getting specific item")
  }
}

const UpdateItem = async (req, res) => {
  try {
    
    if (res.locals.payload.role === "admin") {
      const item = await Item.findByIdAndUpdate(req.params.itemId, {...req.body}, {new: true})
      return res.status(200).send({ status: "Item Update!", item})
    }
    res.status(401).send("You can't Update item you have to be admin")
  } catch (error) {
    console.log(error)
    res.status(400).send("An error has occured while Updating Item")
  }
}

const DeleteItem = async (req, res) => {
  try {
    
    if(res.locals.payload.role === "admin") {
      await Item.findByIdAndDelete(req.params.itemId)
      res.status(200).send("Item delete!")
    }
    
    res.status(401).send("You can't delete item you have to be admin")
  } catch (error) {
    console.log(error)
    res.status(400).send("An error has occured while Deleting Item")
  }
}

module.exports = {
  CreateItems,
  UpdateItem,
  DeleteItem,
  GetItems,
  GetOneItem
}