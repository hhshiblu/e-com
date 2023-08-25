const express = require("express");
const { createCategory, getCategory } = require("../controlar/category");
const router = express.Router();
const upload = require("../src/multer");


router.post("/create", upload.single("file"), createCategory);
router.get("/get-all-category",getCategory)
 
module.exports = router;
