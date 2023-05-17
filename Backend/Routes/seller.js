const express = require("express");
const router = express.Router();

const upload = require("../src/multer");

const {
  SellerSignUp, ActiveSeller, SellerLogIn, GetSeller, SellerLogOut,
  
} = require("../controlar/seller");
const { isSeller } = require("../middleware/auth");


router.post("/create-seller", upload.single("file"), SellerSignUp);

router.post("/activatetoken", ActiveSeller);

router.post("/shop-login", SellerLogIn);

router.get("/getseller",isSeller, GetSeller);

router.get("/logout",isSeller,  SellerLogOut);

 
module.exports= router;