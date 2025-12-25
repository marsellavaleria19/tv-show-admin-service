const { Sequelize } = require('sequelize');

const { MYSQLHOST, MYSQLUSER, MYSQLPASSWORD, MYSQLDATABASE,MYSQLPORT } = process.env;
const sequelize = new Sequelize(MYSQLDATABASE, MYSQLUSER, MYSQLPASSWORD, {
  host: MYSQLHOST,
  port:MYSQLPORT,
  dialect: 'mysql'
});

console.log('MYSQL CONFIG:', {
  host: process.env.MYSQLHOST,
  port: process.env.MYSQLPORT,
  db: process.env.MYSQLDATABASE,
  user: process.env.MYSQLUSER,
})

module.exports = sequelize;