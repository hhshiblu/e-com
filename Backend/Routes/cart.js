const express = require("express");
const router = express.Router();

const { isAuthenticated } = require("../Middleware/auth");
const { addToCart, getCart } = require("../controlar/cart");

router.post("/add-to-cart",isAuthenticated, addToCart);
router.get("/getCart", isAuthenticated,getCart)
 
module.exports = router;
