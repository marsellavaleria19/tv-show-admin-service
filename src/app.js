require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require("./helpers/database");



var app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors());

sequelize.authenticate()
  .then(() => console.log('MySQL connected!'))
  .catch(err => console.error('MySQL connection error:', err));

// add table to database
sequelize.sync()
  .then(() => console.log('Table created / synced'))
  .catch(err => console.error(err))


app.use('/tv-show',require('./routers'));

const { PORT, APP_PORT } = process.env;

app.listen(PORT || APP_PORT, () => {
    console.log(`App running on port ${PORT||APP_PORT}`);
});

