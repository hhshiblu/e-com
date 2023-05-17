//create token cookes

const sendToken=(user,statusCode,res)=>{
    const token=user.getJwtToken();
    //option cookies

    const option={
         expires:new Date(Date.now()+30*24*60*60*1000),
         httpOnly:true,
         secure:true,
         SameSite:"none",
    }
    res.status(statusCode).cookie("token",token,option).json({
        success:true,
        user,token
    })
}
module.exports = sendToken