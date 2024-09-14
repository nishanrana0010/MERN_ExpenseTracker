const express = require("express");
const categoryController = require("../contollers/categoryController");

const router = express.Router();

router.get("/", categoryController.getCategories);
router.post("/", categoryController.addCategory);
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
