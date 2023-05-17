const Errorhandeler =require("../utils/Errorhandeler")

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server error";
  
    // wrong jwtToken
    if (err.name === "JsonWebTokenError") {
      const message = `Your URL is not valid. Please try again.`;
      err = new Errorhandeler(message, 400);
    }
  
    // jwt expired
    if (err.name === "TokenExpiredError") {
      const message = `Your URL is expired. Please try again.`;
      err = new Errorhandeler(message, 400);
    }
  
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  };