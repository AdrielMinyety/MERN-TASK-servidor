const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

// crear servidor
// make server
const app = express();

// conectar a la base de datos
// conect to DataBase
conectarDB();

// habilitar CORS
// use CORS
app.use(cors());

// habilitar express.json
// enabling express.json
app.use( express.json({ extended: true }) );

// puerto de la app
// app's port
const PORT = 4000;

// importar rutas
// import routes
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tareas'));

// arrancar la app
// runing the app
app.listen(PORT, () => {
    console.log(`El servidor está en el puerto ${PORT}`)
});