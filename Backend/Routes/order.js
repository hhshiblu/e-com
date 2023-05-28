const express = require("express");
const { CreateNewOrder } = require("../controlar/order");
const router = express.Router();

router.post(
    "/create-order",CreateNewOrder)



 
module.exports= router;