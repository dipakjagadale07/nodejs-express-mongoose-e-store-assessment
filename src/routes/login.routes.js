var express = require('express');
var router = express.Router();

const loginController = require('../controllers/login.controller.js');

router.post('/login', (req, res, next) => {
    console.log("Inside routes");
    loginController.login(req, (response) => {
        res.send(response);
    });
});

module.exports = router;