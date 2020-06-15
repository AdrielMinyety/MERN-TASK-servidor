// Modelo
const Tarea = require('../models/Tarea');
const Proyecto = require('../models/Proyecto');

// express validator
const { validationResult } = require('express-validator');

// create task
exports.crearTarea = async (req, res) => {
    // ver si hay errores
    // watch if there are errors
    const errores = validationResult(req);
    
    // if hay error, retornar error(es)
    // if there's error, return error(s)
    if( !errores.isEmpty() ){
        return res.status(400).json({ errores : errores.array() })
    }
    
    try {
        // extraer dato enviado
        // extract data submited
        const { proyecto } = req.body;

        // ver si existe el proyecto en la BD
        // watch if the project exists in DB
        const proyectoBD = await Proyecto.findById(proyecto);
        if (!proyectoBD) {
            return res.status(404).json({msg : 'Proyecto no encontrado'});
        }

        // ver si es el usuario autenticado
        // watch if is the owner user
        if(proyectoBD.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({msg : 'No autorizado' });
        }

        // crear tarea
        // create task
        const tarea = Tarea(req.body);
        await tarea.save();

        res.json({
            msg : 'Tarea creada',
            tarea
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al crear tarea');
    }
}

// get task
exports.obtenerTareas = async (req, res) => {
    try {
        // extraer dato enviado
        // extract data submited
        const { proyecto } = req.query;

        // ver si existe el proyecto en la BD
        // watch if the project exists in DB
        const proyectoBD = await Proyecto.findById(proyecto);
        if (!proyectoBD) {
            return res.status(404).json({msg : 'Proyecto no encontrado'});
        }

        // ver si es el usuario autenticado
        // watch if is the owner user
        if(proyectoBD.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({msg : 'No autorizado' });
        }

        // obtener tareas
        // get tasks
        const tareas = await Tarea.find({ proyecto }).sort({_id: -1});
        res.json({ tareas });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg : 'Error al obtener tarea'})
    }
}

// update task
exports.actualizarTarea = async (req, res) => {
    try {

        // extraer dato enviado
        // extract data submited
        const { proyecto, nombre, estado } = req.body;
        if(!proyecto) res.status(500).json({msg : 'No hay datos para editar'});

        // ver si existe la tarea en la BD
        // watch if the task exists in DB
        let tarea = await Tarea.findById(req.params.id);
        if (!tarea) {
            return res.status(404).json({msg : 'Tarea no encontrada'});
        }
        
        // ver si es el usuario autenticado
        // watch if is the owner user
        const proyectoBD = await Proyecto.findById(proyecto);
        
        if(proyectoBD.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({msg : 'No autorizado' });
        }

        // crear objeto con nueva informacion
        const nuevaTarea = {};

        // detectar que dato cambia
        // detect which data has changed
        nuevaTarea.nombre = nombre;
        nuevaTarea.estado = estado;

        // guardar cambios
        // save changes
        tarea = await Tarea.findOneAndUpdate({_id : req.params.id}, nuevaTarea, { new : true });

        res.json({
            msg : 'tarea actualizada',
            tarea
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg : 'Error al actualizar tarea'})
    }
};

// delete task
exports.eliminarTarea = async (req, res) => {
    try {
        // extraer dato enviado
        // extract data submited
        const { proyecto } = req.query;
        if(!proyecto) res.status(500).json({msg : 'No hay dato para eliminar'});

        // ver si existe la tarea en la BD
        // watch if the task exists in DB
        let tarea = await Tarea.findById(req.params.id);
        if (!tarea) {
            return res.status(404).json({msg : 'Tarea no encontrada'});
        }
        
        // ver si es el usuario autenticado
        // watch if is the owner user
        const proyectoBD = await Proyecto.findById(proyecto);
        
        if(proyectoBD.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({msg : 'No autorizado' });
        }

        // Eliminar tarea
        // delete task
        await Tarea.findOneAndDelete( {_id : req.params.id} );
        res.json({msg : 'Tarea eliminada'});

    } catch (error) {
        console.log(error);
        res.status(500).json({msg : 'Error al borrar tarea'});
    }
}