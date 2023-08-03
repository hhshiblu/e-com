const mongoose = require("mongoose");

const upEventSchema = new mongoose.Schema({
  avatar: {
    type: String,
    // required: true,
  },
  urlbanarproduct: {
    type: String,
  },
  start_Date: {
    type: Date,
    required: true,
  },
  Finish_Date: {
    type: Date,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("upEventSchema", upEventSchema);
