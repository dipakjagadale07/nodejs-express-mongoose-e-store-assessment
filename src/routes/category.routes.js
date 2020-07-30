var express = require('express');
var router = express.Router();

const category = require('../controllers/category.controller.js');

router.get('/', (req, res, next) => {
    category.getAllCategories(req, (result) => {
        res.send(result);
    });
});

module.exports = router;