const router = require("express").Router()
const middleware = require("../middlewares/index")
const iteamContorller = require("../controllers/item")

router.post(
  "/new",
  middleware.stripToken,
  middleware.verifyToken,
  iteamContorller.CreateItems
)

router.get("/", iteamContorller.GetItems)

router.put("/update/:itemId", 
  middleware.stripToken,
  middleware.verifyToken,
  iteamContorller.UpdateItem
)

router.delete("/delete/:itemId",
  middleware.stripToken,
  middleware.verifyToken,
  iteamContorller.DeleteItem
)

module.exports = router
