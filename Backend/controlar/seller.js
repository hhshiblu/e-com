const Seller = require("../Modal/seller");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const Errorhandeler = require("../utils/Errorhandeler");
const CatchAsyncError = require("../Middleware/CatchAsyncError");
const sendMail = require("../utils/EmailSander");
const SellerToken = require("../utils/SellerToken");

const SellerSignUp = CatchAsyncError(async (req, res, next) => {
  try {
    const { name, email, password, address, phoneNumber, zipCode } = req.body;

    const SellerExit = await Seller.findOne({ email });
    if (SellerExit) {
      const filename = req.file.filename;
      const CurentFile = `upload/${filename}`;
      fs.unlink(CurentFile, (err) => {
        if (err) {
          
          return res.status(500).json({ message: "error deleting file" });
        }
      });
      return next(new Errorhandeler("seller already exists", 400));
    }
    // if (password != cpassword) {
    //   return next(new Errorhandeler("password doesn't match", 400));
    // } else {
    const filename = req.file.filename;
    const fileUrl = path.join(filename);
    const seller = {
      name,
      email,
      password,
      address,
      phoneNumber,
      zipCode,
      avatar: fileUrl,
    };

    const ActivationToken = createSctivationToken(seller);
    const activeUrl = `http://localhost:3000/seller/activation/${ActivationToken}`;

    try {
      await sendMail({
        email: seller.email,
        subject: "activated your shop",
        message: `hello ${seller.name},please click on the link to activate your shop ${activeUrl}`,
      });
      return res.status(200).json({
        success: true,
        message: `please cheak your email : ${seller.email} to activate your account`,
      });
    } catch (error) {
      return next(new Errorhandeler(error.message, 500));
    }
    // }
  } catch (error) {
    return next(new Errorhandeler(error.message, 500));
  }
});

//active token
const createSctivationToken = (seller) => {
  return jwt.sign(seller, process.env.ACTIVATED_KEY, {
    expiresIn: "4m",
  });
};

//activate seller

const ActiveSeller = CatchAsyncError(async (req, res, next) => {
  try {
    const { activation_token } = req.body;
    const newSeller = jwt.verify(activation_token, process.env.ACTIVATED_KEY);

    if (!newSeller) {
      return next(new Errorhandeler("invalid token", 400));
    }
    const { name, email, password, address, phoneNumber, zipCode, avatar } =
      newSeller;
    let seller = await Seller.findOne({ email });
    if (seller) {
      return next(new Errorhandeler("Seller already exist", 400));
    } else {
      seller = await Seller.create({
        name,
        email,
        password,
        address,
        phoneNumber,
        zipCode,
        avatar,
      });
      SellerToken(seller, 201, res);
      try {
        await sendMail({
          email: seller.email,
          subject: "activated your shop",
          message: `hello ${seller.name} your shop  create successfull`
        });
        return res.status(200).json({
          success: true,
        
        });
      } catch (error) {
        return next(new Errorhandeler(error.message, 500));
      }
    }
  } catch (error) {
    return next(new Errorhandeler(error.message, 500));
  }
});

//log in

const SellerLogIn=CatchAsyncError(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new Errorhandeler("please fill all field", 400));
      }
      const seller = await Seller.findOne({ email }).select("+password");
      if (!seller) {
        return next(new Errorhandeler("this seller is not exited", 400));
      }

      const isMatchPass = await seller.comparePassword(password);
      if (!isMatchPass) {
        return next(new Errorhandeler("invalied information", 400));
      }
      SellerToken(seller, 201, res);
    } catch (error) {
      return next(new Errorhandeler(error.message, 500));
    }
  });

//load seller

const GetSeller= CatchAsyncError(async (req, res, next) => {
    try {
 
      const seller = await Seller.findById(req.seller._id);
    
      if (!seller) {
        return next(new Errorhandeler("seller doesn't exists", 400));
      }

      res.status(200).json({
        success: true,
        seller,
      });
    
    } catch (error) {
      return next(new Errorhandeler(error.message, 500));
    }
  });

// log out user-----

const SellerLogOut=CatchAsyncError(async(req,res,next)=>{
try {
  res.cookie("seller_t",null,{
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

// get shop info
const getSellerInfo=
 CatchAsyncError(async (req, res, next) => {
    try {
      const seller = await Seller.findById(req.params.id);
      res.status(201).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new Errorhandeler(error.message, 500));
    }
  });
// update seller profile

const UpdateSellerPicture=
   
    CatchAsyncError(async (req, res, next) => {
      try {
        const existsUser = await Seller.findById(req.seller._id);
  
        const existAvatarPath = `upload/${existsUser.avatar}`;
  
        fs.unlinkSync(existAvatarPath);
  
        const fileUrl = path.join(req.file.filename);
  
        const seller = await Seller.findByIdAndUpdate(req.seller._id, {
          avatar: fileUrl,
        });
  
        res.status(200).json({
          success: true,
          seller,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    })

//update seller info

const UpdateSellerInfo=
    CatchAsyncError(async (req, res, next) => {
      try {
        const { name, description, address, phoneNumber, zipCode } = req.body;
  
        const seller = await Seller.findOne(req.seller._id);
  
        if (!seller) {
          return next(new Errorhandeler("User not found", 400));
        }
  
        seller.name = name;
        seller.description = description;
        seller.address = address;
        seller.phoneNumber = phoneNumber;
        seller.zipCode = zipCode;
  
        await seller.save();
  
        res.status(201).json({
          success: true,
          seller,
        });
      } catch (error) {
        return next(new Errorhandeler(error.message, 500));
      }
    })
// seller update payment method

   const updatePayment=
      CatchAsyncError(async (req, res, next) => {
        try {
          const { withdrawMethod } = req.body;
    
          const seller = await Seller.findByIdAndUpdate(req.seller._id, {
            withdrawMethod,
          });
    
          res.status(201).json({
            success: true,
            seller,
          });
        } catch (error) {
          return next(new Errorhandeler(error.message, 500));
        }
      });
    
    // delete seller withdraw merthods --- only seller
   const deleteSellerWithdroMethod=
      CatchAsyncError(async (req, res, next) => {
        try {
          const seller = await Seller.findById(req.seller._id);
    
          if (!seller) {
            return next(new Errorhandeler("Seller not found with this id", 400));
          }
    
          seller.withdrawMethod = null;
    
          await seller.save();
    
          res.status(201).json({
            success: true,
            seller,
          });
        } catch (error) {
          return next(new Errorhandeler(error.message, 500));
        }
      })
    ;


// all sellers --- for admin
const getAllSeller=
  CatchAsyncError(async (req, res, next) => {
    try {
      const sellers = await Seller.find().sort({
        createdAt: -1,
      });
  
      res.status(201).json({
        success: true,
        sellers,
      });
    } catch (error) {
      return next(new Errorhandeler(error.message, 500));
    }
  })
;

// delete seller ---admin
const deleteSeller=
  CatchAsyncError(async (req, res, next) => {
    try {
      const seller = await Seller.findById(req.params.id);

      if (!seller) {
        return next(
          new Errorhandeler("Seller is not available with this id", 400)
        );
      }

      await Seller.findByIdAndDelete(req.params.id);

      res.status(201).json({
        success: true,
        message: "Seller deleted successfully!",
      });
    } catch (error) {
      return next(new Errorhandeler(error.message, 500));
    }
  });




module.exports = { SellerSignUp, ActiveSeller,SellerLogIn,GetSeller ,SellerLogOut, getSellerInfo,UpdateSellerPicture,UpdateSellerInfo,deleteSellerWithdroMethod,updatePayment,getAllSeller,deleteSeller};
