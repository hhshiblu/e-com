const cart = require("../controlar/cart");

const router = require("express").Router();


router.post("/add-to-card", cart.add_to_card);
router.get("/get-card-product/:userId", cart.get_card_products);
router.delete(
  "/delete-card-product/:card_id",
  cart.delete_card_product
);
router.put("/quantity-inc/:card_id", cart.quantity_inc);
router.put("/quantity-dec/:card_id", cart.quantity_dec);

// router.post("/home/product/add-to-wishlist", cardController.add_wishlist);
// router.get(
//   "/home/product/get-wishlist-products/:userId",
//   cardController.get_wishlist
// );
// router.delete(
//   "/home/product/delete-wishlist-product/:wishlistId",
//   cardController.delete_wishlist
// );

module.exports = router;
