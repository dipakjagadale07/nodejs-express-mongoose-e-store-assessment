const Product = require('../models/product.model.js');


exports.getAllProducts = async (req, res) => {
    try {
        let products = await Product.find({});
        res({
            products
        })
    } catch (error) {
        console.log("Error while fetching all products - ", error);
        res({
            success: false,
            message: 'Error while fetching all products.'
        });
    }
};

exports.getAllProductsByCategory = async (req, res) => {
    try {
        let products = await Product.find({ category: req.params.category });
        res({
            products
        })
    } catch (error) {
        console.log("Error while fetching products by category - ", error);
        res({
            success: false,
            message: 'Error while fetching products by category'
        });
    }
};