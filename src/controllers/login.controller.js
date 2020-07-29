const User = require('../models/user.model.js');

exports.login = async (req, res) => {
    console.log("Req=============>", req);
    let user = await User.findOne({ email: req.email });
    console.log("user===========>", user);
};