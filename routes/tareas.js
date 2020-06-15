const express = require('express');
const router = express.Router();

// middleware
const authUser = require('../middleware/authUser');

// controller
const tareasController = require('../controllers/tareasController');

// las reglas de express-validator van en el routing y los resultados se leen en el controlador
// the express-validator's rules must to be in routing and the results in the controller
const { check } = require('express-validator');

// crear tarea
// make tarea
// --Endpoint > api/tareas
router.post('/',
    authUser,
    [
        check('nombre', 'Nombre obligatorio').not().isEmpty(),
        check('proyecto', 'Proyecto obligatorio').not().isEmpty()
    ],
    tareasController.crearTarea
);

// obtener tareas
// get tasks
router.get('/',
    authUser,
    tareasController.obtenerTareas
);

// actualizar tarea
// update task
router.put('/:id',
    authUser,
    tareasController.actualizarTarea
); 

// eliminar tarea
// delete task
router.delete('/:id',
    authUser,
    tareasController.eliminarTarea
);

module.exports = router;