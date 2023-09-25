const express = require("express");
const {
  createCategory,
  getCategory,
  addCategory,
  getCategories,
  updateCategories,
  deleteCategories,
} = require("../controlar/category");   
const router = express.Router();
const upload = require("../src/multer");

router.post("/create", upload.single("file"), addCategory);
router.get("/get-all-category", getCategories);
router.post("/update", updateCategories);
router.post("/delete", deleteCategories);
module.exports = router;
