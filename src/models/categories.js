const Sequelize = require("sequelize")
const sequelize = require("../helpers/database")

const Categories = sequelize.define("categories", {
    name: {
        type: Sequelize.STRING,
    },
})

module.exports = Categories