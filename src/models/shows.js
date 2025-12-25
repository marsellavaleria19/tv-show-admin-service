const Sequelize = require("sequelize");
const sequelize = require("../helpers/database");
const Category = require("./category.js");

const Shows = sequelize.define("shows", {
  id_show: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      notEmpty: {
        msg: "Name cannot be empty!",
      },
    },
  },
  name_show: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: {
        msg: "Name cannot be empty!",
      },
    },
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  premier_at: {
    type: Sequelize.DATE,
    validate: {
      notEmpty: {
        msg: "Premier date cannot be empty!",
      },
    },
  },
  last_synced_at: {
    type: Sequelize.DATE,
    allowNull: true,
    defaultValue: null,
  },
});

Category.hasMany(Shows);
Shows.belongsTo(Category, {
  foreignKey: "categoryId",
});


module.exports = Shows;
