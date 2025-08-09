const router = require('express').Router()
const middleware = require('../middlewares')
const commentController = require('../controllers/comment')

router.post(
  '/new',
  middleware.stripToken,
  middleware.verifyToken,
  commentController.createComment
)

router.put(
  '/update/:commentId',
  middleware.stripToken,
  middleware.verifyToken,
  commentController.updateComment
)

router.delete(
  '/delete/:commentId',
  middleware.stripToken,
  middleware.verifyToken,
  commentController.deleteComment
)

module.exports = router
