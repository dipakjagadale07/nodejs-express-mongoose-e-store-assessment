const userModel = require('../src/models/user.model');
const bcrypt = require('bcrypt');

module.exports = async () => {
    try {
        let userData = await userModel.find({});
        bcrypt.hash('secret', 8, async function (err, password_hash) {
            if (!userData || userData.length < 1) {
                await userModel.create({
                    firstName: "Dipak",
                    lastName: "Jagadale",
                    email: "dipak@gmail.com",
                    password: password_hash
                });
            }
        });
    } catch (error) {
        console.error("Error while loading user: ", error)
    }
}