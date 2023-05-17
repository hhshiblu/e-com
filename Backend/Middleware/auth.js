const Errorhandeler=require("../utils/Errorhandeler")

const User= require("../Modal/user")
const jwt =require("jsonwebtoken")
const catchAsyncError=require("../Middleware/CatchAsyncError")
const seller = require("../Modal/seller")

const isAuthenticated= catchAsyncError(async(req,res,next)=>{
    const {token}=req.cookies

    if(!token){
        return next(new Errorhandeler("please login first",401))
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.user= await User.findById(decoded.id)
    next()
})

const isSeller= catchAsyncError(async(req,res,next)=>{
    const {seller_t}=req.cookies

    if(!seller_t){
        return next(new Errorhandeler("please login first",401))
    }
    const decoded=jwt.verify(seller_t,process.env.JWT_SECRET_KEY);
    req.seller= await seller.findById(decoded.id)
    next()
})
module.exports={isAuthenticated,isSeller}