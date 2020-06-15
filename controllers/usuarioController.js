// actúa como intermediario entre el Modelo y la Vista, gestionando el flujo de información entre ellos y las transformaciones para adaptar los datos a las necesidades de cada uno.
// ---------------
// it acts as an intermediary between the Model and the View, managing the flow of information between them and the transformations to adapt the data to the needs of each one.

// -----------------------------------

// modelo
const Usuario = require('../models/Usuario');

// tool
const bcryptjs = require('bcryptjs');

// las reglas de express-validator van en el routing y los resultados se leen en el controlador
// the express-validator's rules must to be in routing and the results in the controller
const { validationResult } = require('express-validator');

// JsonWebToken para crear y firmar token
const jwt = require('jsonwebtoken');

// -----------------------------------

exports.crearUsuario = async (req, res) => {
    
    // ver si hay errores
    // watch if there are errors
    const errores = validationResult(req);
    // if hay error, retornar error(es)
    // if there's error, return error(s)
    if( !errores.isEmpty() ){
        return res.status(400).json({ errores : errores.array() })
    }

    // extraer email y password
    // extract email and password
    const { email, password } = req.body;

    try {

        // Revisar que el usuario registrado sea unico
        // look for if user is unique
        let usuario = await Usuario.findOne({ email });

        if(usuario){
            return res.status(400).json({
                errores : [
                    {
                        msg: "El usuario ya existe",
                        value: email
                    }
                ]
            });
        }

        // crear nuevo usuario
        // make new User
        usuario = new Usuario(req.body);

        // encriptrar password
        // encrypting password
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash( password, salt );

        // guardar usuario
        // save user
        await usuario.save();

        // crear y firmar JWT
        // -- (usuario.id) viene del usuario que se esta guardando (await usuario.save();)
        // -- (usuario.id) comes from the user is saving (await usuario.save();)
        const payload = {
            usuario : {
                id : usuario.id
            }
            // guardando el id del usuario en el token, podremos validar y extraer los proyectos del usuario
            // saving the user's id in the token, we'll can validate and extract the user's proyects
        };

        // firmar
        // la keyPrivada (process.env.SECRETA) es para que sean la misma al crear y autenticar usuario.
        // the privacyKey (process.env.SECRETA) is because it must to be the same to make and authenticate the user.
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn : 3600
        }, (error, token) => {
            if(error) throw error;
            // Mensaje de confirmacion
            // success message
            res.json({ token });
        });

    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error en crear Usuario');
    }
}