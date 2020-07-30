var express = require('express');
var router = express.Router();

const cart = require('../controllers/cart.controller.js');

router.post('/add/:product', (req, res, next) => {
    cart.addToCart(req, (result) => {
        res.send(result);
    });
});

router.get('/', (req, res, next) => {
    cart.getCart(req, (result) => {
        res.send(result);
    });
});

module.exports = router;