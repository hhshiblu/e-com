const express = require("express");
const app = express();
const cookeParser = require("cookie-parser");
const bodyParser = require("body-parser");
const Errorhandeler = require("../Middleware/Error");
const cors = require("cors");

//middleware app 


app.use(express.json());
app.use(cookeParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use("/upload", express.static("upload"));             //image 
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV != "PRODUCTION") {
  require("dotenv").config({
    path: "../Backend/config/.env",
  });
}
// routes input
const user = require("../Routes/user");
const seller = require("../Routes/seller");
const products = require("../Routes/products");
const event = require("../Routes/event");
const coupon = require("../Routes/couponCode");
const order = require("../Routes/order");
const cart = require("../Routes/cart");
//routes
app.use("/api/v1", user);
app.use("/api/v1/seller",seller)
app.use("/api/v1/product",products)
app.use("/api/v1/event",event)
app.use("/api/v1/coupon",coupon)
app.use("/api/v1/order",order)
app.use("/api/v1/cart",cart)

// error handeler

app.use(Errorhandeler);
module.exports = app;
