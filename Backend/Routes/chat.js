const router = require("express").Router();
const Chat = require("../controlar/Chat");
const { isSeller, isAdmin, isAuthenticated } = require("../Middleware/auth");
router.post("/customer/add-customer-friend", Chat.add_customer_friend);
router.post("/customer/send-message-to-seller", Chat.customer_message_add);
router.get("/seller/get-customers/:sellerId", Chat.get_customers);
router.get(
  "/seller/get-customer-message/:customerId",

  isAuthenticated,
  Chat.get_customer_seller_message
);

router.post(
  "/seller/send-message-to-customer",
  isAuthenticated,
  Chat.seller_message_add
);

router.get("/admin/get-sellers", isAuthenticated, Chat.get_sellers);

router.post(
  "/message-send-seller-admin",
  isAuthenticated,
  Chat.seller_admin_message_insert
);

router.get(
  "/get-admin-messages/:receverId",
  isAuthenticated,
  Chat.get_admin_messages
);

router.get(
  "/get-seller-messages",
  isAuthenticated,
  Chat.get_seller_messages
);

module.exports = router;
