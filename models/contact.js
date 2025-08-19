const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    order: {
      type: String,
      required: true
    },
    userId: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

const Contact = mongoose.model('Contact', contactSchema)

module.exports = Contact
