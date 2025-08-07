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
  },
  {
    timestamps: true
  }
)

const Order = mongoose.model("Order", orderSchema)

module.exports = Order