const express = require("express");
const CatchAsyncError = require("../Middleware/CatchAsyncError");
const CouponCode = require("../Modal/couponCode");
const Errorhandeler = require("../utils/Errorhandeler");

// create coupoun code
const CreatCoupon = CatchAsyncError(async (req, res, next) => {
  try {
    const isCoupounCodeExists = await CouponCode.find({
      name: req.body.name,
    });

    if (isCoupounCodeExists.length !== 0) {
      return next(new Errorhandeler("Coupoun code already exists!", 400));
    }

    const coupounCode = await CouponCode.create(req.body);

    res.status(201).json({
      success: true,
      coupounCode,
    });
  } catch (error) {
    return next(new Errorhandeler(error, 400));
  }
});

// get all coupons of a shop
const getAllCoupon = CatchAsyncError(async (req, res, next) => {
  try {
    const couponCodes = await CouponCode.find({ sellerId: req.seller.id });
    res.status(201).json({
      success: true,
      couponCodes,
    });
  } catch (error) {
    return next(new Errorhandeler(error, 400));
  }
});

// delete coupoun code of a shop
const DeleteCoupon = CatchAsyncError(async (req, res, next) => {
  try {
    const couponCode = await CouponCode.findByIdAndDelete(req.params.id);

    if (!couponCode) {
      return next(new Errorhandeler("Coupon code dosen't exists!", 400));
    }
    res.status(201).json({
      success: true,
      message: "Coupon code deleted successfully!",
    });
  } catch (error) {
    return next(new Errorhandeler(error, 400));
  }
});

// get coupon code value by its name
const getCouponByName = CatchAsyncError(async (req, res, next) => {
  try {
    const couponCode = await CouponCode.findOne({ name: req.params.name });

    res.status(200).json({
      success: true,
      couponCode,
    });
  } catch (error) {
    return next(new Errorhandeler(error, 400));
  }
});

module.exports = { CreatCoupon, getAllCoupon, DeleteCoupon, getCouponByName };
