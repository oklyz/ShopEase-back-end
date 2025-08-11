const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true
    },
    paymentMethod: {
      type: String,
      required: true
    },
    quantityOrder: {
      type: Number,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    items: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item"
    }
  },
  {
    timestamps: true
  }
)

const Order = mongoose.model("Order", orderSchema)

module.exports = Order