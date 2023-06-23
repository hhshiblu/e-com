const express = require("express");
const {
  CreateNewOrder,
  getAllOrderUser,
  getOderSeller,
  UpdateOrder,
  UserOrderRefund,
  SellerAcceptRefund,
} = require("../controlar/order");
const router = express.Router();
const { isSeller } = require("../Middleware/auth");
router.post("/create-order", CreateNewOrder);
router.get("/get-all-orders/:userId", getAllOrderUser);
router.get("/get-seller-all-orders/:sellerId", getOderSeller);
router.put("/update-order-status/:id", isSeller, UpdateOrder);
router.put("/order-refund/:id", UserOrderRefund);
router.put("/order-refund-success/:id", isSeller, SellerAcceptRefund);
module.exports = router;
