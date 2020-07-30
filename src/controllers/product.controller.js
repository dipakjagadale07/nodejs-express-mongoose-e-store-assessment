const Product = require('../models/product.model.js');
const Cart = require('../models/cart.model.js');

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

exports.addToCart = async (req, res) => {
    try {
        let newItem = {
            product: req.params.product,
            quantity: req.body.quantity
        };
        let cart = await Cart.findOneAndUpdate({ user: "req.decoded.userId" }, { $push: { items: newItem } }, { "new": true });
        if (!cart) {
            cart = await Cart.create({
                user: req.decoded.userId,
                items: [newItem]
            });
        }
        res(cart);
    } catch (error) {
        console.log("Error while adding product to cart - ", error);
        res({
            success: false,
            message: 'Error while adding product to cart.'
        });
    }
};