const express = require("express");


const { CreateWithdraw } = require("../controlar/withdraw");
const { isSeller } = require("../Middleware/auth");
const router = express.Router();

router.post("/create-withdraw-request", isSeller, CreateWithdraw);
module.exports = router; 
 