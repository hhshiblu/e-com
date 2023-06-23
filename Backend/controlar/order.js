const express = require("express");

const Seller = require("../Modal/seller");
const Product = require("../Modal/product");

const Order = require("../Modal/order");

const CatchAsyncError = require("../Middleware/CatchAsyncError");
const Errorhandeler = require("../utils/Errorhandeler");

// create new order
const CreateNewOrder = CatchAsyncError(async (req, res, next) => {
  try {
    const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;

    //   group cart items by shopId
    const shopItemsMap = new Map();

    for (const item of cart) {
      const sellerId = item.sellerId;
      if (!shopItemsMap.has(sellerId)) {
        shopItemsMap.set(sellerId, []);
      }
      shopItemsMap.get(sellerId).push(item);
    }

    // create an order for each shop
    const orders = [];

    for (const [sellerId, items] of shopItemsMap) {
      const order = await Order.create({
        cart: items,
        shippingAddress,
        user,
        totalPrice,
        paymentInfo,
      });
      orders.push(order);
    }

    res.status(201).json({
      success: true,
      orders,
    });
  } catch (error) {
    return next(new Errorhandeler(error.message, 500));
  }
});

// get all orders of user
const getAllOrderUser = CatchAsyncError(async (req, res, next) => {
  try {
    const orders = await Order.find({ "user._id": req.params.userId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    return next(new Errorhandeler(error.message, 500));
  }
});
// get all orders of seller
const getOderSeller = CatchAsyncError(async (req, res, next) => {
  try {
    const orders = await Order.find({
      "cart.sellerId": req.params.sellerId,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    return next(new Errorhandeler(error.message, 500));
  }
});

// update order status for seller
const UpdateOrder = CatchAsyncError(async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new Errorhandeler("Order not found with this id", 400));
    }
    if (req.body.status === "Transferred to delivery partner") {
   
    }

    

    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
      order.paymentInfo.status = "Succeeded";
      const serviceCharge = order.totalPrice * 0.1;
      order.cart.forEach(async (o) => {
        await updateOrder(o._id, o.qty);
      });
      await updateSellerInfo(order.totalPrice - serviceCharge);
    }
    order.status = req.body.status;

    await order.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      order,
    });

    async function updateOrder(id, qty) {
      const product = await Product.findById(id);

      product.stock -= qty;
      product.sold_out += qty;

      await product.save({ validateBeforeSave: false });
    }

    async function updateSellerInfo(amount) {
      const seller = await Seller.findById(req.seller.id);

      seller.availableBalance = amount;

      await seller.save();
    }
  } catch (error) {
    return next(new Errorhandeler(error.message, 500));
  }
});

// give a refund ----- user
const UserOrderRefund=
  CatchAsyncError(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return next(new Errorhandeler("Order not found with this id", 400));
      }

      order.status = req.body.status;

      await order.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
        order,
        message: "Order Refund Request successfully!",
      });
    } catch (error) {
      return next(new Errorhandeler(error.message, 500));
    }
  })


// accept the refund ---- seller
const SellerAcceptRefund=
  CatchAsyncError(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return next(new Errorhandeler("Order not found with this id", 400));
      }

      order.status = req.body.status;

      await order.save();

      res.status(200).json({
        success: true,
        message: "Order Refund successfull!",
      });

      if (req.body.status === "Refund Success") {
        order.cart.forEach(async (o) => {
          await updateOrder(o._id, o.qty);
        });
      }

      async function updateOrder(id, qty) {
        const product = await Product.findById(id);

        product.stock += qty;
        product.sold_out -= qty;

        await product.save({ validateBeforeSave: false });
      }
    } catch (error) {
      return next(new Errorhandeler(error.message, 500));
    }
  })


// all orders --- for admin
// router.get(
//   "/admin-all-orders",
//   isAuthenticated,
//   isAdmin("Admin"),
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const orders = await Order.find().sort({
//         deliveredAt: -1,
//         createdAt: -1,
//       });
//       res.status(201).json({
//         success: true,
//         orders,
//       });
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   })
// );

module.exports = {
  CreateNewOrder,
  getAllOrderUser,
  getOderSeller,
  UpdateOrder,
  UserOrderRefund,
  SellerAcceptRefund
};
