const mongoose = require("mongoose");

const banarSchema = new mongoose.Schema({
  avatar: {
    type: String,
    // required: true,
  },
  urlbanarproduct: {
    type: String,
  },
  role: {
    type: Number,
    default: 0,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("banar", banarSchema);
