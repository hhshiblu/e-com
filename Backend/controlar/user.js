const User = require("../Modal/user");
const Errorhandeler = require("../utils/Errorhandeler");
const path = require("path");
const fs = require("fs");
const upload = require("../src/multer");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/EmailSander");
const CatchAsyncError = require("../Middleware/CatchAsyncError");
const sendToken = require("../utils/jwtToken");




const userSignUp= async (req, res, next) => {
  try {
    const { name, email, password, cpassword } = req.body;

    const UserExit = await User.findOne({ email });
    if (UserExit) {
      const filename = req.file.filename;
      const CurentFile = `upload/${filename}`;
      fs.unlink(CurentFile, (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "error deleting file" });
        }
      });
      return next(new Errorhandeler("user already exists", 400));
    }
    if (password != cpassword) {
      return next(new Errorhandeler("password doesn't match", 400));
    } else {
      const filename = req.file.filename;
      const fileUrl = path.join(filename);
      const user = {
        name,
        email,
        password,
        cpassword,
        avatar: fileUrl,
      };

      const ActivationToken = createSctivationToken(user);
      const activeUrl = `http://localhost:3000/activation/${ActivationToken}`;
      console.log(activeUrl);
      try {
        await sendMail({
          email: user.email,
          subject: "activated your account",
          message: `hello ${user.name},please click on the link to activate your account ${activeUrl}`,
        });
        return res.status(200).json({
          success: true,
          message: `please cheak your email : ${user.email} to activate your account`,
        });
      } catch (error) {
        console.log(error.message);
        return next(new Errorhandeler(error.message, 500));
      }
    }
  } catch (error) {
    return next(new Errorhandeler(error.message, 500));
  }
};

//active token
const createSctivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATED_KEY, {
    expiresIn: "4m",
  });
};

//activate user
const ActiveUser= CatchAsyncError(async (req, res, next) => {
    try {
      const { activation_token } = req.body;
      const newUser = jwt.verify(activation_token, process.env.ACTIVATED_KEY);

      if (!newUser) {
        return next(new Errorhandeler("invalid token", 400));
      }
      const { name, email, password, cpassword, avatar } = newUser;
      let user = await User.findOne({ email });
      if (user) {
        return next(new Errorhandeler("User already exist", 400));
      } else {
        user = await User.create({
          name,
          email,
          password,
          cpassword,
          avatar,
        });
        sendToken(user, 201, res);
      }
    } catch (error) {
      return next(new Errorhandeler(error.message, 500));
    }
  });

//log in

const UserSignIn=CatchAsyncError(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return next(new Errorhandeler("please fill all field", 400));
      }
      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        return next(new Errorhandeler("this user is not exited", 400));
      }

      const isMatchPass = await user.comparePassword(password);
      if (!isMatchPass) {
        return next(new Errorhandeler("invalied information", 400));
      }
      sendToken(user, 201, res);
    } catch (error) {
      return next(new Errorhandeler(error.message, 500));
    }
  });

//load user


const GetUser= CatchAsyncError(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
    
      if (!user) {
        return next(new Errorhandeler("User doesn't exists", 400));
      }

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new Errorhandeler(error.message, 500));
    }
  });

// log out user-----

const userLogOut=CatchAsyncError(async(req,res,next)=>{
try {
  res.cookie("token",null,{
    expires:new Date(Date.now()),
    httpOnly:true,
    
  });
  res.status(201).json({
    success:true,
    message:"log out successFull"
  })
} catch (error) {
  return next(new Errorhandeler(error.message, 500));
  
}
});

module.exports = {userSignUp,ActiveUser,UserSignIn,GetUser,userLogOut};
