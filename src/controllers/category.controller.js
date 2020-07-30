const Category = require('../models/category.model.js');

exports.getAllCategories = async (req, res) => {
    try {
        let categories = await Category.find({});
        res({
            categories
        })
    } catch (error) {
        res({
            success: false,
            message: 'Error while fetching all Categories.'
        });
    }
};