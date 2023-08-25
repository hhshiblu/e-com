const express = require("express");

const { isAuthenticated, isAdmin } = require("../Middleware/auth");

const upload = require("../src/multer");
const { createupEvent, getAllupEvents, DeleteupEvent } = require("../controlar/upComingEvent");
const router = express.Router();

router.post("/create-upEvent", upload.single("file"), createupEvent);

router.get("/get-all-upEvent", getAllupEvents);

router.delete("/delete-upEvent/:id", DeleteupEvent);


// router.get(
//   "/admin-all-products",
//   isAuthenticated,
  // isAdmin("Admin"),
//   adminAllProduct
// );

module.exports = router;
