const express = require('express');
const router = express.Router();

// middleware
const authUser = require('../middleware/authUser');

// controller
const proyectosController = require('../controllers/proyectosController');

// las reglas de express-validator van en el routing y los resultados se leen en el controlador
// the express-validator's rules must to be in routing and the results in the controller
const { check } = require('express-validator');

// crear proyecto
// make proyecto
// --Endpoint > api/proyectos
router.post('/',
    authUser,
    [
        check('nombre', 'Nombre obligatorio').not().isEmpty()
    ],
    proyectosController.crearProyecto
);

// obtener proyectos
// get projects
router.get('/',
    authUser,
    proyectosController.obtenerProyectos
);

// actualizar proyecto por ID
// update project by ID
router.put('/:id',
    authUser,
    [
        check('nombre', 'Nombre obligatorio').not().isEmpty()
    ],
    proyectosController.actualizarProyecto
);

// Eliminar proyecto
// Delete project
router.delete('/:id',
    authUser,
    proyectosController.eliminarProyecto
);


module.exports = router;