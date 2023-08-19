const router = require("express").Router();
const productfilter = require("../controlar/productfilter");

router.get("/get-categorys-query", productfilter.get_categorys);
router.get("/get-products-query", productfilter.get_products);
router.get("/get-product/:slug", productfilter.get_product);
router.get("/price-range-latest-product", productfilter.price_range_product);
router.get("/query-products", productfilter.query_products);
module.exports = router;
