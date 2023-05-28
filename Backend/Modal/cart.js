const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    cartItems: [
        {  productId: {
            type: String,
            required: true,
          },
          quantity: { type: Number, default: 1 },
        
        }
    ]
});


module.exports = mongoose.model('cart', cartSchema);