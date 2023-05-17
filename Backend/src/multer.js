const multer =require("multer")

const storage=multer.diskStorage({
    destination:function (req,res,cb) {
        cb(null,"upload/") 
    },
    filename: function(req,file,cb){
        const dicName= Date.now()+"_"+Math.round(Math.random()*1e9);
        const filename= file.originalname.split(".")[0];
        cb(null,filename+"_"+dicName+".png")
    }
})

const upload=multer({storage:storage})
module.exports=upload;