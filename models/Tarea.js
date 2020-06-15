// contiene una representación de los datos que maneja el sistema, su lógica de negocio, y sus mecanismos de persistencia.
// --------
// It contains a representation of the data handled by the system, its business logic, and its persistence mechanisms.

const mongoose = require('mongoose');

// Crear Esquema
// make scheme
const TareaSchema = mongoose.Schema({
    nombre : {
        type : String,
        trim : true,
        required : true
    },
    estado : {
        type : Boolean,
        default : false
    },
    creado : {
        type : Date,
        default : Date.now()
    },
    proyecto : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Proyecto'
    }
});

module.exports = mongoose.model('Tarea', TareaSchema);