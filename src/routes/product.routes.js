var express = require('express');
var router = express.Router();

const product = require('../controllers/product.controller.js');

router.get('/', (req, res, next) => {
    product.getAllProducts(req, (result) => {
        res.send(result);
    });
});

module.exports = router;