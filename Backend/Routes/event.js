const express = require("express");
const upload = require("../src/multer");
const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");
const {
  createEvent,
  getAllEvents,
  DeleteEvent,
  getAllShopEvents,
  getAllEvent,
  adminAllEvent,
} = require("../controlar/event");

const router = express.Router();

router.post("/create-event", upload.array("images"), createEvent);


router.get("/get-all-events/:id", getAllShopEvents);
router.delete("/delete-shop-event/:id", DeleteEvent);
router.get("/get-all-events",getAllEvent)

router.get(
  "/admin-all-events",
  isAuthenticated,
  // isAdmin("Admin"),
  adminAllEvent)

module.exports = router;
