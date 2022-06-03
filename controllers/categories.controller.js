const Category = require("../models/Category.model");

module.exports.categoriesController = {
    postcategory: async (req, res) => {
        try {
            const category = await Category.create({
                name: req.body.name
            });
            res.json(category)
        } catch (error) {
            res.json(error.message)
        }
    },
    patchCategory: async (req, res) => {
        try {
            const category = await Category.findByIdAndUpdate(req.params.id, {
                name: req.body.name
            });
            res.json(category);
        } catch (error) {
            res.json(error.message)
        }
    },
    deleteCategory: async (req, res) => {
        try {
            await Category.findByIdAndRemove(req.params.id);
            res.json("категория удалена")
        } catch (error) {
            res.json(error.message)
        }
    },
    getCategory: async (req, res) => {
        try {
            const category = await Category.find();
            res.json(category);
        } catch (error) {
            res.json(error.message)
        }
    }
}