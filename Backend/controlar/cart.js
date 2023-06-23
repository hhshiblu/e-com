
const CatchAsyncError = require('../Middleware/CatchAsyncError')
const Cart = require('../Modal/cart')
 
const Errorhandeler = require('../utils/Errorhandeler')
const addToCart = CatchAsyncError(async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id })

    if (cart) {
      const idSet = new Set(cart.cartItems.map((c) => c.product._id.toString()))
      req.body.cartItems.forEach((item) => {
        if (idSet.has(item.product._id))
          throw new Errorhandeler("item already added", 400)
        cart.cartItems.push(item)
      }) 

      await cart.save()
    } else {
      await Cart.create({
        user: req.user._id,
        cartItems: req.body.cartItems,
      })
    }

    res.status(201).json({
      success: true,
      message: 'product added successfully',
    })
  } catch (error) {
    return next(new Errorhandeler(error, 400))
  }
})


const getCart = CatchAsyncError(async (req, res, next) => {
  try {
    // const cart = await Cart.findOne({ user: req.user._id });
const cart =await Cart.find()
    res.status(200).json({
      success: true, 
      cart: cart ,
    });
  } catch (error) {
    return next(new Errorhandeler(error, 400));
  }
});

 
module.exports = { addToCart,getCart }