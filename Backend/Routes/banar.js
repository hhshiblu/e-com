const express = require("express");

const { isAuthenticated, isAdmin } = require("../Middleware/auth");
const {
  createBanar,
  getAllBanars,
  DeleteBanar,
  upDateBanarRole,
} = require("../controlar/banar");
const upload = require("../src/multer");
const router = express.Router();

router.post("/create-banar", upload.single("file"), createBanar);

router.get("/get-all-banar", getAllBanars);

router.delete("/delete-banar/:id", DeleteBanar);
router.put("/update-banner-role/:id", upDateBanarRole);

// router.get(
//   "/admin-all-products",
//   isAuthenticated,
//   // isAdmin("Admin"),
//   adminAllProduct
// );

module.exports = router;
