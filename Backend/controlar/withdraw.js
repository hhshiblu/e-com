const express = require("express");
const Withdraw = require("../Modal/withdraw");
const CatchAsyncError = require("../Middleware/CatchAsyncError");
const sendMail = require("../utils/EmailSander");
const Errorhandeler = require("../utils/Errorhandeler");
const Seller =require("../Modal/seller")

// create withdraw request --- only for seller
const CreateWithdraw=
  CatchAsyncError(async (req, res, next) => {
    try {
      const { amount } = req.body;

      const data = {
        seller: req.seller,
        amount,
      };

      try {
        await sendMail({
          email: req.seller.email,
          subject: "Withdraw Request",
          message: `Hello ${req.seller.name}, Your withdraw request of ${amount}$ is processing. It will take 3days to 7days to processing! `,
        });
        res.status(201).json({
          success: true,
        });
      } catch (error) {
        return next(new Errorhandeler(error.message, 500));
      }

      const withdraw = await Withdraw.create(data);

      const seller = await Seller.findById(req.seller._id);

      seller.availableBalance = seller.availableBalance - amount;

      await seller.save();

      res.status(201).json({
        success: true,
        withdraw,
      });
    } catch (error) {
      return next(new Errorhandeler(error.message, 500));
    }
  });

// get all withdraws --- admnin

const getAllWithdrawal=

  CatchAsyncError(async (req, res, next) => {
    try {
      const withdraws = await Withdraw.find().sort({ createdAt: -1 });

      res.status(201).json({
        success: true,
        withdraws,
      });
    } catch (error) {
      return next(new Errorhandeler(error.message, 500));
    }
  });

// update withdraw request ---- admin
const UpdateWithdrawal=
  CatchAsyncError(async (req, res, next) => {
    try {
      const { sellerId } = req.body;

      const withdraw = await Withdraw.findByIdAndUpdate(
        req.params.id,
        {
          status: "succeed",
          updatedAt: Date.now(),
        },
        { new: true }
      );

      const seller = await Seller.findById(sellerId);

      const transection = {
        _id: withdraw._id,
        amount: withdraw.amount,
        updatedAt: withdraw.updatedAt,
        status: withdraw.status,
      };

      seller.transections = [...seller.transections, transection];

      await seller.save();

      try {
        await sendMail({
          email: seller.email,
          subject: "Payment confirmation",
          message: `Hello ${seller.name}, Your withdraw request of ${withdraw.amount}$ is on the way. Delivery time depends on your bank's rules it usually takes 3days to 7days.`,
        });
      } catch (error) {
        return next(new Errorhandeler(error.message, 500));
      }
      res.status(201).json({
        success: true,
        withdraw,
      });
    } catch (error) {
      return next(new Errorhandeler(error.message, 500));
    }
  });

module.exports = {CreateWithdraw,getAllWithdrawal,UpdateWithdrawal};
