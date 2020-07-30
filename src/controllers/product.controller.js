const Product = require('../models/product.model.js');

exports.getAllProducts = async (req, res) => {
    try {
        let products = await Product.find({});
        res({
            products
        })
    } catch (error) {
        res({
            status: 500,
            message: error
        })
    }
};