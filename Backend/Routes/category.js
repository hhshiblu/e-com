const express = require("express");
const { createCategory, getCategory } = require("../controlar/category");
const router = express.Router();



router.post("/create", createCategory);
router.get("/get-all-category",getCategory)
 
module.exports = router;
