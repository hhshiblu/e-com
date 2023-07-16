const express = require("express");


const { CreateWithdraw, getAllWithdrawal, UpdateWithdrawal } = require("../controlar/withdraw");
const { isSeller, isAuthenticated, isAdmin } = require("../Middleware/auth");
const router = express.Router();

router.post("/create-withdraw-request", isSeller, CreateWithdraw);

router.get(
    "/get-all-withdraw-request",
    isAuthenticated,
    // isAdmin("Admin"),
    getAllWithdrawal)

    router.put(
        "/update-withdraw-request/:id",
        isAuthenticated,
        // isAdmin("Admin"),
        UpdateWithdrawal)
module.exports = router; 
 