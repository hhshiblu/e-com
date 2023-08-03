const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required: [true, "Please enter your name!"],
  },
  email:{
    type: String,
    required: [true, "Please enter your email!"],
  },
  password:{
    type: String,
    required: [true, "Please enter your password"],
    minLength: [4, "Password should be greater than 4 characters"],
    select: false,
  },
  // cpassword:{
  //   type: String,
  //   required: [true, "Please enter your cpassword"],
  //   select: false,
  // },
 
  phoneNumber:{
    type: Number,
  },
  addresses:[
    {
      division: {
        type: String,
      },
      district:{
        type: String,
      },
      address1:{
        type: String,
      },
     
      zipCode:{
        type: Number,
      },
      addressType:{
        type: String,
      },
    }
  ],
  role:{
    type: String,
    default: "user",
  },
  avatar:{
    type: String,
    
 },
 createdAt:{
  type: Date,
  default: Date.now(),
 },
 resetPasswordToken: String,
 resetPasswordTime: Date,
});


//  Hash password
userSchema.pre("save",async function(next){
  if(this.isModified("password")){
      this.password=await bcrypt.hash(this.password,12)
  } 
  next();
})


// jwt token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id}, process.env.JWT_SECRET_KEY,{
    expiresIn: process.env.JWT_EXPIRES,
  });
};

// compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
const USER= mongoose.model("User", userSchema);
module.exports =USER