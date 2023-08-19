const CatchAsyncError = require("../Middleware/CatchAsyncError");
const cartModel = require("../Modal/cart");
const mongoose = require("mongoose");
const {
  mongo: { ObjectId },
} = require("mongoose");
const Errorhandeler = require("../utils/Errorhandeler");
class cart {
  add_to_card = CatchAsyncError(async (req, res, next) => {
    const { userId } = req.body;

    if (!userId) {
      return next(new Errorhandeler("userId and cartItems are required", 400));
    }
    try {
      const cart = await cartModel.findOne({ userId });

      if (cart) {
        const idSet = new Set(
          cart.cartItems.map((c) => c.productId.toString())
        );
        req.body.cartItems.forEach((item) => {
          if (idSet.has(item.productId))
            throw new Errorhandeler("item already added", 400);
          cart.cartItems.push(item);
        });

        await cart.save();
      } else {
        await cartModel.create({
          userId: userId,
          cartItems: req.body.cartItems,
        });
      }

      res.status(201).json({
        success: true,
        message: "product added successfully",
      });
    } catch (error) {
      return next(new Errorhandeler(error, 400));
    }
  });
  // get_card_products =CatchAsyncError( async (req, res,next) => {
  //   const co = 5;
  //   const { userId } = req.params;
  //   try {
  //     const card_products = await cardModel.aggregate([
  //       {
  //         $match: {
  //           userId: {
  //             $eq: new ObjectId(userId),
  //           },
  //         },
  //       },
  //       {
  //         $lookup: {
  //           from: "products",
  //           localField: "productId",
  //           foreignField: "_id",
  //           as: "products",
  //         },
  //       },
  //     ]);
  //     let buy_product_item = 0;
  //     let calculatePrice = 0;
  //     let card_product_count = 0;
  //     const outOfStockProduct = card_products.filter(
  //       (p) => p.products[0].stock < p.quantity
  //     );
  //     for (let i = 0; i < outOfStockProduct.length; i++) {
  //       card_product_count = card_product_count + outOfStockProduct[i].quantity;
  //     }
  //     const stockProduct = card_products.filter(
  //       (p) => p.products[0].stock >= p.quantity
  //     );
  //     for (let i = 0; i < stockProduct.length; i++) {
  //       const { quantity } = stockProduct[i];
  //       card_product_count = card_product_count + quantity;
  //       buy_product_item = buy_product_item + quantity;
  //       const { price, discount } = stockProduct[i].products[0];
  //       if (discount !== 0) {
  //         calculatePrice =
  //           calculatePrice +
  //           quantity * (price - Math.floor((price * discount) / 100));
  //       } else {
  //         calculatePrice = calculatePrice + quantity * price;
  //       }
  //     }
  //     let p = [];
  //     let unique = [
  //       ...new Set(stockProduct.map((p) => p.products[0].sellerId.toString())),
  //     ];
  //     for (let i = 0; i < unique.length; i++) {
  //       let price = 0;
  //       for (let j = 0; j < stockProduct.length; j++) {
  //         const tempProduct = stockProduct[j].products[0];
  //         if (unique[i] === tempProduct.sellerId.toString()) {
  //           let pri = 0;
  //           if (tempProduct.discount !== 0) {
  //             pri =
  //               tempProduct.price -
  //               Math.floor((tempProduct.price * tempProduct.discount) / 100);
  //           } else {
  //             pri = tempProduct.price;
  //           }
  //           pri = pri - Math.floor((pri * co) / 100);
  //           price = price + pri * stockProduct[j].quantity;
  //           p[i] = {
  //             sellerId: unique[i],
  //             shopName: tempProduct.shopName,
  //             price,
  //             products: p[i]
  //               ? [
  //                   ...p[i].products,
  //                   {
  //                     _id: stockProduct[j]._id,
  //                     quantity: stockProduct[j].quantity,
  //                     productInfo: tempProduct,
  //                   },
  //                 ]
  //               : [
  //                   {
  //                     _id: stockProduct[j]._id,
  //                     quantity: stockProduct[j].quantity,
  //                     productInfo: tempProduct,
  //                   },
  //                 ],
  //           };
  //         }
  //       }
  //     }
  //        res.status(201).json({
  //          card_products: p,
  //          price: calculatePrice,
  //          card_product_count,
  //          shipping_fee: 85 * p.length,
  //          outOfStockProduct,
  //          buy_product_item,
  //        });
  //     console.log(p.length);

  //   } catch (error) {
  //       return next(new Errorhandeler(error, 400));

  //   }
  // });
  get_card_products = CatchAsyncError(async (req, res, next) => {
    const coDiscount = 5; // Consider using a more meaningful variable name

    try {
      const { userId } = req.params;

      const cartProducts = await cartModel.aggregate([
        // {
        //   $match: {
        //     userId: new ObjectId(userId),
        //   },
        // },
        {
          $lookup: {
            from: "products", // Replace with the actual name of your product collection
            localField: "cartItems.productId",
            foreignField: "_id",
            as: "productDetails",
          },
        },
        {
          $project: {
            _id: 1,
            userId: 1,
            cartItems: {
              $map: {
                input: "$cartItems",
                as: "cartItem",
                in: {
                  productId: "$$cartItem.productId",
                  quantity: "$$cartItem.quantity",
                  productDetails: {
                    $arrayElemAt: [
                      {
                        $filter: {
                          input: "$productDetails",
                          as: "product",
                          cond: {
                            $eq: ["$$product._id", "$$cartItem.productId"],
                          },
                        },
                      },
                      0,
                    ],
                  },
                },
              },
            },
          },
        },
      ]);

      let totalCartPrice = 0;
      let totalPrice = 0;
      const cartSellerProduct = []; // Array to store filtered products by sellerId
      let cartItemsLength = 0;
      cartProducts.forEach((cartProduct) => {
        cartProduct.cartItems.forEach((cartItem) => {
          const desiredSellerId = cartItem.productDetails.sellerId;

          totalPrice =
            cartItem.quantity * cartItem.productDetails.originalPrice;
          totalCartPrice += totalPrice;

          // Filter and store products by sellerId
          const filteredProducts =
            cartItem.productDetails.sellerId === desiredSellerId;
          if (filteredProducts) {
            cartSellerProduct.push({
              productId: cartItem.productId,
              quantity: cartItem.quantity,
              productDetails: cartItem.productDetails,
            });
          }
        });
        cartItemsLength += cartProduct.cartItems
          ? cartProduct.cartItems.length
          : 0;
      });
      res.status(201).json({
        card_products: cartSellerProduct,
        price: totalPrice,
        cartItemsLength,
        totalCartPrice,
      });

    } catch (error) {
      return next(new Errorhandeler(error, 400));
    }
  });

  delete_card_product = CatchAsyncError(async (req, res, next) => {
    const { card_id } = req.params;
    try {
      await cardModel.findByIdAndDelete(card_id);

      res.status(200).json({
        message: "success",
      });
    } catch (error) {
      return next(new Errorhandeler(error, 400));
    }
  });

  quantity_inc = CatchAsyncError(async (req, res, next) => {
    const { card_id } = req.params;
    try {
      const product = await cardModel.findById(card_id);
      const { quantity } = product;
      await cardModel.findByIdAndUpdate(card_id, {
        quantity: quantity + 1,
      });
      res.status(201).json({
        message: "success",
      });
    } catch (error) {
      return next(new Errorhandeler(error, 400));
    }
  });
  quantity_dec = CatchAsyncError(async (req, res, next) => {
    const { card_id } = req.params;
    try {
      const product = await cardModel.findById(card_id);
      const { quantity } = product;
      await cardModel.findByIdAndUpdate(card_id, {
        quantity: quantity - 1,
      });
      res.status(201).json({
        message: "success",
      });
    } catch (error) {
      return next(new Errorhandeler(error, 400));
    }
  });

  // add_wishlist = async (req, res) => {
  //   const { slug } = req.body;
  //   try {
  //     const product = await wishlistModel.findOne({
  //       slug,
  //     });
  //     if (product) {
  //       responseReturn(res, 404, {
  //         error: "Allready added",
  //       });
  //     } else {
  //       await wishlistModel.create(req.body);
  //       responseReturn(res, 201, {
  //         message: "add to wishlist success",
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  // get_wishlist = async (req, res) => {
  //   const { userId } = req.params;
  //   try {
  //     const wishlists = await wishlistModel.find({
  //       userId,
  //     });
  //     responseReturn(res, 200, {
  //       wishlistCount: wishlists.length,
  //       wishlists,
  //     });
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  // delete_wishlist = async (req, res) => {
  //   const { wishlistId } = req.params;
  //   try {
  //     const wishlist = await wishlistModel.findByIdAndDelete(wishlistId);
  //     responseReturn(res, 200, {
  //       message: "Remove success",
  //       wishlistId,
  //     });
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };
}

module.exports = new cart();

// const CatchAsyncError = require("../Middleware/CatchAsyncError");
// const Cart = require("../Modal/cart");

// const Errorhandeler = require("../utils/Errorhandeler");

// const addToCart = CatchAsyncError(async (req, res, next) => {
//   try {
//     const cart = await Cart.findOne({ user: req.user._id });

//     if (cart) {
//       const idSet = new Set(
//         cart.cartItems.map((c) => c.productId.toString())
//       );
//       req.body.cartItems.forEach((item) => {
//         if (idSet.has(item.product._id))
//           throw new Errorhandeler("item already added", 400);
//         cart.cartItems.push(item);
//       });

//       await cart.save();
//     } else {
//       await Cart.create({
//         user: req.user._id,
//         cartItems: req.body.cartItems,
//       });
//     }

//     res.status(201).json({
//       success: true,
//       message: "product added successfully",
//     });
//   } catch (error) {
//     return next(new Errorhandeler(error, 400));
//   }
// });

// const getCart = CatchAsyncError(async (req, res, next) => {
//   try {
//     // const cart = await Cart.findOne({ user: req.user._id });
//     const cart = await Cart.find();
//     res.status(200).json({
//       success: true,
//       cart: cart,
//     });
//   } catch (error) {
//     return next(new Errorhandeler(error, 400));
//   }
// });

// module.exports = { addToCart, getCart };
