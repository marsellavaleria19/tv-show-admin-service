const express = require('express');
const cors = require('cors');

require('dotenv').config();
var app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use('/tv-show',require('./routers'));

const { PORT, APP_PORT } = process.env;

app.listen(PORT || APP_PORT, () => {
    console.log(`App running on port ${PORT||APP_PORT}`);
});

