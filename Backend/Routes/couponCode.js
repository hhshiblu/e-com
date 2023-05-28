const express = require("express");
const router = express.Router();



const {
  CreatCoupon,
  getAllCoupon,
  DeleteCoupon,
  getCouponByName,
} = require("../controlar/coponCode");
const { isSeller } = require("../middleware/auth");

router.post("/create-coupon-code", isSeller, CreatCoupon);

router.get("/get-coupon/:id", isSeller, getAllCoupon);

router.delete("/delete-coupon/:id", isSeller, DeleteCoupon);

router.get("/get-coupon-value/:name", getCouponByName);

module.exports = router;
