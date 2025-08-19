const router = require('express').Router()
const middleware = require('../middlewares')
const commentController = require('../controllers/comment')

router.post(
  '/',
  middleware.stripToken,
  middleware.verifyToken,
  commentController.createComment
)

router.put(
  '/:commentId',
  middleware.stripToken,
  middleware.verifyToken,
  commentController.updateComment
)

router.delete(
  '/:commentId',
  middleware.stripToken,
  middleware.verifyToken,
  commentController.deleteComment
)

module.exports = router
