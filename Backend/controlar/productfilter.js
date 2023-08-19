const categoryModel = require("../Modal/category");
const productModel = require("../Modal/product");

const queryProducts = require("../utils/queryProducts");
const CatchAsyncError = require("../Middleware/CatchAsyncError");
const Errorhandeler = require("../utils/Errorhandeler");
class productfilter {
  formateProduct = (products) => {
    const productArray = [];
    let i = 0;
    while (i < products.length) {
      let temp = [];
      let j = i;
      while (j < i + 3) {
        if (products[j]) {
          temp.push(products[j]);
        }
        j++;
      }
      productArray.push([...temp]);
      i = j;
    }
    return productArray;
  };
  get_categorys = async (req, res) => {
    try {
      const categorys = await categoryModel.find({});

      res.status(200).json({
        success: true,
        categorys,
      });
      //   responseReturn(res, 200, {
      //     categorys,
      //   });
    } catch (error) {
      console.log(error.message);
    }
  };

  get_products = CatchAsyncError(async (req, res, next) => {
    try {
      const products = await productModel.find({}).limit(6).sort({
        createdAt: -1,
      });
      const allProduct1 = await productModel.find({}).limit(9).sort({
        createdAt: -1,
      });
      const latest_product = this.formateProduct(allProduct1);
      const allProduct2 = await productModel.find({}).limit(9).sort({
        rating: -1,
      });
      const topRated_product = this.formateProduct(allProduct2);
      const allProduct3 = await productModel.find({}).limit(9).sort({
        discount: -1,
      });
      const discount_product = this.formateProduct(allProduct3);

      res.status(200).json({
        products,
        latest_product,
        topRated_product,
        discount_product,
      });
      // responseReturn(res, 200, {
      //   products,
      //   latest_product,
      //   topRated_product,
      //   discount_product,
      // });
    } catch (error) {
      return next(new Errorhandeler(error, 400));
    }
  });

  get_product = CatchAsyncError(async (req, res, next) => {

    try {
      const product = await productModel.findById(req.params.slug);

      const relatedProducts = await productModel
        .find({
          $and: [
            {
              _id: {
                $ne: product.slug,
              },
            },
            {
              category: {
                $eq: product.category,
              },
            },
          ],
        })
        .limit(20);
      const moreProducts = await productModel
        .find({
          $and: [
            {
              _id: {
                $ne: product.slug,
              },
            },
            {
              sellerId: {
                $eq: product.sellerId,
              },
            },
          ],
        })
        .limit(20);

      res.status(200).json({
        product,
        relatedProducts,
        moreProducts,
      });
    } catch (error) {
      return next(new Errorhandeler(error, 400));
    }
  });

  price_range_product = CatchAsyncError(async (req, res, next) => {
    try {
      const priceRange = {
        low: 0,
        high: 0,
      };
      const products = await productModel.find({}).limit(9).sort({
        createdAt: -1,
      });
      const latest_product = this.formateProduct(products);
      const getForPrice = await productModel.find({}).sort({
        discountPrice: 1,
      });
      if (getForPrice.length > 0) {
        priceRange.high = getForPrice[getForPrice.length - 1].discountPrice;
        priceRange.low = getForPrice[0].discountPrice;
      }

      res.status(200).json({
        latest_product,
        priceRange,
      });
    } catch (error) {
      return next(new Errorhandeler(error, 400));
    }
  });

  query_products = CatchAsyncError(async (req, res, next) => {
    const parPage = 4;
    req.query.parPage = parPage;
    try {
      const products = await productModel.find({}).sort({
        createdAt: -1,
      });

      const totalProduct = new queryProducts(products, req.query)
        .categoryQuery()
        .subCategoryQuery()
        .searchQuery()
        .priceQuery()
        .highPriceQuery() // Add this line
        .ratingQuery()
        .sortByPrice()
        .countProducts();

      const result = new queryProducts(products, req.query)
        .categoryQuery()
        .subCategoryQuery()
        .ratingQuery()
        .priceQuery()
        .highPriceQuery()
        .searchQuery()
        .sortByPrice()
        .skip()
        .limit()
        .getProducts();

      res.status(200).json({
        products: result,
        totalProduct,
        parPage,
      });
    } catch (error) {
      return next(new Errorhandeler(error, 400));
    }
  });
}

module.exports = new productfilter();
