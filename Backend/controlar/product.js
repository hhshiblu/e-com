const Product = require("../Modal/product");
const Seller = require("../Modal/seller");
const Order = require("../Modal/order.js");
const fs = require("fs");
const Errorhandeler = require("../utils/Errorhandeler");
const CatchAsyncError = require("../Middleware/CatchAsyncError");
const APIFilters = require("../utils/APIFilters");

// create product
const createproduct = CatchAsyncError(async (req, res, next) => {
  try {
    const sellerId = req.body.sellerId;
    const seller = await Seller.findById(sellerId);
    if (!seller) {
      return next(new Errorhandeler("Shop Id is invalid!", 400));
    } else {
      const files = req.files;
      const imageUrls = files.map((file) => `${file.filename}`);

      const productData = req.body;
      productData.images = imageUrls;
      productData.seller = seller;

      const product = await Product.create(productData);

      res.status(201).json({
        success: true,
        product,
      });
    }
  } catch (error) {
    return next(new Errorhandeler(error, 400));
  }
});

// get all products of a shop

const getShopProduct = CatchAsyncError(async (req, res, next) => {
  try {
    const products = await Product.find({ sellerId: req.params.id });

    res.status(201).json({
      success: true,
      products,
    });
  } catch (error) {
    return next(new Errorhandeler(error, 400));
  }
});

// delete product of a shop
const ShopDeleteProduct = CatchAsyncError(async (req, res, next) => {
  try {
    const productId = req.params.id;

    const productData = await Product.findById(productId);

    productData.images.forEach((imageUrl) => {
      const filename = imageUrl;
      const filePath = `uploads/${filename}`;

      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
        }
      });
    });

    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      return next(new Errorhandeler("Product not found with this id!", 500));
    }

    res.status(201).json({
      success: true,
      message: "Product Deleted successfully!",
    });
  } catch (error) {
    return next(new Errorhandeler(error, 400));
  }
});

//get all products
// const getAllProducts=
//   CatchAsyncError(async (req, res, next) => {
//     try {
//       const products = await Product.find().sort({ createdAt: -1 });

//       res.status(201).json({
//         success: true,
//         products,
//       });

//     } catch (error) {
//       return next(new Errorhandeler(error, 400));
//     }
//   });

const getAllProducts = CatchAsyncError(async (req, res, next) => {
  try {
    const resPerPage = 4;
    const { category, page } = req.query;

    // Create a base query for fetching products
    let query = Product.find().sort({ createdAt: -1 });

    // Create an instance of the APIFilters class
    const filters = new APIFilters(query, req.query);

    // If a category is specified, add it to the search filter
    if (category) {
      filters.filter().search();
    } else {
      filters.search().filter();
    }

    // Execute the query and get the total count of products matching the filters
    const products = await filters.query;
    const filteredProductsCount = products.length;

    // Apply pagination
    filters.pagination(resPerPage);

    // Execute the final query with pagination
    const paginatedProducts = await filters.query.clone();

    // Get the total count of all products (without filtering)
    const totalProductsCount = await Product.countDocuments();

    res.status(200).json({
      products: paginatedProducts,
      productsCount: totalProductsCount,
      resPerPage,
      filteredProductsCount,
    });
  } catch (error) {
    return next(new Errorhandeler(error, 400));
  }
});

// review for a product
const reviewProduct = CatchAsyncError(async (req, res, next) => {
  try {
    const { user, rating, comment, productId, orderId } = req.body;

    const product = await Product.findById(productId);

    const review = {
      user,
      rating,
      comment,
      productId,
    };

    const isReviewed = product.reviews.find(
      (rev) => rev.user._id === req.user._id
    );

    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user._id === req.user._id) {
          (rev.rating = rating), (rev.comment = comment), (rev.user = user);
        }
      });
    } else {
      product.reviews.push(review);
    }

    let avg = 0;

    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });

    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    await Order.findByIdAndUpdate(
      orderId,
      { $set: { "cart.$[elem].isReviewed": true } },
      { arrayFilters: [{ "elem._id": productId }], new: true }
    );

    res.status(200).json({
      success: true,
      message: "Reviwed succesfully!",
    });
  } catch (error) {
    return next(new Errorhandeler(error, 400));
  }
});

// all products --- for admin
const adminAllProduct = CatchAsyncError(async (req, res, next) => {
  try {
    const products = await Product.find().sort({
      createdAt: -1,
    });
    res.status(201).json({
      success: true,
      products,
    });
  } catch (error) {
    return next(new Errorhandeler(error.message, 500));
  }
});
module.exports = {
  createproduct,
  getShopProduct,
  ShopDeleteProduct,
  getAllProducts,
  reviewProduct,
  adminAllProduct,
};
