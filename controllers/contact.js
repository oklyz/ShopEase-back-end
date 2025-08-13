const Contact = require('../models/contact')

const createContact_post = async (req, res) => {
  try {
    if (res.locals.payload.id === req.body.userId) {
      const contact = await Contact.create(req.body)
      res.status(201).send({ status: 'issue Created successfully', contact })
    }
    res.status(400).send('faild to create issue')
  } catch (error) {
    res.status(401).send({
      status: 'Error',
      msg: 'An error has occurred when create contact!',
      error: error.message
    })
  }
}

const get_all_Contacts_get = async (req, res) => {
  try {
    if (res.locals.payload.role === 'admin') {
      const contacts = await Contact.find()
      res.send(contacts)
    }
    res.status(400).send('faild to Update issue')
  } catch (error) {
    res.status(401).send({
      status: 'Error',
      msg: 'An error has occurred when get all contacts!',
      error: error.message
    })
  }
}
const get_Contact_put = async (req, res) => {
  try {
    if (res.locals.payload.role === 'admin') {
      const contact = await Contact.findByIdAndUpdate(req.params.contactId)
      res.status(200).send({ status: 'issue Update Successfully', contact })
    }
    res.status(400)
  } catch (error) {
    res.status(401).send({
      status: 'Error',
      msg: 'An error has occurred when get  contact by ID!',
      error: error.message
    })
  }
}
const get_Contact_delete = async (req, res) => {
  try {
    if (res.locals.payload.role === 'admin') {
      const contact = await Contact.findByIdAndDelete(req.params.contactId)
      res.status(200).send({ status: 'issue delete!', contact })
    }
  } catch (error) {
    res.status(401).send({
      status: 'Error',
      msg: 'An error has occurred when delete  contact by ID!',
      error: error.message
    })
  }
}

const countAllIssues = async (req, res) => {
  try {
    if (res.locals.payload.role === 'admin') {
      const countIssues = await Contact.countDocuments({})
      res.send(countIssues)
    }
    res.status(400).send('faild to count issues')
  } catch (error) {
    res.status(401).send({
      status: 'Error',
      msg: 'An error has occurred when get all contacts!',
      error: error.message
    })
  }
}

module.exports = {
  createContact_post,
  get_all_Contacts_get,
  get_Contact_put,
  get_Contact_delete,
  countAllIssues
}
