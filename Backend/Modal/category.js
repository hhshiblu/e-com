const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },

    parentId: {
      type: String,
    },

    avatar: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("category", categorySchema);
