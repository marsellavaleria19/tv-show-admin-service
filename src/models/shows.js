const Sequelize = require("sequelize");
const sequelize = require("../helpers/database");
const Categories = require("./categories");

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

Categories.hasMany(Shows);
Shows.belongsTo(Categories, {
  foreignKey: "categoryId",
});


module.exports = Shows;
