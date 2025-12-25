const Sequelize = require("sequelize")
const sequelize = require("../helpers/database")

const Category = sequelize.define("categories", {
    name: {
        type: Sequelize.STRING,
    },
})

module.exports = Category