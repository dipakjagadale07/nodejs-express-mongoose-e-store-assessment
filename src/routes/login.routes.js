var express = require('express');
var router = express.Router();

const auth = require('../controllers/auth.controller.js');

router.post('/', (req, res, next) => {
    auth.login(req, (result) => {
        res.send(result);
    });
});

module.exports = router;