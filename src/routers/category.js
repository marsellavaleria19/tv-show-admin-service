const category = require("express").Router()

const categoryController = require("../controllers/category")

category.get("/", categoryController.getAllCategories)

module.exports = category