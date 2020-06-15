// Modelo
const Proyecto = require('../models/Proyecto');
const Tarea = require('../models/Tarea');

// las reglas de express-validator van en el routing y los resultados se leen en el controlador
// the express-validator's rules must to be in routing and the results in the controller
const { validationResult } = require('express-validator');

// create project
exports.crearProyecto = async (req, res) => {

    // ver si hay errores
    // watch if there are errors
    const errores = validationResult(req);
    
    // if hay error, retornar error(es)
    // if there's error, return error(s)
    if( !errores.isEmpty() ){
        return res.status(400).json({ errores : errores.array() })
    }

    try {
        // crear nuevo proyecto
        // create new project
        const proyecto = new Proyecto(req.body);

        // guardar creador del proyecto via JWT
        // save project's owner through JWT
        proyecto.creador = req.usuario.id;

        // guardar proyecto
        // save project
        proyecto.save();

        // notificar
        // notify
        res.json({
            msg: "Proyecto Agregado",
            proyecto 
        })

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al crear proyecto');
    }
}

// obtener proyectos del usuario
// get user's projects
exports.obtenerProyectos = async (req, res) => {
    try {
        // obtener de la BD
        // get from the DB
        const proyectos = await Proyecto.find({creador : req.usuario.id}).sort({_id: -1});

        res.json({ proyectos });
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al obtener proyectos');
    }
}

//Actualiza un proyecto
// Update project
exports.actualizarProyecto = async (req, res) => {
    
    // ver si hay errores
    // watch if there are errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errores: errors.array()
        });
    }
 
    // extraer datos del proyecto
    // extract data from the project
    const {nombre} = req.body;
    const nuevoProyecto = {};
 
    // si hay datos para actualizar, cambiar
    // if there is data to update, change
    if (nombre) {
        nuevoProyecto.nombre = nombre;
    }
 
    try {
 
        // revisar el ID del proyecto
        // check project's ID
        await Proyecto.findById(req.params.id, (err, proyecto) => {
 
            // si el proyecto existe o no
            // if the project exist or not
            if (err || !proyecto) {
                return res.status(404).json({
                    msg: 'Proyecto no encontrado'
                });
            }
 
            // verificar el creador del proyecto
            // verify the project's manager (owner)
            if (proyecto.creador.toString() !== req.usuario.id) {
                return res.status(401).json({
                    msg: 'No Autorizado'
                });
            }
        });
 
        // actualizar
        // update
        let proyectoActualizado = await Proyecto.findByIdAndUpdate(
            {_id: req.params.id}, {$set: nuevoProyecto}, {new: true});
 
        res.json({
            msg: "Proyecto actualizado",
            proyectoActualizado 
        });
 
 
    } catch (e) {
        console.log(e)
        res.status(500).send('Error al actualizar proyecto');
    }
}

//Eliminar un proyecto
// Delete project
exports.eliminarProyecto = async (req, res) => {
    try {
 
        // revisar el ID del proyecto
        // check project's ID
        await Proyecto.findById(req.params.id, (err, proyecto) => {
            
            // si el proyecto existe o no
            // if the project exist or not
            if (err || !proyecto) {
                return res.status(404).json({
                    errores : [
                        {msg: 'Proyecto no encontrado'}
                    ]
                });
            }
 
            // verificar el creador del proyecto
            // verify the project's manager (owner)
            if (proyecto.creador.toString() !== req.usuario.id) {
                return res.status(401).json({
                    msg: 'No Autorizado'
                });
            }
        });
 
        // Eliminar
        // Delete
        await Proyecto.findOneAndDelete({ _id : req.params.id });
        // eliminar las tareas de ese proyecto
        // delete tasks in that project
        await Tarea.deleteMany({proyecto : req.params.id});
 
        res.json( { msg: "Proyecto eliminado"} );
 
 
    } catch (e) {
        console.log(e)
        res.status(500).send('Error al eliminar proyecto');
    }
}