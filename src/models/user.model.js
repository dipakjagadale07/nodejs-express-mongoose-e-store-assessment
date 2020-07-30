const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, unique: true, lowercase: true },
    password: { type: String }
}, {
    timestamps: true
});

module.exports = mongoose.model('user', UserSchema);