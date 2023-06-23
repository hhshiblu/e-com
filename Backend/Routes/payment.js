const express = require("express");
const router = express.Router();
 
const { payment, getPayment } = require("../controlar/payment");

router.post("/process", payment);
router.get("/stripeapikey", getPayment);

module.exports = router;
