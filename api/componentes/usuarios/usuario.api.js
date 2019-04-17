'use strict';

const Tiza = require('chalk');

const ModelUsuarios = require('./usuario.model');
const ModelUsuarioAdmin = require('./../administrador/admin.model');
const ModelUsuarioCentro = require('./../centro_educativo/centroEducativo.model');
const ModelUsuarioPadre = require('./../registro_padre/registro_padre_model');

module.exports.obtener_todos_usuarios = async (req, res) => {
    try {
        const resultado = await ModelUsuarios.find().sort({ _id: 'desc' });
        const cantidad = Object.keys(resultado).length;
        if (cantidad > 0) {
            let obtenerResultado = [];
            const has = Object.prototype.hasOwnProperty;
            let key;
            for (key in resultado) {
                if (!has.call(resultado, key)) continue;
                obtenerResultado.push({
                    'id': resultado[key]['_id'] || 0,
                    'correo': resultado[key]['correo'] || '',
                    'contrasena': resultado[key]['contrasena'] || '',
                    'tipo': resultado[key]['tipo'] || '',
                    'aprobado': resultado[key]['aprobado'] || false,
                    'activo': resultado[key]['activo'] || false,
                    'pin': resultado[key]['pin'] || '',
                    'fechaCreado': resultado[key]['fechaCreado'] || '',
                    'fechaActualizado': resultado[key]['fechaActualizado'] || '',
                });
            }
            res.json({
                success: true,
                message: obtenerResultado
            });
        } else {
            res.json({
                success: false,
                message: 'No se encontraron usuarios'
            });
        }
    } catch (err) {
        console.log(Tiza.bold.yellow.bgBlack('Error al obtener los usuarios:'));
        console.log(Tiza.bold.yellow.bgBlack(err));
        res.json({
            success: false,
            message: 'Error al obtener los usuarios'
        });
    }
};

module.exports.obtener_usuarios_activos = async (req, res) => {
    try {
        const resultado = await ModelUsuarios.find({ activo: true }).sort({ _id: 'desc' });
        const cantidad = Object.keys(resultado).length;
        if (cantidad > 0) {
            let obtenerResultado = [];
            const has = Object.prototype.hasOwnProperty;
            let key;
            for (key in resultado) {
                if (!has.call(resultado, key)) continue;

                //El usuario se activa cuando se envía la contraseña, no debe estar vacia.
                const laContrasena = resultado[key]['contrasena'] || '';

                if (laContrasena.trim().length > 0) {
                    obtenerResultado.push({
                        'id': resultado[key]['_id'] || 0,
                        'correo': resultado[key]['correo'] || '',
                        'contrasena': laContrasena || '',
                        'tipo': resultado[key]['tipo'] || '',
                        'aprobado': resultado[key]['aprobado'] || false,
                        'activo': resultado[key]['activo'] || false,
                        'pin': resultado[key]['pin'] || '',
                        'fechaCreado': resultado[key]['fechaCreado'] || '',
                        'fechaActualizado': resultado[key]['fechaActualizado'] || '',
                    });
                }
            }
            res.json({
                success: true,
                message: obtenerResultado
            });
        } else {
            res.json({
                success: false,
                message: 'No se encontraron usuarios activos'
            });
        }
    } catch (err) {
        console.log(Tiza.bold.yellow.bgBlack('Error al obtener los usuarios activos:'));
        console.log(Tiza.bold.yellow.bgBlack(err));
        res.json({
            success: false,
            message: 'Error al obtener los usuarios activos'
        });
    }
};


//Este lo ocupamos en la segunda iteración// 
//cuando un centro educ. se registra se debe notificar al administrador. la lista con el nombre, cedula juridica, provincia, canton, distrito.

module.exports.obtener_usuarios_pendientes = async (req, res) => {
    try {
        const filtros = { aprobado: false, tipo: 'CentroEducativo' };
        const resultado = await ModelUsuarios.find(filtros).sort({ _id: 'asc' });
        const cantidad = Object.keys(resultado).length;
        if (cantidad > 0) {
            let obtenerResultado = [];
            const has = Object.prototype.hasOwnProperty;
            let key;
            for (key in resultado) {
                if (!has.call(resultado, key)) continue;

                // Si el pin existe es porque está pendiente de aprobar por el admin
                const elPin = resultado[key]['pin'] || '';

                if (elPin.trim().length > 0) {
                    obtenerResultado.push({
                        'id': resultado[key]['_id'] || 0,
                        'correo': resultado[key]['correo'] || '',
                        'contrasena': resultado[key]['contrasena'] || '',
                        'tipo': resultado[key]['tipo'] || '',
                        'aprobado': resultado[key]['aprobado'] || false,
                        'activo': resultado[key]['activo'] || false,
                        'pin': elPin,
                        'fechaCreado': resultado[key]['fechaCreado'] || '',
                        'fechaActualizado': resultado[key]['fechaActualizado'] || '',
                    });
                }
            }
            res.json({
                success: true,
                message: obtenerResultado
            });
        } else {
            res.json({
                success: false,
                message: 'No se encontraron usuarios pendientes'
            });
        }
    } catch (err) {
        console.log(Tiza.bold.yellow.bgBlack('Error al obtener los usuarios pendientes:'));
        console.log(Tiza.bold.yellow.bgBlack(err));
        res.json({
            success: false,
            message: 'Error al obtener los usuarios pendientes'
        });
    }
};

module.exports.validar_credenciales = (req, res) => {

    // Buscamos si el correo existe en la tabla de usuarios.
    // Le añadimos async para que más abajo en el código se pueda utilizar await.
    ModelUsuarios.findOne({ correo: req.body.correo }).then(async usuario => {

        // Validamos si el valor retornado no es indefinido:
        if (usuario) {

            //Comparamos la contraseña que envían contra la de la base de datos:
            if (usuario.contrasena === req.body.contrasena) {

                // Declaramos la variable que va a devolver el resultado final:
                let responder = {};

                //Obtener el nombre del usuario y el id de acuerdo al tipo:
                let nombreUsuario = '';
                let idUsuario = '';

                //Realizamos un switch de acuerdo al tipo de usuario que retornó la base de datos en la tabla de usuario:
                switch (usuario.tipo) {
                    case 'SuperAdmin':

                        // Guardamos en una variable el objeto retornado.
                        // Aquí con await lo que hacemos es ESPERAR el resultado que se obtiene de la base de datos y almacenarlo en la constante ObjAdmin.
                        //El select se utiliza para indicar cuales columnas queremos obtener.
                        const ObjAdmin = await ModelUsuarioAdmin.findOne({ correo: req.body.correo }).select('nombre1 nombre2 apellido1 apellido2');

                        //Validamos que el resultado no sea nulo:
                        if (null !== ObjAdmin) {

                            // obtenemos la cantidad de propiedades del objeto (es como decir: filas)
                            const cantObjAdmin = Object.keys(ObjAdmin).length;

                            // si la cantidad es mayor a cero:
                            if (cantObjAdmin > 0) {

                                //Guardamos el id del SuperAdmin
                                idUsuario = ObjAdmin._id;

                                //Guardamos el primer nombre del SuperAdmin
                                nombreUsuario += ObjAdmin.nombre1;

                                //Si acaso existe el segundo nombre del SuperAdmin (ya que es opcional) entonces lo añadimos seguidamente del primer nombre:
                                if ('undefined' !== typeof ObjAdmin.nombre2 && ObjAdmin.nombre2.length > 0) {
                                    nombreUsuario += ' ' + ObjAdmin.nombre2;
                                }

                                //Añadimos el primer apellido del SuperAdmin
                                nombreUsuario += ' ' + ObjAdmin.apellido1;

                                //Si acaso existe el segundo apellido del SuperAdmin (ya que es opcional) entonces lo añadimos seguidamente del primer apellido:
                                if ('undefined' !== typeof ObjAdmin.apellido2 && ObjAdmin.apellido2.length > 0) {
                                    nombreUsuario += ' ' + ObjAdmin.apellido2;
                                }

                                // creamos la respuesta en caso de ser SuperAdmin:
                                responder = {
                                    success: true,
                                    message: {
                                        id: idUsuario,
                                        tipoUsuario: usuario.tipo,
                                        nombreUsuario: nombreUsuario
                                    }
                                };
                            } else {

                                //Si no se encontraron resultados es porque el usuario no existe:
                                responder = {
                                    success: false,
                                    message: 'El usuario no existe'
                                };
                            }
                        } else {

                            //Si no obtuvimos respuesta de la base de datos, asumimos que el usuario no existe:
                            responder = {
                                success: false,
                                message: 'El usuario no existe'
                            };
                        }
                        break;
                    case 'CentroEducativo':

                        // Guardamos en una variable el objeto retornado.
                        // Aquí con await lo que hacemos es ESPERAR el resultado que se obtiene de la base de datos y almacenarlo en la constante ObjCentro.
                        //El select se utiliza para indicar cuales columnas queremos obtener.
                        const ObjCentro = await ModelUsuarioCentro.findOne({ correo: req.body.correo }).select('contacto nombre');

                        //Validamos que el resultado no sea nulo:
                        if (null !== ObjCentro) {

                            // obtenemos la cantidad de propiedades del objeto (es como decir: filas)
                            const cantObjCentro = Object.keys(ObjCentro).length || 0;

                            // si la cantidad es mayor a cero:
                            if (cantObjCentro > 0) {

                                //Guardamos el id del CentroEducativo:
                                idUsuario = ObjCentro._id;

                                //contacto es un array de objetos (así se declaró en el model del centro educativo), entonces lo recorremos con un forEach. 
                                //El foreach ejecuta una función que recibe como parámetro el item obtenido de acuerdo al index interno que está recorriendo el forEach.
                                // Ese item yo lo llamé obj porque en este caso es un objeto (contacto es un array de OBJETOS).
                                //El parámetro (obj) que recibe esa función lo envía el forEach automaticamente.
                                ObjCentro.contacto.forEach((obj) => {

                                    //Guardamos el primer nombre del CentroEducativo
                                    nombreUsuario += obj.primerNombre;

                                    //Si acaso existe el segundo nombre del CentroEducativo (ya que es opcional) entonces lo añadimos seguidamente del primer nombre:
                                    if ('undefined' !== typeof obj.segundoNombre && obj.segundoNombre.length > 0) {
                                        nombreUsuario += ' ' + obj.segundoNombre;
                                    }

                                    //Añadimos el primer apellido del CentroEducativo
                                    nombreUsuario += ' ' + obj.primerApellido;

                                    //Si acaso existe el segundo apellido del CentroEducativo (ya que es opcional) entonces lo añadimos seguidamente del primer apellido:
                                    if ('undefined' !== typeof obj.segundoApellido && obj.segundoApellido.length > 0) {
                                        nombreUsuario += ' ' + obj.segundoApellido;
                                    }
                                });

                                // creamos la respuesta en caso de ser CentroEducativo, incluye el nombre del centro educativo:
                                responder = {
                                    success: true,
                                    message: {
                                        id: idUsuario,
                                        tipoUsuario: usuario.tipo,
                                        nombreUsuario: nombreUsuario,
                                        nombreInstitucion: ObjCentro.nombre
                                    }
                                };
                            } else {

                                //Si no se encontraron resultados es porque el usuario no existe:
                                responder = {
                                    success: false,
                                    message: 'El usuario no existe'
                                };
                            }
                        } else {

                            //Si no obtuvimos respuesta de la base de datos, asumimos que el usuario no existe:
                            responder = {
                                success: false,
                                message: 'El usuario no existe'
                            };
                        }

                        break;
                    case 'PadreFamilia':

                        // Guardamos en una variable el objeto retornado.
                        // Aquí con await lo que hacemos es ESPERAR el resultado que se obtiene de la base de datos y almacenarlo en la constante ObjPadre.
                        //El select se utiliza para indicar cuales columnas queremos obtener.
                        const ObjPadre = await ModelUsuarioPadre.findOne({ correo: req.body.correo }).select('nombre segundoNombre apellido segundoApellido');

                        //Validamos que el resultado no sea nulo:
                        if (null !== ObjPadre) {

                            // obtenemos la cantidad de propiedades del objeto (es como decir: filas)
                            const cantObjPadre = Object.keys(ObjPadre).length || 0;

                            // si la cantidad es mayor a cero:
                            if (cantObjPadre > 0) {

                                //Guardamos el id del PadreFamilia:
                                idUsuario = ObjPadre._id;

                                //Guardamos el primer nombre del PadreFamilia:
                                nombreUsuario += ObjPadre.nombre;

                                //Si acaso existe el segundo nombre del PadreFamilia (ya que es opcional) entonces lo añadimos seguidamente del primer nombre:
                                if ('undefined' !== typeof ObjPadre.segundoNombre && ObjPadre.segundoNombre.length > 0) {
                                    nombreUsuario += ' ' + ObjPadre.segundoNombre;
                                }

                                //Añadimos el primer apellido del PadreFamilia
                                nombreUsuario += ' ' + ObjPadre.apellido;

                                //Si acaso existe el segundo apellido del PadreFamilia (ya que es opcional) entonces lo añadimos seguidamente del primer apellido:
                                if ('undefined' !== typeof ObjPadre.segundoApellido && ObjPadre.segundoApellido.length > 0) {
                                    nombreUsuario += ' ' + ObjPadre.segundoApellido;
                                }

                                // creamos la respuesta en caso de ser PadreFamilia:
                                responder = {
                                    success: true,
                                    message: {
                                        id: idUsuario,
                                        tipoUsuario: usuario.tipo,
                                        nombreUsuario: nombreUsuario
                                    }
                                };


                            } else {

                                //Si no se encontraron resultados es porque el usuario no existe:
                                responder = {
                                    success: false,
                                    message: 'El usuario no existe'
                                };
                            }
                        } else {

                            //Si no obtuvimos respuesta de la base de datos, asumimos que el usuario no existe:
                            responder = {
                                success: false,
                                message: 'El usuario no existe'
                            };
                        }


                        break;
                    default:

                        //Si el tipo de usuario no es alguno de los anteriores (case), debemos dar alguna respuesta:
                        responder = {
                            success: false,
                            message: 'Tipo de usuario desconocido'
                        };
                        break;
                }

                //Finalmente enviamos la respuesta:
                res.json(responder);

            } else {
                res.json({
                    success: false,
                    message: 'Contraseña inválida'
                });
            }
        } else {
            res.json({
                success: false,
                message: 'El usuario no está registrado'
            });
        }
    }
    )
};

