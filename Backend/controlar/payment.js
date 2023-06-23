const CatchAsyncError = require("../Middleware/CatchAsyncError");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const payment = CatchAsyncError(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "bdt",
    metadata: {
      company: "shiblu",
    },
  });
  res.status(200).json({
    success: true,
    client_secret: myPayment.client_secret,
  });
});

const getPayment = CatchAsyncError(async (req, res, next) => {
  res.status(200).json({ stripeApikey: process.env.STRIPE_API_KEY });
});

module.exports = { payment, getPayment };
