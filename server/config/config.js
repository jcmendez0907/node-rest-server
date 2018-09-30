// =================================
// Puerto
// =================================
process.env.PORT = process.env.PORT || 3000;


// =================================
// Entorno
// =================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// =================================
// Base de datos
// =================================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

//urlDB = 'mongodb://cafe-user:As123456@ds133597.mlab.com:33597/jcmendez0907-cafe';
process.env.URLDB = urlDB;