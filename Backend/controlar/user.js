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
    const { name, email, password } = req.body;

    const UserExit = await User.findOne({ email });
    if (UserExit) {
      const filename = req.file.filename;
      const CurentFile = `upload/${filename}`;
      fs.unlink(CurentFile, (err) => {
        if (err) {
         
          return res.status(500).json({ message: "error deleting file" });
        }
      });
      return next(new Errorhandeler("user already exists", 400));
    }
     else {
      const filename = req.file.filename;
      const fileUrl = path.join(filename);
      const user = {
        name,
        email,
        password,
        avatar: fileUrl,
      };

      const ActivationToken = createSctivationToken(user);
      const activeUrl = `http://localhost:3000/activation/${ActivationToken}`;
   
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
      const { name, email, password, avatar } = newUser;
      let user = await User.findOne({ email });
      if (user) {
        return next(new Errorhandeler("User already exist", 400));
      } else {
        user = await User.create({
          name,
          email,
          password,
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



// update user info
const UpdateUserInfo=
  CatchAsyncError(async (req, res, next) => {
    try {
      const { email, password, phoneNumber, name } = req.body;

      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return next(new Errorhandeler("User not found", 400));
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(
          new Errorhandeler("Please provide the correct information", 400)
        );
      }

      user.name = name;
      user.email = email;
      user.phoneNumber = phoneNumber;

      await user.save();

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new Errorhandeler(error.message, 500));
    }
  });

// update user avatar
const UpdateAvatar=
  CatchAsyncError(async (req, res, next) => {
    try {
      const existsUser = await User.findById(req.user.id);

      const existAvatarPath = `upload/${existsUser.avatar}`;

      fs.unlinkSync(existAvatarPath);

      const fileUrl = path.join(req.file.filename);

      const user = await User.findByIdAndUpdate(req.user.id, {
        avatar: fileUrl,
      });

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new Errorhandeler(error.message, 500));
    }
  });

// update user addresses
const UpDateAdress=
  CatchAsyncError(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);

      const sameTypeAddress = user.addresses.find(
        (address) => address.addressType === req.body.addressType
      );
      if (sameTypeAddress) {
        return next(
          new Errorhandeler(`${req.body.addressType} address already exists`)
        );
      }

      const existsAddress = user.addresses.find(
        (address) => address._id === req.body._id
      );

      if (existsAddress) {
        Object.assign(existsAddress, req.body);
      } else {
        // add the new address to the array
        user.addresses.push(req.body);
      }

      await user.save();

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new Errorhandeler(error.message, 500));
    }
  });

// delete user address
const DeleteUserAddress=
  CatchAsyncError(async (req, res, next) => {
    try {
      const userId = req.user._id;
      const addressId = req.params.id;

      await User.updateOne(
        {
          _id: userId,
        },
        { $pull: { addresses: { _id: addressId } } }
      );

      const user = await User.findById(userId);

      res.status(200).json({ success: true, user });
    } catch (error) {
      return next(new Errorhandeler(error.message, 500));
    }
  });

// update user password
const UpdatePass=
  CatchAsyncError(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id).select("+password");

      const isPasswordMatched = await user.comparePassword(
        req.body.oldPassword
      );

      if (!isPasswordMatched) {
        return next(new Errorhandeler("Old password is incorrect!", 400));
      }

      if (req.body.newPassword !== req.body.confirmPassword) {
        return next(
          new Errorhandeler("Password doesn't matched with each other!", 400)
        );
      }
      user.password = req.body.newPassword;

      await user.save();

      res.status(200).json({
        success: true,
        message: "Password updated successfully!",
      });
    } catch (error) {
      return next(new Errorhandeler(error.message, 500));
    }
  });

// find user infoormation with the userId
// router.get(
//   "/user-info/:id",
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const user = await User.findById(req.params.id);

//       res.status(201).json({
//         success: true,
//         user,
//       });
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   })
// );

// all users --- for admin
// router.get(
//   "/admin-all-users",
//   isAuthenticated,
//   isAdmin("Admin"),
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const users = await User.find().sort({
//         createdAt: -1,
//       });
//       res.status(201).json({
//         success: true,
//         users,
//       });
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   })
// );

// delete users --- admin
// router.delete(
//   "/delete-user/:id",
//   isAuthenticated,
//   isAdmin("Admin"),
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const user = await User.findById(req.params.id);

//       if (!user) {
//         return next(
//           new ErrorHandler("User is not available with this id", 400)
//         );
//       }

//       await User.findByIdAndDelete(req.params.id);

//       res.status(201).json({
//         success: true,
//         message: "User deleted successfully!",
//       });
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   })
// );


module.exports = {userSignUp,ActiveUser,UserSignIn,GetUser,userLogOut,UpdateUserInfo,UpdateAvatar,UpDateAdress,DeleteUserAddress,UpdatePass};
