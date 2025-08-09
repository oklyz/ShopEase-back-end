const Contact = require('../models/contact')

const createContact_post = async (req, res) => {
  try {
    const contact = await Contact.create(req.body)
    res.send(contact)
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
    const contacts = await Contact.find()
    res.send(contacts)
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
    const contact = await Contact.findByIdAndUpdate(req.params.contactId)
    res.send(contact)
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
    const contact = await Contact.findByIdAndDelete(req.params.contactId)
    res.send(contact)
  } catch (error) {
    res.status(401).send({
      status: 'Error',
      msg: 'An error has occurred when delete  contact by ID!',
      error: error.message
    })
  }
}

module.exports = {
  createContact_post,
  get_all_Contacts_get,
  get_Contact_put,
  get_Contact_delete
}
