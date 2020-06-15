const express = require('express');
const router = express.Router();

// controller
const usuarioController = require('../controllers/usuarioController');

// las reglas de express-validator van en el routing y los resultados se leen en el controlador
// the express-validator's rules must to be in routing and the results in the controller
const { check } = require('express-validator'); 

// crear usuario
// make user
// --Endpoint > api/usuarios
router.post('/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'Debe ser un email válido').isEmail(),
        check('password', 'Contraseña muy debil').isLength({ min:8 })
    ]
    ,
    usuarioController.crearUsuario
);

module.exports = router;