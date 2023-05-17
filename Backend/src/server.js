const app = require("./app");
const connectDB = require("../db/index");

//handel uncaught exception

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`server sutting down for uncaughtException`);
});

// handel env

if (process.env.NODE_ENV != "PRODUCTION") {
  require("dotenv").config({
    path: "Backend/config/.env",
  });
}

//connect database

connectDB();

//server

const server = app.listen(process.env.PORT, () => {
  console.log(`server running on http://localhost:${process.env.PORT}`);
});

//unhandel promise

process.on("unhandledRejection", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`server is sutting down for unhandledRejection`);

  server.close(() => {
    process.exit(1);
  });
});
