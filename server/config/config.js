// =================================
// Puerto
// =================================
process.env.PORT = process.env.PORT || 3000;


// =================================
// Entorno
// =================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// =================================
// Venciminto token
// =================================
// 60 segundos
// 60 minutos
// 24 horas
// 30 dias
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;




// =================================
// SEED uathenticacion
// =================================
process.env.SEED = process.env.SEED || 'este-seed-desarrollo';


// =================================
// Base de datos
// =================================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

// =================================
// Google client ID
// =================================

process.env.CLIENT_ID = process.env.CLIENT_ID || '919408821814-soua7ljf69lrn9b524d5n722gogft3rj.apps.googleusercontent.com';