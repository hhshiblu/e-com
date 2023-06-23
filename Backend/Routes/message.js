const express = require("express");
const router = express.Router();
const upload = require("../src/multer");
const { isAuthenticated } = require("../Middleware/auth");
const { createMessage, getMessage } = require("../controlar/message");
router.post("/create-new-message", upload.single("images"), createMessage);
router.get("/get-all-messages/:id", getMessage);

module.exports = router;
