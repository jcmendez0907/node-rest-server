require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded middleware
app.use(bodyParser.urlencoded({ extended: false }));

app.use(require('./routes/usuario'));

mongoose.connect(process.env.URLDB, (err, resp) => {
    if (err)
        throw err;
    console.log('Base de datos online');

});

app.listen(process.env.PORT, () => {
    console.log('escucnado en el puerto ', process.env.PORT);
})