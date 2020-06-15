const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

// crear servidor
// make server
const app = express();

// conectar a la base de datos
// conect to DataBase
conectarDB();

// Establecer una lista blanca y comprobarlo
// Set up a whitelist and check against it:
var whitelist = ['https://eloquent-jang-b81985.netlify.app/'];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

// habilitar CORS
// use CORS
app.use(cors(corsOptions));

// habilitar express.json
// enabling express.json
app.use( express.json({ extended: true }) );

// puerto de la app
// app's port
const port = process.env.port || 4000;

// importar rutas
// import routes
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tareas'));

// arrancar la app
// runing the app
app.listen(port, '0.0.0.0', () => {
    console.log(`El servidor está en el puerto ${port}`);
});
