const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/config.js');
const User = require('../models/user.model.js');

exports.login = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            throw "Invalid login details.";
        } else {
            let doesPasswordMatch = await bcrypt.compare(req.body.password, user.password);
            if (doesPasswordMatch) {
                delete user.password;
                res({
                    token: jwt.sign(user.email, config.secretKey),
                    user: user
                });
            } else {
                throw "Invalid login details.";
            }
        }
    } catch (error) {
        res({
            status: 500,
            message: error
        })
    }
};