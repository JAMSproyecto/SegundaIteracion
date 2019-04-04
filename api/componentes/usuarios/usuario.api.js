'use strict';

const Tiza = require('chalk');

const ModelUsuarios = require('./usuario.model');
const ModelUsuarioAdmin = require('./../administrador/admin.model');
const ModelUsuarioCentro = require('./../centro_educativo/centroEducativo.model');
const ModelUsuarioPadre = require('./../registro_padre/registro_padre_model');

module.exports.obtener_todos_usuarios = async (req, res) => {
    try {
        const resultado = await ModelUsuarios.find().sort({_id: 'desc'});
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
        const resultado = await ModelUsuarios.find({activo: true}).sort({_id: 'desc'});
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
        const filtros = {aprobado: false, tipo: 'CentroEducativo'};
        const resultado = await ModelUsuarios.find(filtros).sort({_id: 'asc'});
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
    ModelUsuarios.findOne({correo: req.body.correo}).then(async usuario => {
            if (usuario) {
                if (usuario.contrasena === req.body.contrasena) {

                    let responder = {};

                    //Obtener el nombre del usuario y el id de acuerdo al tipo:
                    let nombreUsuario = '';
                    let idUsuario = '';
                    switch (usuario.tipo) {
                        case 'SuperAdmin' :

                            const ObjAdmin = await ModelUsuarioAdmin.findOne({correo: req.body.correo}).select('nombre1 nombre2 apellido1 apellido2');

                            if (null !== ObjAdmin) {
                                const cantObjAdmin = Object.keys(ObjAdmin).length;
                                if (cantObjAdmin > 0) {
                                    idUsuario = ObjAdmin._id;
                                    nombreUsuario += ObjAdmin.nombre1;
                                    if ('undefined' !== typeof ObjAdmin.nombre2 && ObjAdmin.nombre2.length > 0) {
                                        nombreUsuario += ' ' + ObjAdmin.nombre2;
                                    }
                                    nombreUsuario += ' ' + ObjAdmin.apellido1;
                                    if ('undefined' !== typeof ObjAdmin.apellido2 && ObjAdmin.apellido2.length > 0) {
                                        nombreUsuario += ' ' + ObjAdmin.apellido2;
                                    }

                                    responder = {
                                        success: true,
                                        message: {
                                            id: idUsuario,
                                            tipoUsuario: usuario.tipo,
                                            nombreUsuario: nombreUsuario
                                        }
                                    };
                                } else {
                                    responder = {
                                        success: false,
                                        message: 'El usuario no existe'
                                    };
                                }
                            } else {
                                responder = {
                                    success: false,
                                    message: 'El usuario no existe'
                                };
                            }
                            break;
                        case 'CentroEducativo' :

                            const ObjCentro = await ModelUsuarioCentro.findOne({correo: req.body.correo}).select('contacto nombreComercial');

                            if (null !== ObjCentro) {
                                const cantObjCentro = Object.keys(ObjCentro).length || 0;
                                if (cantObjCentro > 0) {
                                    idUsuario = ObjCentro._id;

                                    ObjCentro.contacto.forEach(obj => {
                                        nombreUsuario += obj.primerNombre;
                                        if ('undefined' !== typeof obj.segundoNombre && obj.segundoNombre.length > 0) {
                                            nombreUsuario += ' ' + obj.segundoNombre;
                                        }
                                        nombreUsuario += ' ' + obj.primerApellido;
                                        if ('undefined' !== typeof obj.segundoApellido && obj.segundoApellido.length > 0) {
                                            nombreUsuario += ' ' + obj.segundoApellido;
                                        }


                                    });

                                    responder = {
                                        success: true,
                                        message: {
                                            id: idUsuario,
                                            tipoUsuario: usuario.tipo,
                                            nombreUsuario: nombreUsuario,
                                            nombreInstitucion: ObjCentro.nombreComercial
                                        }
                                    };
                                } else {
                                    responder = {
                                        success: false,
                                        message: 'El usuario no existe'
                                    };
                                }
                            } else {
                                responder = {
                                    success: false,
                                    message: 'El usuario no existe'
                                };
                            }

                            break;
                        case 'PadreFamilia' :

                            const ObjPadre = await ModelUsuarioPadre.findOne({correo: req.body.correo}).select('nombre segundoNombre apellido segundoApellido');
                            if (null !== ObjPadre) {
                                const cantObjPadre = Object.keys(ObjPadre).length || 0;
                                if (cantObjPadre > 0) {
                                    idUsuario = ObjPadre._id;
                                    nombreUsuario += ObjPadre.nombre;
                                    if ('undefined' !== typeof ObjPadre.segundoNombre && ObjPadre.segundoNombre.length > 0) {
                                        nombreUsuario += ' ' + ObjPadre.segundoNombre;
                                    }
                                    nombreUsuario += ' ' + ObjPadre.apellido;
                                    if ('undefined' !== typeof ObjPadre.segundoApellido && ObjPadre.segundoApellido.length > 0) {
                                        nombreUsuario += ' ' + ObjPadre.segundoApellido;
                                    }

                                    responder = {
                                        success: true,
                                        message: {
                                            id: idUsuario,
                                            tipoUsuario: usuario.tipo,
                                            nombreUsuario: nombreUsuario
                                        }
                                    };


                                } else {
                                    responder = {
                                        success: false,
                                        message: 'El usuario no existe'
                                    };
                                }
                            } else {
                                responder = {
                                    success: false,
                                    message: 'El usuario no existe'
                                };
                            }


                            break;
                        default :
                            responder = {
                                success: false,
                                message: 'Tipo de usuario desconocido'
                            };
                            break;
                    }

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

