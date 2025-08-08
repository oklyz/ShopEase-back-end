const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true
    },
    rate: {
      type: Number,
      min: 0,
      max: 5,
      required: true
    },
    userId: {
      type: String,
      required: true
    },
    itemId: {
      type: String,
      required: true
    }
  }
)

const Comment = mongoose.model("Comment", commentSchema)

module.exports = Comment