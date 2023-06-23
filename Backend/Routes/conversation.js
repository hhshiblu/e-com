const express = require("express");
const {
  CreateConversation,
  getSellerConver,
  getUserConversation,
  UpdateConversation,
} = require("../controlar/conversation");
const { isSeller, isAuthenticated } = require("../Middleware/auth");
const router = express.Router();

router.post("/create-new-conversation", CreateConversation);
router.get("/get-all-conversation-seller/:id", isSeller, getSellerConver);
router.get(
  "/get-all-conversation-user/:id",
  isAuthenticated,
  getUserConversation
);
router.put("/update-last-message/:id", UpdateConversation);

module.exports = router;
