const Comment = require('../models/comment')
const Item = require('../models/item')

const createComment = async (req, res) => {
  try {
    const comment = await Comment.create({ ...req.body })

    await Item.findByIdAndUpdate(comment.itemId, {
      $push: { comments: comment }
    })
    res.status(200).send({ status: 'Comment created!', comment })
  } catch (error) {
    console.log(error)
    res.status(401).send({
      status: 'Error',
      msg: 'an Error has ocurred while creating comment',
      error: error.message
    })
  }
}

const updateComment = async (req, res) => {
  try {
    const { description, rate, userId } = req.body

    const comment = await Comment.findById(req.params.commentId)

    if (userId === comment.userId) {
      const comment = await Comment.findByIdAndUpdate(
        req.params.commentId,
        { description, rate },
        { new: true }
      )
      res.status(200).send({ status: 'Comment updated successfully', comment })
    }
    res.status(401).send("You don't have the priviliges to edit this comment")
  } catch (error) {
    res.status(401).send({
      status: 'Error',
      msg: 'an Error has ocurred while Updating comment',
      error: error.message
    })
  }
}

const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId)

    if (res.locals.payload.userId === comment.userId) {
      await Comment.findByIdAndDelete(req.params.commentId)
      res.status(200).send('comment delete!')
    }
    res.status(401).send("You don't have the priviliges to delete this comment")
  } catch (error) {
    res.status(401).send({
      status: 'Error',
      msg: 'an Error has ocurred while deleting comment',
      error: error.message
    })
  }
}

module.exports = {
  createComment,
  updateComment,
  deleteComment
}
