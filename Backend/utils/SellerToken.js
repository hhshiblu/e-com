//create token cookes

const SellerToken=(user,statusCode,res)=>{
    const token=user.getJwtToken();
    //option cookies

    const option={
         expires:new Date(Date.now()+30*24*60*60*1000),
         httpOnly:true,
         secure:true,
         SameSite:"none",
    }
    res.status(statusCode).cookie("seller_t",token,option).json({
        success:true,
        user,token
    })
}
module.exports = SellerToken