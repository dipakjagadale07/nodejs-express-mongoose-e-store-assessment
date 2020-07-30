var express = require('express');
var router = express.Router();

const product = require('../controllers/product.controller.js');

router.get('/', (req, res, next) => {
    product.getAllProducts(req, (result) => {
        res.send(result);
    });
});

router.get('/:category', (req, res, next) => {
    product.getAllProductsByCategory(req, (result) => {
        res.send(result);
    });
});

router.post('/addtocart/:product', (req, res, next) => {
    product.addToCart(req, (result) => {
        res.send(result);
    });
});

module.exports = router;