// contiene una representación de los datos que maneja el sistema, su lógica de negocio, y sus mecanismos de persistencia.
// --------
// It contains a representation of the data handled by the system, its business logic, and its persistence mechanisms.

const mongoose = require('mongoose');

// Crear Esquema
// make scheme
const ProyectoSchema = mongoose.Schema({
    nombre : {
        type : String,
        trim : true,
        required : true
    },
    creador : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Usuario'
    },
    creado : {
        type : Date,
        default : Date.now()
    }
});

module.exports = mongoose.model('Proyecto', ProyectoSchema);