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
                    token: jwt.sign({
                        userId: user._id,
                        email: user.email
                    }, config.secretKey),
                    user: user
                });
            } else {
                throw "Invalid login details.";
            }
        }
    } catch (error) {
        console.log("Error while login - ", error);
        res({
            success: false,
            message: error
        });
    }
};