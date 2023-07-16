const express = require("express");
const router = express.Router();

const upload = require("../src/multer");

const {
  SellerSignUp,
  ActiveSeller,
  SellerLogIn,
  GetSeller,
  SellerLogOut,
  getSellerInfo,
  UpdateSellerInfo,
  UpdateSellerPicture,
  updatePayment,
  deleteSellerWithdroMethod,
  deleteSeller,
  getAllSeller,
} = require("../controlar/seller");
const { isSeller, isAdmin, isAuthenticated } = require("../Middleware/auth");
// const { getAllUser } = require("../controlar/user");

router.post("/create-seller", upload.single("file"), SellerSignUp);

router.post("/activatetoken", ActiveSeller);

router.post("/shop-login", SellerLogIn);

router.get("/getseller", isSeller, GetSeller);

router.get("/logout", isSeller, SellerLogOut);

router.get("/get-shop-info/:id", getSellerInfo);
router.put(
  "/update-shop-avatar",
  isSeller,
  upload.single("image"),
  UpdateSellerPicture
);

router.put("/update-seller-info", isSeller, UpdateSellerInfo);
router.put("/update-payment-methods", isSeller, updatePayment);
router.delete("/delete-withdraw-method/", isSeller, deleteSellerWithdroMethod);
router.get(
  "/admin-all-sellers",
  isAuthenticated,
  getAllSeller)

  router.delete(
    "/delete-seller/:id",
    isAuthenticated,
   deleteSeller)

module.exports = router;
