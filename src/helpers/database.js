const { Sequelize } = require('sequelize');

const { MYSQLHOST, MYSQLUSER, MYSQLPASSWORD, MYSQLDATABASE } = process.env;
const sequelize = new Sequelize(MYSQLDATABASE, MYSQLUSER, MYSQLPASSWORD, {
  host: MYSQLHOST,
  dialect: 'mysql'
});

module.exports = sequelize;