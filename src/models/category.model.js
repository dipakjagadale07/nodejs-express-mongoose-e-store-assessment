const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    name: { type: String },
    type: { type: String }
}, {
    timestamps: true
});

module.exports = mongoose.model('category', CategorySchema);