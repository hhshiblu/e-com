const express = require("express");
const router = express.Router();

const upload = require("../src/multer");

const {
  userSignUp,
  ActiveUser,
  UserSignIn,
  GetUser,
  userLogOut,
  UpdateUserInfo,
  UpdateAvatar,
  UpDateAdress,
  DeleteUserAddress,
  UpdatePass,
} = require("../controlar/user");
const { isAuthenticated } = require("../Middleware/auth");

router.post("/signup", upload.single("file"), userSignUp);

router.post("/activatetoken", ActiveUser);

router.post("/login", UserSignIn);

router.get("/getuser", isAuthenticated, GetUser);

router.get("/logout", isAuthenticated, userLogOut);
router.put("/update-user-info", isAuthenticated, UpdateUserInfo);

router.put(
  "/update-avatar",
  isAuthenticated,
  upload.single("image"),
  UpdateAvatar
);

router.put("/update-user-addresses", isAuthenticated, UpDateAdress);
router.delete("/delete-user-address/:id", isAuthenticated, DeleteUserAddress);

router.put("/update-user-password", isAuthenticated, UpdatePass);

module.exports = router;
