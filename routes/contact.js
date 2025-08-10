const router = require("express").Router()
const controller = require("../controllers/contact")
const middleware = require("../middlewares")
router.post(
  "/new",
  middleware.stripToken,
  middleware.verifyToken,
  controller.createContact_post
)
router.get(
  "/",
  middleware.stripToken,
  middleware.verifyToken,
  controller.get_all_Contacts_get
)
router.put(
  "/:contactId",
  middleware.stripToken,
  middleware.verifyToken,
  controller.get_Contact_put
)
router.delete(
  "/:contactId",
  middleware.stripToken,
  middleware.verifyToken,
  controller.get_Contact_delete
)

module.exports = router
