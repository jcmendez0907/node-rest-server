require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

const path = require('path');

// parse application/x-www-form-urlencoded middleware
app.use(bodyParser.urlencoded({ extended: false }));

//habilitar public
app.use(express.static(path.resolve(__dirname, '../public')));


app.use(require('./routes/index'));

mongoose.connect(process.env.URLDB, (err, resp) => {
    if (err)
        throw err;
    console.log('Base de datos online');

});

app.listen(process.env.PORT, () => {
    console.log('escucnado en el puerto ', process.env.PORT);
})