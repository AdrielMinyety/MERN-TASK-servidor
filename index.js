const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

// crear servidor
// make server
const app = express();

// conectar a la base de datos
// conect to DataBase
conectarDB();

// habilitar express.json
// enabling express.json
app.use( express.json({ extended: true }) );

// puerto de la app
// app's port
const port = process.env.PORT || 3001;

// settings
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// habilitar CORS
// use CORS
app.use( cors() );

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
