const express = require('express');
const router = express.Router();

// controller
const authController = require('../controllers/authController');

// middleware
const authUser = require('../middleware/authUser');

// las reglas de express-validator van en el routing y los resultados se leen en el controlador
// the express-validator's rules must to be in routing and the results in the controller
const { check } = require('express-validator'); 

// iniciar sesion
// log in
// --Endpoint > api/auth
router.post('/',
    [
        check('email', 'Debe ser un email válido').isEmail()
    ]
    ,
    authController.autenticarUsuario
);

// obtiener usuario autenticado
// get authenticated user
router.get('/',
    authUser,
    authController.obtenerUsuarioAutenticado
);

module.exports = router;