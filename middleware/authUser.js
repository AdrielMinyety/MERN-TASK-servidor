const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // Leer el token del header
    // read token from header
    const token = req.header('x-auth-token');
    // console.log(token)

    // validar si no hay token
    // validate if there is not token
    if (!token) {
        return res.status(401).json({msg: 'No hay token, peticion cancelada'});
    }

    // validar token
    // validate token
    try {
        // descifrar token
        // decode token
        const cifrado = jwt.verify(token, process.env.SECRETA);

        // tomar los datos del token que fueron puestos desde el payload de la firma (JWT)
        // take the data from token where it was put in it from the sign's payload (JWT)
        req.usuario = cifrado.usuario;

        // siguiente middleware
        // next middleware
        next();
        
    } catch (error) {
        console.log(error);
        return res.status(401).json({msg: 'Token no valido'});
    }
}