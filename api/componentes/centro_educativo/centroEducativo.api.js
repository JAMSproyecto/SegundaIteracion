'use strict';

const Tiza = require('chalk');
const ModelCEdu = require('./centroEducativo.model');
const ModelUsuario = require('./../usuarios/usuario.model');
const ModelCalificacionMEP = require('./../calificacionMep/calificacionMep.model');
const ObtenerProvCantDist = require('./../funciones_genericas/obtenerProvCantDist');
const ObtenerPin = require('./../funciones_genericas/obtenerPin');
const ObtenerFecha = require('./../funciones_genericas/obtenerFecha');

const nodemailer = require('nodemailer');

let transporteCorreo = nodemailer.createTransport({
    service: 'gmail',
    //port: '25',
    secure: true,
    auth: {
        user: 'soporte.mep.costarica@gmail.com',
        pass: '1Proyecto9'
    }
});

let enviarCorreo = (pCorreoPara, pNombre, pPin) => {

    const opcionesCorreo = {
        from: 'soporte.mep.costarica@gmail.com',
        to: pCorreoPara,
        subject: 'Verificación de correo electrónico',

        html: '<table border=0 cellSpacing=0 cellPadding=0 width="100%" bgColor="#f9f9f9"><tr><td style="font-size: 17px;background-color: #104E8B;color: #FFFFFF;font-weight: 700; line-height:30px;font-family: Arial;padding-top: 4px;padding-right: 10px;padding-bottom: 4px;padding-left: 10px;margin-top: 3px;margin-right: 3px;margin-bottom: 3px;margin-left: 3px;">Estimado(a) ' + pNombre + '</td></tr> <tr><td style="font-size: 16px;background-color: #FFFFFF;color: #333333;font-weight: 500; line-height:30px;font-family: Arial;padding-top: 4px;padding-right: 10px;padding-bottom: 4px;padding-left: 10px;margin-top: 3px;margin-right: 3px;margin-bottom: 3px;margin-left: 3px;border-top-width: 1px;border-right-width: 1px;border-bottom-width: 1px;border-left-width: 1px;border-top-style: solid;border-right-style: solid;border-bottom-style: solid;border-left-style: solid;border-top-color: #CCCCCC;border-right-color: #CCCCCC;border-bottom-color: #CCCCCC;border-left-color: #CCCCCC;">Gracias por registrarse en nuestro sistema, para completar el perfil de usuario necesita el siguiente PIN de validaci&oacute;n:</td></tr><tr><td style="font-size: 22px;background-color: #FFFFFF;color: #565656;font-weight: 800; line-height:30px;font-family: Arial;padding-top: 4px;padding-right: 10px;padding-bottom: 4px;padding-left: 10px;margin-top: 3px;margin-right: 3px;margin-bottom: 3px;margin-left: 3px;border-top-width: 1px;border-right-width: 1px;border-bottom-width: 1px;border-left-width: 1px;border-top-style: solid;border-right-style: solid;border-bottom-style: solid;border-left-style: solid;border-top-color: #CCCCCC;border-right-color: #CCCCCC;border-bottom-color: #CCCCCC;border-left-color: #CCCCCC;text-align:center;">' + pPin + '</td></tr></table>'
    };

    transporteCorreo.sendMail(opcionesCorreo, (error, info) => {
        if (error) {
            console.log(Tiza.bold.yellow.bgBlack('Error al enviar el correo:'));
            console.log(Tiza.bold.yellow.bgBlack(error));
        } else {
            console.log('Envío de correo: ' + info.response);
        }
    });
};



let obtenerSoloFecha = (pFecha) => {
    if ('string' == typeof pFecha && pFecha.length > 0) {
        const fecha = new Date(pFecha);
        const anio = fecha.getFullYear();
        let dia_mes = fecha.getDate();
        let mes = fecha.getMonth();
        mes += 1;
        if (mes < 10) {
            mes = '0' + mes;
        }
        if (dia_mes < 10) {
            dia_mes = '0' + dia_mes;
        }
        return dia_mes + '/' + mes + '/' + anio;
    } else {
        return '';
    }
};


let obtenerDias = (pFecha, soloHabiles) => {
    if ('string' == typeof pFecha && pFecha.length > 0) {
        const hoy = new Date();
        const fecha = new Date(pFecha);
        const cantDias = Math.floor((hoy.getTime() - fecha.getTime()) / (1000 * 60 * 60 * 24));

        soloHabiles = soloHabiles || false;
        if (soloHabiles === false) {
            return cantDias;
        } else {
            if (cantDias < 1) {
                return 0;
            } else {
                // Restamos sábados y domingos
                let fechaCalculo = fecha;
                fechaCalculo.setDate(fechaCalculo.getDate() - 1);

                const diasRecorrer = cantDias + 1; // Se suma el día de hoy.
                let noHabiles = 0, i = 0;
                for (i; i < diasRecorrer; ++i) {
                    fechaCalculo.setDate(fechaCalculo.getDate() + 1);
                    const diasemana = fechaCalculo.getDay();
                    if (diasemana == 0 || diasemana == 6) {
                        ++noHabiles;
                    }
                }

                //console.log("cantDias: "+cantDias+" - noHabiles: "+noHabiles+" ="+(cantDias - noHabiles));

                return (cantDias - noHabiles);

            }
        }
    } else {
        return -1;
    }
};

module.exports.registrar_centro_educativo = async (req, res) => {
    try {

        const existeUsuario = await ModelUsuario.find({ correo: req.body.correoCentro }).countDocuments();

        if (existeUsuario < 1) {

            const elPin = ObtenerPin.get();

            let registroUsuario = new ModelUsuario();
            registroUsuario.correo = req.body.correoCentro;
            registroUsuario.pin = elPin;
            registroUsuario.tipo = 'CentroEducativo';
            registroUsuario.fechaCreado = ObtenerFecha.get();

            let guardarUsuario = await registroUsuario.save();


            let cEduNuevo = new ModelCEdu();

            cEduNuevo.correo = req.body.correoCentro;
            cEduNuevo.nombre = req.body.nombre;
            cEduNuevo.nombreComercial = req.body.nombreComercial;
            cEduNuevo.cedulaJuridica = req.body.cedulaJuridica;
            cEduNuevo.tipoInstitucion = req.body.tipoInstitucion;
            cEduNuevo.annoFundacion = req.body.annoFundacion;
            cEduNuevo.referenciaHistorica = req.body.resenna;
            cEduNuevo.telefono = req.body.telefonoCentro;
            cEduNuevo.fax = (req.body.fax || '');
            cEduNuevo.sitioWeb = (req.body.sitioWeb || '');
            cEduNuevo.redesSociales = (req.body.redesSociales || '');
            cEduNuevo.tipoInstitucion = req.body.tipoInstitucion;
            cEduNuevo.nivel = req.body.niveles;
            cEduNuevo.direccion = [{
                idProvincia: req.body.idProvincia,
                idCanton: req.body.idCanton,
                idDistrito: req.body.idDistrito,
                sennas: req.body.dirSennas
            }];
            cEduNuevo.contacto = [{
                correo: req.body.correoContacto,
                primerNombre: req.body.primerNombre,
                segundoNombre: req.body.segundoNombre,
                primerApellido: req.body.primerApellido,
                segundoApellido: req.body.segundoApellido,
                identificacion: req.body.identificacionContacto,
                departamento: req.body.departamentoContacto,
                telefono: req.body.telefonoContacto
            }];
            cEduNuevo.calificacion = [{
                mep: 0,
                padres: 0
            }];
            cEduNuevo.adjuntos = [];
            cEduNuevo.servicios = [];
            cEduNuevo.actividades = [];
            cEduNuevo.comentarios = [];
            cEduNuevo.idiomas = [];
            cEduNuevo.religion = '';
            cEduNuevo.tipoAlumno = 'Mixto';
            cEduNuevo.bachillerInternacional = false;

            cEduNuevo.ubicacion = [{
                latitud: '0',
                longitud: '0'
            }];

            cEduNuevo.fotoCentro = req.body.fotoCentro;

            let guardarCedu = await cEduNuevo.save();

            let enviar = enviarCorreo(req.body.correoContacto, req.body.primerNombre + ' ' + req.body.primerApellido, elPin);

            res.json({
                success: true,
                message: 'El centro educativo se registró correctamente'
            });
        } else {
            const mensaje = 'El usuario ' + req.body.primerNombre + ' ' + req.body.primerApellido + ' ya existe';

            console.log(Tiza.bold.yellow.bgBlack(mensaje));

            res.json({
                success: false,
                message: mensaje
            });
        }
    } catch (err) {
        console.log(Tiza.bold.yellow.bgBlack('Error al registrar el centro educativo:'));
        console.log(Tiza.bold.yellow.bgBlack(err.message));

        res.json({
            success: false,
            message: 'Error al registrar el centro educativo'
        });
    }

};

/*
 * Obtener todos los centros educativos que estan activos.
*/
module.exports.obtener_todos_centro_educativo = async (req, res) => {

    const filtroCEdu = { _id: { $ne: 1999 } };

    ModelCEdu.aggregate([{
        $lookup: {
            from: 'usuarios_', // model que se va a anexar.
            localField: 'correo', // [ donde esto en el model centro_educativo_ 
            foreignField: 'correo', // exista en el model usuario_ ]
            as: 'cuenta' // Nombre que va a aparecer en el resultado.
        }
    },
    { $match: filtroCEdu }
    ]).exec(async (err, entradas) => {
        if (err) {
            console.log(Tiza.bold.yellow.bgBlack('Ocurrió el siguiente error: '));
            console.log(Tiza.bold.yellow.bgBlack(err));
            res.json({
                success: false,
                message: 'Error al obtener los centros educativos'
            });
        } else {

            //Filtramos los que están activos:
            const resultado = entradas.filter(entrada => {
                return entrada.cuenta.some(obj => obj.activo === true);
            });

            const cantResultados = Object.keys(resultado).length;

            if (cantResultados > 0) {
                try {

                    let calificacionesMEP = await ModelCalificacionMEP.find({ 'calificacionTotal': { $ne: '' } }, { '_id': 0 }).select('idCentro calificacionTotal');

                    const cantCalificacionesMEP = Object.keys(calificacionesMEP).length;

                    let listarResultado = [];
                    const has = Object.prototype.hasOwnProperty;
                    let key;
                    for (key in resultado) {
                        if (!has.call(resultado, key)) continue;

                        let calificacionMEP = '0';
                        if (cantCalificacionesMEP > 0) {
                            let keyCalMEP;
                            for (keyCalMEP in calificacionesMEP) {
                                if (!has.call(calificacionesMEP, keyCalMEP)) continue;
                                if (resultado[key]['_id'] === calificacionesMEP[keyCalMEP]['idCentro']) {
                                    calificacionMEP = calificacionesMEP[keyCalMEP]['calificacionTotal'];
                                    break;
                                }
                            }
                        }


                        let laProvincia = '';
                        let elCanton = '';
                        let elDistrito = '';
                        let laDireccion = '';

                        if (resultado[key]['direccion']) {
                            resultado[key]['direccion'].forEach(obj2 => {
                                if ('undefined' != typeof obj2['idProvincia']) {
                                    laProvincia = ObtenerProvCantDist.getProvincia(obj2['idProvincia']);
                                }
                                if ('undefined' != typeof obj2['idCanton']) {
                                    elCanton = ObtenerProvCantDist.getCanton(obj2['idCanton']);
                                }
                                if ('undefined' != typeof obj2['idDistrito']) {
                                    elDistrito = ObtenerProvCantDist.getDistrito(obj2['idDistrito']);
                                }
                                if ('undefined' != typeof obj2['sennas']) {
                                    laDireccion = obj2['sennas'];
                                }

                            });
                        }

                        listarResultado.push({
                            '_id': resultado[key]['_id'] || 0,
                            'fotoCentro': resultado[key]['fotoCentro'] || '',
                            'nombre': resultado[key]['nombre'] || '',
                            'nombreComercial': resultado[key]['nombreComercial'] || '',
                            'direccion': laDireccion,
                            'provincia': laProvincia,
                            'canton': elCanton,
                            'distrito': elDistrito,
                            'telefono': resultado[key]['telefono'] || 0,
                            'correo': resultado[key]['correo'] || '',
                            'calificacionMEP': parseInt(calificacionMEP, 10)
                        });

                    }

                    res.json({
                        success: true,
                        message: listarResultado
                    });

                } catch (err2) {
                    console.log(Tiza.bold.yellow.bgBlack('Error:'));
                    console.log(Tiza.bold.yellow.bgBlack(err2));
                    res.json({
                        success: false,
                        message: 'Error al obtener los centros educativos'
                    });
                }
            } else {
                res.json({
                    success: false,
                    message: 'No se encontraron centros educativos'
                });
            }
        }
    });
};


/*
 * Obtener todos los centros educativos que NO han sido aprobados por el administrador.
*/
module.exports.obtener_centros_educativos_sin_aprobar = async (req, res) => {

    const filtroCEdu = { _id: { $ne: 1999 } };

    ModelCEdu.aggregate([{
        $lookup: {
            from: 'usuarios_', // model que se va a anexar.
            localField: 'correo', // [ donde esto en el model centro_educativo_ 
            foreignField: 'correo', // exista en el model usuario_ ]
            as: 'cuenta' // Nombre que va a aparecer en el resultado.
        }
    },
    { $match: filtroCEdu }
    ]).exec(async (err, entradas) => {
        if (err) {
            console.log(Tiza.bold.yellow.bgBlack('Ocurrió el siguiente error: '));
            console.log(Tiza.bold.yellow.bgBlack(err));
            res.json({
                success: false,
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> parent of 3e0c2c3... commit
                message: 'Error al obtener los centros educativos'
=======
                message: 'No se encontraron centros educativos'
>>>>>>> parent of 0587924... Ortografía
<<<<<<< HEAD
=======
                message: 'No se encontraron centros educativos'
>>>>>>> parent of 0587924... Ortografía
=======
                message: 'No se encontraron centros educativos'
>>>>>>> parent of 0587924... Ortografía
=======
>>>>>>> parent of 3e0c2c3... commit
            });
        } else {

            //Filtramos los que NO están aprobados:
            const resultado = entradas.filter(entrada => {
                return entrada.cuenta.some(obj => obj.aprobado === false);
            });

            const cantResultados = Object.keys(resultado).length;

            if (cantResultados > 0) {
                try {

                    let listarResultado = [];
                    const has = Object.prototype.hasOwnProperty;
                    let key;
                    for (key in resultado) {
                        if (!has.call(resultado, key)) continue;

                        let laProvincia = '';
                        let elCanton = '';
                        let elDistrito = '';
                        let laDireccion = '';
                        let fechaSolicitud = '';

                        if (resultado[key]['direccion']) {
                            resultado[key]['direccion'].forEach(obj2 => {
                                if ('undefined' != typeof obj2['idProvincia']) {
                                    laProvincia = ObtenerProvCantDist.getProvincia(obj2['idProvincia']);
                                }
                                if ('undefined' != typeof obj2['idCanton']) {
                                    elCanton = ObtenerProvCantDist.getCanton(obj2['idCanton']);
                                }
                                if ('undefined' != typeof obj2['idDistrito']) {
                                    elDistrito = ObtenerProvCantDist.getDistrito(obj2['idDistrito']);
                                }
                                if ('undefined' != typeof obj2['sennas']) {
                                    laDireccion = obj2['sennas'];
                                }

                            });
                        }

                        if (resultado[key]['cuenta']) {
                            resultado[key]['cuenta'].forEach(obj3 => {
                                fechaSolicitud = obj3['fechaCreado'];
                            });
                        }

                        listarResultado.push({
                            '_id': resultado[key]['_id'] || 0,
                            'fotoCentro': resultado[key]['fotoCentro'] || '',
                            'nombre': resultado[key]['nombre'] || '',
                            'nombreComercial': resultado[key]['nombreComercial'] || '',
                            'direccion': laDireccion,
                            'provincia': laProvincia,
                            'canton': elCanton,
                            'distrito': elDistrito,
                            'telefono': resultado[key]['telefono'] || 0,
                            'correo': resultado[key]['correo'] || '',
                            'solicitudFecha': fechaSolicitud,
                            'solicitudFechaCorta': obtenerSoloFecha(fechaSolicitud),
                            'solicitudDias': obtenerDias(fechaSolicitud),
                            'solicitudDiasHabiles': obtenerDias(fechaSolicitud, true)
                        });

                    }

                    res.json({
                        success: true,
                        message: listarResultado
                    });

                } catch (err2) {
                    console.log(Tiza.bold.yellow.bgBlack('Error:'));
                    console.log(Tiza.bold.yellow.bgBlack(err2));
                    res.json({
                        success: false,
                        message: 'Error al obtener los centros educativos'
                    });
                }
            } else {
                res.json({
                    success: false,
                    message: 'No se encontraron centros educativos'
                });
            }
        }
    } catch (err) {
        console.log(Tiza.bold.yellow.bgBlack('Error:'));
        console.log(Tiza.bold.yellow.bgBlack(err));
        res.json({
            success: false,
            message: 'Error al obtener los centros educativos'
        });
    }
};


module.exports.obtener_centro_por_id = (req, res) => {
    ModelCEdu.findOne({ _id: req.body.id }).then(resultado => {
        if (resultado) {
            res.json(
                {
                    success: true,
                    message: resultado
                }
            )
        } else {
            res.json(
                {
                    success: false,
                    message: 'No se encontró el centro educativo'
                }
            )
        }
    });
};

