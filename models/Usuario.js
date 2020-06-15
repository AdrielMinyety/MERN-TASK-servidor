// contiene una representación de los datos que maneja el sistema, su lógica de negocio, y sus mecanismos de persistencia.
// --------
// It contains a representation of the data handled by the system, its business logic, and its persistence mechanisms.

const mongoose = require('mongoose');

// Crear Esquema
// make scheme
const UsuarioSchema = mongoose.Schema({
    nombre : {
        type : String,
        require : true,
        trim : true
    },
    email : {
        type : String,
        require : true,
        trim : true,
        unique : true
    },
    password : {
        type : String,
        require : true,
        trim : true
    },
    registro : {
        type : Date,
        default : Date.now()
    }
});

// export models
module.exports = mongoose.model('Usuario', UsuarioSchema);