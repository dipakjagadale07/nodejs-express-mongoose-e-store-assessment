const mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

const CartSchema = mongoose.Schema({
    user: { type: ObjectId, ref: 'user' },
    items: [{
        product: { type: ObjectId, ref: 'product' },
        quantity: { type: Number, default: 1 }
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('cart', CartSchema);