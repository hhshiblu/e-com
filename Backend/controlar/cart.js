const CatchAsyncError = require("../Middleware/CatchAsyncError");
const Cart = require("../Modal/cart");

const Errorhandeler = require("../utils/Errorhandeler");

const addToCart = CatchAsyncError(async (req, res, next) => {
  try {
    const isUser = await Cart.findOne({ user: req.user._id });

    const existingProduct = await Cart.cartItems.findOne({
      productId: req.body.cartItems.productId
    });

    
    if (isUser ) {
       
        await Cart.findOneAndUpdate(
          { user: req.user._id },
          {
            $push: {
              cartItems: req.body.cartItems,
            },
          },
          { new: true }
        );
        res.status(201).json({
          success: true,
          message: "product added successful",
        });
      
    } else {
      await Cart.create({
        user: req.user._id,
        cartItems: req.body.cartItems,
      });

      res.status(201).json({
        success: true,
        message: "product added successful",
      });
    }
  } catch (error) {
    return next(new Errorhandeler(error, 400));
  }
});

module.exports = { addToCart };

