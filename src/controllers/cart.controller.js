const Cart = require('../models/cart.model.js');

exports.addToCart = async (req, res) => {
    try {
        let newItem = {
            product: req.params.product,
            quantity: req.body.quantity
        };
        let cart = await Cart.findOneAndUpdate({ user: req.decoded.userId }, { $push: { items: newItem } }, { "new": true });
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

exports.getCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.decoded.userId })
            .populate('items.product');
        res({
            cart
        })
    } catch (error) {
        console.log("Error while fetching cart for user - ", error);
        res({
            success: false,
            message: 'Error while fetching cart items.'
        });
    }
};