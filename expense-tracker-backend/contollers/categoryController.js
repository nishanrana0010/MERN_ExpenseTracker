const Category = require("../models/Category");

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).send("Error fetching categories");
  }
};

exports.addCategory = async (req, res) => {
  try {
    const { type, name } = req.body;
    const category = new Category({ type, name });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(400).send("Error adding category");
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).send("Category not found");
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send("Error deleting category");
  }
};
