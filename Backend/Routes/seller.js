const express = require("express");
const router = express.Router();

const upload = require("../src/multer");

const {
  SellerSignUp, ActiveSeller, SellerLogIn, GetSeller, SellerLogOut, getSellerInfo,
  
} = require("../controlar/seller");
const { isSeller } = require("../Middleware/auth");


 
router.post("/create-seller", upload.single("file"), SellerSignUp);

router.post("/activatetoken", ActiveSeller);

router.post("/shop-login", SellerLogIn);

router.get("/getseller",isSeller, GetSeller);

router.get("/logout",isSeller,  SellerLogOut);

router.get(
  "/get-shop-info/:id",getSellerInfo)
 
module.exports= router;