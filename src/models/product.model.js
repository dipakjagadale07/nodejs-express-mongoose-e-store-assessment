const mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

const ProductSchema = mongoose.Schema({
    name: { type: String },
    category: { type: ObjectId, ref: 'category' },
    description: { type: String },
    price: { type: Number },
    make: { type: Date }
}, {
    timestamps: true
});

module.exports = mongoose.model('product', ProductSchema);