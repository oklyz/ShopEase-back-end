const router = require("express").Router()
const controller = require("../controllers/auth")
const middleware = require("../middlewares")
router.post("/login", controller.Login)
router.post("/register", controller.Register)
router.get(
  "/session",
  middleware.stripToken,
  middleware.verifyToken,
  controller.CheckSession
)
router.get(
  "/:id",
  middleware.stripToken,
  middleware.verifyToken,
  controller.user_info_get
)
router.put(
  "/update/:id",
  middleware.stripToken,
  middleware.verifyToken,
  controller.user_update_put
)


module.exports = router
