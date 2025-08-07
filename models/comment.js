const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true
    },
    rate: {
      type: Number,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    item: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    }
  }
)

const Comment = mongoose.model("Comment", commentSchema)

module.exports = Comment