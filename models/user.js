const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    passwordDegist: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["customer", "admin"]
    },
    addresses: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    }]
  },
  {
    timestamps: true
  }
)

const User = mongoose.model("User", userSchema)

module.exports = User