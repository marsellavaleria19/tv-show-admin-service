const Sequelize = require("sequelize")
const Shows = require("../models/category")

exports.getAllCategories = async (req, res) => {
  try {
    const results = await Shows.findAll()
    return res.json({
      success: true,
      message: "List all categories",
      data:results
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      success: false,
      message: "Unexpected Error",
    })
  }
}