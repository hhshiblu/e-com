const express = require("express");
const upload = require("../src/multer");

const {
  getShopProduct,
  createproduct,
  ShopDeleteProduct,
  getAllProducts,
  reviewProduct,
  adminAllProduct,
} = require("../controlar/product");
const { isSeller, isAuthenticated, isAdmin } = require("../Middleware/auth");
const router = express.Router();

router.post("/create-product", upload.array("images"), createproduct);

router.get("/get-all-products-shop/:id", getShopProduct);

router.delete("/delete-shop-product/:id", isSeller, ShopDeleteProduct);
router.get("/get-all-products", getAllProducts);

router.put("/create-new-review", isAuthenticated, reviewProduct);

router.get(
  "/admin-all-products",
  isAuthenticated,
  // isAdmin("Admin"),
  adminAllProduct
);

module.exports = router;
