const { Schema, model } = require("mongoose");

const cardSchema = new Schema(
  {
    userId: {
      type: Schema.ObjectId,
      required: true,
    },

    cartItems: [
      {
        productId: {
          type: Schema.ObjectId,
          required: true,
        },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("cart", cardSchema);
