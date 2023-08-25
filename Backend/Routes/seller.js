const express = require("express");
// import { seller_status_update } from './../../../multi-vendor-ecommerce/dashboard/src/store/Reducers/sellerReducer';
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
  sellerStatus_update,
} = require("../controlar/seller");
const { isSeller, isAdmin, isAuthenticated } = require("../Middleware/auth");


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

// ----------------------------------admin seller------------

router.get(
  "/admin-all-sellers",
  isAuthenticated,
  isAdmin("admin"),
  getAllSeller
);
router.post(
  "/seller-status-update",
  isAuthenticated,
  isAdmin("admin"),
  sellerStatus_update
);
  router.delete(
    "/delete-seller/:id",
    isAuthenticated,
    isAdmin("admin"),
    deleteSeller
  );

module.exports = router;
