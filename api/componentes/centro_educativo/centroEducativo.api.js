'use strict';

const Tiza = require('chalk');
const ModelCEdu = require('./centroEducativo.model');
const ModelUsuario = require('./../usuarios/usuario.model');
const ModelBitacora = require('./../bitacora_transaccional/bitacora.model');
const ModelCalificacionMEP = require('./../calificacionMep/calificacionMep.model');
const ModelCalificacionPadre = require('./../calificacion_padre/calificacion_padre.model');
const ObtenerProvCantDist = require('./../funciones_genericas/obtenerProvCantDist');
const ObtenerPin = require('./../funciones_genericas/obtenerPin');
const ObtenerFecha = require('./../funciones_genericas/obtenerFecha');
const RankingPadres = require('./../funciones_genericas/rankingPadres');

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

        html: '<table border=0 cellSpacing=0 cellPadding=0 width="100%" bgColor="#f9f9f9"><tr><td style="font-size: 17px;background-color: #104E8B;color: #FFFFFF;font-weight: 700; line-height:30px;font-family: Arial;padding-top: 4px;padding-right: 10px;padding-bottom: 4px;padding-left: 10px;margin-top: 3px;margin-right: 3px;margin-bottom: 3px;margin-left: 3px;">Estimado(a) ' + pNombre + '</td></tr> <tr><td style="font-size: 16px;background-color: #FFFFFF;color: #333333;font-weight: 500; line-height:30px;font-family: Arial;padding-top: 4px;padding-right: 10px;padding-bottom: 4px;padding-left: 10px;margin-top: 3px;margin-right: 3px;margin-bottom: 3px;margin-left: 3px;border-top-width: 1px;border-right-width: 1px;border-bottom-width: 1px;border-left-width: 1px;border-top-style: solid;border-right-style: solid;border-bottom-style: solid;border-left-style: solid;border-top-color: #CCCCCC;border-right-color: #CCCCCC;border-bottom-color: #CCCCCC;border-left-color: #CCCCCC;">Su solicitud de usuario fue aprobada, para completar el proceso acceda a <a href="http://127.0.0.1:3000/public/credenciales.html" target="_blank">http://127.0.0.1:3000/public/credenciales.html</a> e ingrese los datos solicitados. El PIN de validaci&oacute;n es:</td></tr><tr><td style="font-size: 22px;background-color: #FFFFFF;color: #565656;font-weight: 800; line-height:30px;font-family: Arial;padding-top: 4px;padding-right: 10px;padding-bottom: 4px;padding-left: 10px;margin-top: 3px;margin-right: 3px;margin-bottom: 3px;margin-left: 3px;border-top-width: 1px;border-right-width: 1px;border-bottom-width: 1px;border-left-width: 1px;border-top-style: solid;border-right-style: solid;border-bottom-style: solid;border-left-style: solid;border-top-color: #CCCCCC;border-right-color: #CCCCCC;border-bottom-color: #CCCCCC;border-left-color: #CCCCCC;text-align:center;">' + pPin + '</td></tr></table>'
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


/**
 * Función para insertar en la bitácora
 * @param  {String} pRealizadaPor Sólo acepta: 'Instalador'|'SuperAdmin'|'CentroEducativo'|'PadreFamilia'.
 * @param  {String} pAccion Descripción de lo que se va a registrar.
 * @return {Boolean}
 */
let insertarBitacora = async (pRealizadaPor, pAccion) => {
    try {
        let bitacora_nuevo = new ModelBitacora({
            realizadaPor: pRealizadaPor || '',
            accion: pAccion || '',
            fecha: ObtenerFecha.get() || ''
        });
        let guardarAccion = await bitacora_nuevo.save();
        console.log(`Se registró en la bitácora: ${pAccion}`);
    } catch (err) {
        console.log(`Error al registrar en la bitácora '${pAccion}':`);
        console.log(err.message);
        return false;
    }
    return true;
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

let formatearFecha = (pFecha) => {
    if (pFecha.length > 0) {
        const fecha = new Date(pFecha);
        const anio = fecha.getFullYear();
        let dia_mes = fecha.getDate();
        let mes = fecha.getMonth();
        let h = fecha.getHours();
        let m = fecha.getMinutes();
        mes += 1;
        if (mes < 10) {
            mes = '0' + mes;
        }
        if (dia_mes < 10) {
            dia_mes = '0' + dia_mes;
        }
        if (h < 10) {
            h = '0' + h;
        }
        if (m < 10) {
            m = '0' + m;
        }
        return dia_mes + '/' + mes + '/' + anio + ' ' + h + ':' + m;
    } else {
        return '';
    }
};

module.exports.registrar_centro_educativo = async (req, res) => {
    try {

        const existeUsuario = await ModelUsuario.find({ correo: req.body.correoCentro }).countDocuments();

        if (existeUsuario < 1) {

            let registroUsuario = new ModelUsuario();
            registroUsuario.correo = req.body.correoCentro;
            registroUsuario.pin = '_PENDIENTE_';
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
            cEduNuevo.etiquetas = req.body.etiquetas;
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

            console.log(Tiza.bold.yellow.bgBlack('El centro educativo se registró correctamente'));
            const log = insertarBitacora('CentroEducativo', `El centro educativo ${req.body.nombre} se registró correctamente`);
            res.json({
                success: true,
                message: 'El proceso se realizó de manera exitosa'
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

        const log = insertarBitacora('CentroEducativo', `Error al registrar el centro educativo ${req.body.nombre}`);

        res.json({
            success: false,
            message: 'El proceso no fue realizado con éxito'
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
            console.log(Tiza.bold.yellow.bgBlack('Error al obtener los centros educativos: '));
            console.log(Tiza.bold.yellow.bgBlack(err));
            res.json({
                success: false,
                message: 'Error al encontrar los datos'
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



                    const calificacionesPadre = await ModelCalificacionPadre.find({}, { _id: 0 }).select('idCentro calificacion');

                    const cantCalificacionesPadre = Object.keys(calificacionesPadre).length;


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
                        //------------------------------------

                        let calificacionPadres = '0';
                        if (cantCalificacionesPadre > 0) {
                            let keyCalPadre;
                            let arrCalPadre = [];
                            for (keyCalPadre in calificacionesPadre) {
                                if (!has.call(calificacionesPadre, keyCalPadre)) continue;
                                if (resultado[key]['_id'] === calificacionesPadre[keyCalPadre]['idCentro']) {
                                    arrCalPadre.push({ calificacion: calificacionesPadre[keyCalPadre]['calificacion'] });
                                }
                            }

                            const elRankingPadres = await RankingPadres.get(arrCalPadre);
                            if (elRankingPadres < 0) {
                                console.log(Tiza.bold.yellow.bgBlack('Error: No se pudo obtener la calificación del padre'));
                                res.json({
                                    success: false,
                                    message: 'Error al encontrar los datos'
                                });
                            } else {
                                calificacionPadres = '' + elRankingPadres;
                            }
                        }

                        //------------------------------------


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
                            'calificacionMEP': parseInt(calificacionMEP, 10),
                            'calificacionPadres': parseInt(calificacionPadres, 10),
                            'etiquetas': resultado[key]['etiquetas'] || '',
                            'tipoInstitucion': resultado[key]['tipoInstitucion'] || ''
                        });

                    }

                    res.json({
                        success: true,
                        message: listarResultado
                    });

                } catch (err2) {
                    console.log(Tiza.bold.yellow.bgBlack('Error al obtener los centros educativos: '));
                    console.log(Tiza.bold.yellow.bgBlack(err2));
                    res.json({
                        success: false,
                        message: 'Error al encontrar los datos'
                    });
                }
            } else {
                res.json({
                    success: false,
                    message: 'No se encontraron datos'
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
            console.log(Tiza.bold.yellow.bgBlack('Error al obtener los centros educativos: '));
            console.log(Tiza.bold.yellow.bgBlack(err));
            res.json({
                success: false,
                message: 'Error al encontrar los datos'
            });
        } else {

            //Filtramos los que NO están aprobados:
            const resultado = entradas.filter(entrada => {
                return entrada.cuenta.some(obj => (obj.aprobado === false && obj.pin !== '_RECHAZADO_'));
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
                    console.log(Tiza.bold.yellow.bgBlack('Error al obtener los centros educativos:'));
                    console.log(Tiza.bold.yellow.bgBlack(err2));
                    res.json({
                        success: false,
                        message: 'Error al encontrar los datos'
                    });
                }
            } else {
                res.json({
                    success: false,
                    message: 'No se encontraron datos'
                });
            }
        }
    });
};


let listarCalificacionesPadre = (pId) => {
    return new Promise((resolve, reject) => {
        try {

            //Este filtro valida el tipo de dato al usar aggregate, es decir: si idCentro es un int, entonces pId debe ser un int.
            const filtroCalificacion = { idCentro: pId };
            // const filtroCalificacion = { idCentro: { $eq: pId } };

            const seleccionar = { _id: 1, idPadre: 1, idCentro: 1, calificacion: 1, comentario: 1, fecha: 1, eliminado: 1, padreFamilia: 1 };

            ModelCalificacionPadre.aggregate([{
                $lookup: {
                    from: 'padres_familia_',
                    let: { pIdPadre: '$idPadre' },
                    pipeline: [
                        {
                            $match:
                            {
                                $expr:
                                {
                                    $and:
                                        [
                                            { $eq: ['$_id', '$$pIdPadre'] }
                                        ]
                                }
                            }
                        },
                        { $project: { _id: 0, nombre: 1, segundoNombre: 1, apellido: 1, segundoApellido: 1 } }
                    ],
                    as: 'padreFamilia'
                }
            },
            { $sort: { fecha: 1 } },
            { $project: seleccionar },
            { $match: filtroCalificacion }
            ]).exec((err, resultado) => {
                if (err) {
                    console.log(Tiza.bold.yellow.bgBlack('No se pudo obtener la calificación del padre: '));
                    console.log(Tiza.bold.yellow.bgBlack(err));
                    resolve([]);
                } else {

                    const cantidadResutados = Object.keys(resultado).length;
                    if (cantidadResutados > 0) {

                        let listarResultado = [];
                        const has = Object.prototype.hasOwnProperty;
                        let key;
                        for (key in resultado) {
                            if (!has.call(resultado, key)) continue;

                            //Si eliminado = true entonces manda vacio el campo de comentario.
                            let elComentario = '';
                            let nombrePadre = '';

                            if ('undefined' != typeof resultado[key]) {

                                if ('boolean' == typeof resultado[key]['eliminado'] && false === resultado[key]['eliminado']) {
                                    elComentario = resultado[key]['comentario'] || '';
                                }
								
                                if ('undefined' != typeof resultado[key]['padreFamilia']) {
                                    nombrePadre = resultado[key]['padreFamilia'][0].nombre.trim();

                                    //Si acaso existe el segundo nombre del padreFamilia (ya que es opcional) entonces lo añadimos seguidamente del primer nombre:
                                    if ('undefined' !== typeof resultado[key]['padreFamilia'][0].segundoNombre && resultado[key]['padreFamilia'][0].segundoNombre.length > 0) {
                                        nombrePadre += ' ' + resultado[key]['padreFamilia'][0].segundoNombre.trim();
                                    }

                                    //Añadimos el primer apellido del padreFamilia
                                    nombrePadre += ' ' + resultado[key]['padreFamilia'][0].apellido.trim();

                                    //Si acaso existe el segundo apellido del padreFamilia (ya que es opcional) entonces lo añadimos seguidamente del primer apellido:
                                    if ('undefined' !== typeof resultado[key]['padreFamilia'][0].segundoApellido && resultado[key]['padreFamilia'][0].segundoApellido.length > 0) {
                                        nombrePadre += ' ' + resultado[key]['padreFamilia'][0].segundoApellido.trim();
                                    }
                                }
                            }

                            listarResultado.push({
                                'idCalificacion': resultado[key]['_id'] || 0,
                                'idCentro': resultado[key]['idCentro'] || 0,
                                'idPadre': resultado[key]['idPadre'] || 0,
                                'nombrePadre': nombrePadre || '',
                                'calificacion': resultado[key]['calificacion'] || 0,
                                'comentario': elComentario,
                                'fecha': resultado[key]['fecha'] || '',
                                'fechaEs': formatearFecha(resultado[key]['fecha'] || '')
                            });
                        }

                        resolve(listarResultado);
                    } else {
                        resolve([]);
                    }

                }
            });
        } catch (err) {
            console.log(Tiza.bold.yellow.bgBlack('Error:'));
            console.log(Tiza.bold.yellow.bgBlack(err.message));
            reject(new DOMException(`No se pudo obtener la calificación, ocurrió el siguiente error: #${err.message}`));
        }
    });
};


module.exports.obtener_centro_por_id = (req, res) => {

    const miId = parseInt(req.body.id, 10);
    const filtroCEdu = { _id: miId };

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
            console.log(Tiza.bold.yellow.bgBlack('Error al obtener los centros educativos: '));
            console.log(Tiza.bold.yellow.bgBlack(err));
            res.json({
                success: false,
                message: 'Error al encontrar los datos'
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



                    const calificacionesPadre = await ModelCalificacionPadre.find({}, { _id: 0 }).select('idCentro calificacion');

                    const cantCalificacionesPadre = Object.keys(calificacionesPadre).length;


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
                        //------------------------------------

                        let calificacionPadres = '0';
                        if (cantCalificacionesPadre > 0) {
                            let keyCalPadre;
                            let arrCalPadre = [];
                            for (keyCalPadre in calificacionesPadre) {
                                if (!has.call(calificacionesPadre, keyCalPadre)) continue;
                                if (resultado[key]['_id'] === calificacionesPadre[keyCalPadre]['idCentro']) {
                                    arrCalPadre.push({ calificacion: calificacionesPadre[keyCalPadre]['calificacion'] });
                                }
                            }

                            const elRankingPadres = await RankingPadres.get(arrCalPadre);
                            if (elRankingPadres < 0) {
                                console.log(Tiza.bold.yellow.bgBlack('Error: No se pudo obtener la calificación del padre'));
                                res.json({
                                    success: false,
                                    message: 'Error al encontrar los datos'
                                });
                            } else {
                                calificacionPadres = '' + elRankingPadres;
                            }
                        }

                        //------------------------------------


                        let listaCalificacionesPadre = await listarCalificacionesPadre(miId);

                        console.log(listaCalificacionesPadre);



                        //------------------------------------


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
                            'referenciaHistorica': resultado[key]['referenciaHistorica'] || '',
                            'direccion': laDireccion,
                            'provincia': laProvincia,
                            'canton': elCanton,
                            'distrito': elDistrito,
                            'telefono': resultado[key]['telefono'] || 0,
                            'correo': resultado[key]['correo'] || '',
                            'calificacionMEP': parseInt(calificacionMEP, 10),
                            'calificacionPadres': parseInt(calificacionPadres, 10),
                            'etiquetas': resultado[key]['etiquetas'] || '',
                            'tipoInstitucion': resultado[key]['tipoInstitucion'] || '',
                            'listaCalificacionPadres': listaCalificacionesPadre || []
                        });

                    }

                    res.json({
                        success: true,
                        message: listarResultado
                    });

                } catch (err2) {
                    console.log(Tiza.bold.yellow.bgBlack('Error al obtener los centros educativos: '));
                    console.log(Tiza.bold.yellow.bgBlack(err2));
                    res.json({
                        success: false,
                        message: 'Error al encontrar los datos'
                    });
                }
            } else {
                res.json({
                    success: false,
                    message: 'No se encontraron datos'
                });
            }
        }
    });
};


module.exports.aprobar_centro_educativo = async (pId, res) => {

    //Obtenemos el correo del centro para hacer el update y el correo del contacto para enviar la notificación por correo. 
    const elCentro = await ModelCEdu.findOne({ _id: pId }, { _id: 0 }).select('correo contacto');

    if (null === elCentro || 'undefined' === typeof elCentro) {

        console.log(Tiza.bold.yellow.bgBlack(`Error al aprobar el centro educativo: no se encontró el id: ${pId}`));
        const log = insertarBitacora('SuperAdmin', `Error al aprobar el centro educativo: no se encontró el id #${pId}`);

        res.json({
            success: false,
            message: 'No se pudo aprobar el centro educativo'
        });
    } else {
        const correoCentro = elCentro.correo;
        const correoContacto = elCentro.contacto[0].correo;
        const nombreContacto = elCentro.contacto[0].primerNombre + ' ' + elCentro.contacto[0].primerApellido;
        const elPin = ObtenerPin.get();

        const nuevosDatos = { aprobado: true, fechaActualizado: ObtenerFecha.get(), pin: elPin };


        ModelUsuario.findOneAndUpdate({ correo: correoCentro }, { $set: nuevosDatos }, { new: true },
            (err, cambiosRealizados) => {
                if (err) {
                    console.log(Tiza.bold.yellow.bgBlack('Error al aprobar el centro educativo:'));
                    console.log(Tiza.bold.yellow.bgBlack(err));

                    const log = insertarBitacora('SuperAdmin', `Error al aprobar el centro educativo: ${correoCentro}`);

                    res.json({
                        success: false,
                        message: 'No se pudo aprobar el centro educativo'
                    });
                } else {

                    //enviar el correo
                    let enviar = enviarCorreo(correoContacto, nombreContacto, elPin);

                    //registrar bitácora
                    const log = insertarBitacora('SuperAdmin', `El centro educativo ${correoCentro} se aprobó exitosamente`);

                    res.json({
                        success: true,
                        message: 'El centro educativo se aprobó exitosamente'
                    });
                }
            });
    }
};


module.exports.rechazar_centro_educativo = async (pId, res) => {

    //Obtenemos el correo del centro para hacer el update y el correo del contacto para enviar la notificación por correo. 
    const elCentro = await ModelCEdu.findOne({ _id: pId }, { _id: 0 }).select('correo contacto');

    if (null === elCentro || 'undefined' === typeof elCentro) {

        console.log(Tiza.bold.yellow.bgBlack(`Error al rechazar el centro educativo: no se encontró el id: ${pId}`));
        const log = insertarBitacora('SuperAdmin', `Error al rechazar el centro educativo: no se encontró el id #${pId}`);

        res.json({
            success: false,
            message: 'No se pudo rechazar el centro educativo'
        });
    } else {
        const correoCentro = elCentro.correo;
        const correoContacto = elCentro.contacto[0].correo;
        const nombreContacto = elCentro.contacto[0].primerNombre + ' ' + elCentro.contacto[0].primerApellido;
        const elPin = ObtenerPin.get();

        const nuevosDatos = { aprobado: false, activo: false, fechaActualizado: ObtenerFecha.get(), pin: '_RECHAZADO_' };


        ModelUsuario.findOneAndUpdate({ correo: correoCentro }, { $set: nuevosDatos }, { new: true },
            (err, cambiosRealizados) => {
                if (err) {
                    console.log(Tiza.bold.yellow.bgBlack('Error al rechazar el centro educativo:'));
                    console.log(Tiza.bold.yellow.bgBlack(err));

                    const log = insertarBitacora('SuperAdmin', `Error al rechazar el centro educativo: ${correoCentro}`);

                    res.json({
                        success: false,
                        message: 'No se pudo rechazar el centro educativo'
                    });
                } else {

                    //enviar el correo
                    let enviar = enviarCorreo(correoContacto, nombreContacto, elPin);

                    //registrar bitácora
                    const log = insertarBitacora('SuperAdmin', `El centro educativo ${correoCentro} se rechazó exitosamente`);

                    res.json({
                        success: true,
                        message: 'El centro educativo se rechazó exitosamente'
                    });
                }
            });
    }
};

//POR FAVOR JEISON NO BORRAR !
//para traer los centros educativos que tienen lista de utiles 
module.exports.obtener_nombre_centro_por_id = (req, res) => {
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