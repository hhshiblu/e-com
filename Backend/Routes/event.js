const express = require("express");
const upload = require("../src/multer");
const { isSeller, isAuthenticated } = require("../middleware/auth");
const {
  createEvent,
  getAllEvents,
  DeleteEvent,
} = require("../controlar/event");

const router = express.Router();

router.post("/create-event", upload.array("images"), createEvent);

// router.get("/get-all-products-shop/:id", createEvent);
router.get("/get-all-events/:id", getAllEvents);
router.delete("/delete-shop-event/:id", DeleteEvent);
// router.get("/get-all-products", getAllProducts);

// router.put("/create-new-review", isAuthenticated, reviewProduct);

// router.get(
//   "/admin-all-products",
//   isAuthenticated,
//   isAdmin("Admin"),
//   adminAllProduct
// );
// router.get("/logout", isAuthenticated, userLogOut);

module.exports = router;
