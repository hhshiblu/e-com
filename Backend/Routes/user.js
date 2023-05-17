const express = require("express");
const router = express.Router();

const upload = require("../src/multer");

const {
  userSignUp,
  ActiveUser,
  UserSignIn,
  GetUser,
  userLogOut,
} = require("../controlar/user");
const { isAuthenticated } = require("../Middleware/auth");

router.post("/signup", upload.single("file"), userSignUp);

router.post("/activatetoken", ActiveUser);

router.post("/login", UserSignIn);

router.get("/getuser", isAuthenticated, GetUser);

router.get("/logout", isAuthenticated, userLogOut);


module.exports= router;
