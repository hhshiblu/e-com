const express = require("express");
const router = express.Router();

const { isAuthenticated } = require("../Middleware/auth");
const { addToCart } = require("../controlar/cart");

router.post("/add-to-cart",isAuthenticated, addToCart);


module.exports = router;
