const { Sequelize } = require('sequelize');

const { MYSQLHOST, MYSQLUSER, MYSQLPASSWORD, MYSQLDATABASE,MYSQLPORT } = process.env;
const sequelize = new Sequelize(MYSQLDATABASE, MYSQLUSER, MYSQLPASSWORD, {
  host: MYSQLHOST,
  port:MYSQLPORT,
  dialect: 'mysql'
});

module.exports = sequelize;