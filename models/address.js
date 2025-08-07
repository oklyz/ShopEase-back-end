const mongoose = require("mongoose")

const addressSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    block: {
      type: String,
      required: true
    },
    street: {
      type: String,
      required: true
    },
    building: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
)

const Address = mongoose.model("Address", addressSchema)

module.exports = Address