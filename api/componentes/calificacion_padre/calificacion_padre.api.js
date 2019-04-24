'use strict';

const Tiza = require('chalk');
const ModelCalificacionPadre = require('./calificacion_padre.model');
const ModelBitacora = require('./../bitacora_transaccional/bitacora.model');
const ObtenerFecha = require('./../funciones_genericas/obtenerFecha');
const RankingPadres = require('./../funciones_genericas/rankingPadres');
const Mongoose = require('mongoose');

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

module.exports.asignar_calificacion_padre = async (objectReq, res) => {
    try {

        const elPadreYaCalifico = await ModelCalificacionPadre.find({ idPadre: objectReq.idPadre, idCentro: objectReq.idCentro }).countDocuments();

        if (elPadreYaCalifico > 0) {
            res.json({
                success: false,
                message: 'Ya has calificado a esta institución'
            });
        } else {

            let registro = new ModelCalificacionPadre();
            registro.idPadre = objectReq.idPadre;
            registro.idCentro = objectReq.idCentro;
            registro.calificacion = objectReq.calificacion;
            registro.comentario = objectReq.comentario;
            registro.fecha = ObtenerFecha.get();

            let guardarRegistro = await registro.save();

            const log = await insertarBitacora('PadreFamilia', `El padre #${objectReq.idPadre} asignó la calificación '${objectReq.calificacion}' al centro educativo #${objectReq.idCentro}. Comentario: ${objectReq.comentario}`);

            res.json({
                success: true,
                message: 'La calificación se asignó de manera exitosa'
            });
        }
    } catch (err) {
        console.log(Tiza.bold.yellow.bgBlack('Error al asignar la calificación del padre:'));
        console.log(Tiza.bold.yellow.bgBlack(err.message));

        const log = await insertarBitacora('PadreFamilia', `Ocurrió un error cuando el padre #${objectReq.idPadre} asignaba la calificación '${objectReq.calificacion}' al centro educativo #${objectReq.idCentro}. Comentario: ${objectReq.comentario}`);

        res.json({
            success: false,
            message: `No se pudo asignar la calificación, ocurrió el siguiente error: #${err.message}`
        });
    }
};

module.exports.obtener_todas_calificaciones_padre = async (req, res) => {
    try {
        const resultado = await ModelCalificacionPadre.find().select('idPadre idCentro calificacion comentario fecha eliminado').sort({ fecha: 'asc' });
        const cantidadResutados = Object.keys(resultado).length;
        if (cantidadResutados > 0) {

            let listarResultado = [];
            const has = Object.prototype.hasOwnProperty;
            let key;
            for (key in resultado) {
                if (!has.call(resultado, key)) continue;

                //Si eliminado = true entonces manda vacio el campo de comentario.
                let elComentario = '';
                if (false === resultado[key]['eliminado']) {
                    elComentario = resultado[key]['comentario'] || '';
                }

                listarResultado.push({
                    'idCalificacion': resultado[key]['_id'] || 0,
                    'idPadre': resultado[key]['idPadre'] || 0,
                    'idCentro': resultado[key]['idCentro'] || 0,
                    'calificacion': resultado[key]['calificacion'] || 0,
                    'comentario': elComentario,
                    'fecha': resultado[key]['fecha'] || '',
                    'fechaEs': formatearFecha(resultado[key]['fecha'] || '')
                });
            }

            res.json({
                success: true,
                message: listarResultado
            });
        } else {
            res.json({
                success: false,
                message: 'No se encontraron datos'
            });
        }
    } catch (err) {
        console.log(Tiza.bold.yellow.bgBlack('Error:'));
        console.log(Tiza.bold.yellow.bgBlack(err.message));
        res.json({
            success: false,
            message: `No se pudieron obtener las calificaciones, ocurrió el siguiente error: #${err.message}`
        });
    }
};


module.exports.buscar_calificacion_padre_por_id = (pId, res) => {
    //https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline/		

    let elParametro = '';
    try {
        elParametro = Mongoose.Types.ObjectId(pId);
    } catch (e) { }

    try {
		
        const filtroCalificacion = { _id: { $eq: elParametro } };

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
                res.json({
                    success: false,
                    message: `No se pudo obtener la calificación, ocurrió el siguiente error: #${err}`
                });
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
                        if (false === resultado[key]['eliminado']) {
                            elComentario = resultado[key]['comentario'] || '';
                        }

                        let nombrePadre = resultado[key]['padreFamilia'][0].nombre.trim();

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

                    res.json({
                        success: true,
                        message: listarResultado
                    });
                } else {
                    res.json({
                        success: false,
                        message: 'No se encontraron datos'
                    });
                }

            }
        });
    } catch (err) {
        console.log(Tiza.bold.yellow.bgBlack('Error:'));
        console.log(Tiza.bold.yellow.bgBlack(err.message));
        res.json({
            success: false,
            message: `No se pudo obtener la calificación, ocurrió el siguiente error: #${err.message}`
        });
    }
};


module.exports.buscar_calificaciones_padre_por_idCentro = (pId, res) => {
    //https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline/		
    try {

        //Este filtro valida el tipo de dato al usar aggregate, es decir: si idCentro es un int, entonces pId debe ser un int.
        const filtroCalificacion = { idCentro: { $eq: pId } };

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
                res.json({
                    success: false,
                    message: `No se pudo obtener la calificación, ocurrió el siguiente error: #${err}`
                });
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
                        if (false === resultado[key]['eliminado']) {
                            elComentario = resultado[key]['comentario'] || '';
                        }

                        let nombrePadre = resultado[key]['padreFamilia'][0].nombre.trim();

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

                    res.json({
                        success: true,
                        message: listarResultado
                    });
                } else {
                    res.json({
                        success: false,
                        message: 'No se encontraron datos'
                    });
                }

            }
        });
    } catch (err) {
        console.log(Tiza.bold.yellow.bgBlack('Error:'));
        console.log(Tiza.bold.yellow.bgBlack(err.message));
        res.json({
            success: false,
            message: `No se pudo obtener la calificación, ocurrió el siguiente error: #${err.message}`
        });
    }
};


module.exports.actualizar_comentario_calificacion_padre = (objectReq, res) => {
    ModelCalificacionPadre.findByIdAndUpdate(objectReq.id, { comentario: objectReq.comentario }, err => {
        if (err) {
            console.log(Tiza.bold.yellow.bgBlack(`No se pudo actualizar el comentario de la calificación: ${objectReq.id} :`));
            console.log(Tiza.bold.yellow.bgBlack(err));
            const log = insertarBitacora('PadreFamilia', `No se pudo actualizar el comentario de la calificación: ${objectReq.id}`);
            res.json({ success: false, message: `No se pudo actualizar el comentario de la calificación, ocurrió el siguiente error: #${err}` });
        } else {
            const log = insertarBitacora('PadreFamilia', `Se actualizó correctamente el comentario de la calificación: ${objectReq.id}`);
            res.json({ success: true, message: 'Los datos se actualizaron exitosamente' });
        }
    });
};


module.exports.eliminar_comentario_calificacion_padre = (pId, res) => {
    ModelCalificacionPadre.findByIdAndUpdate(pId, { eliminado: true }, err => {
        if (err) {
            console.log(Tiza.bold.yellow.bgBlack(`No se pudo eliminar el comentario de la calificación: ${pId} :`));
            console.log(Tiza.bold.yellow.bgBlack(err));
            const log = insertarBitacora('PadreFamilia', `No se pudo eliminar el comentario de la calificación: ${pId}`);
            res.json({ success: false, message: `No se pudo eliminar el comentario de la calificación, ocurrió el siguiente error: #${err}` });
        } else {
            const log = insertarBitacora('PadreFamilia', `Se eliminó correctamente el comentario de la calificación: ${pId}`);
            res.json({ success: true, message: 'El dato se eliminó exitosamente' });
        }
    });
};


module.exports.obtener_calificacion_padre_de_centro = async (pId, res) => {
    try {
        const calificaciones = await ModelCalificacionPadre.find({ idCentro: pId }, { _id: 0 }).select('calificacion');
        const elRankingPadres = await RankingPadres.get(calificaciones);
        if (elRankingPadres < 0) {
            res.json({
                success: false,
                message: 'No se pudo obtener la calificación'
            });
        } else {
            res.json({
                success: true,
                message: elRankingPadres
            });
        }
    } catch (err) {
        console.log(Tiza.bold.yellow.bgBlack('Error al obtener la calificación-padre del centro:'));
        console.log(Tiza.bold.yellow.bgBlack(err.message));

        res.json({
            success: false,
            message: `No se pudo obtener la calificación, ocurrió el siguiente error: #${err.message}`
        });
    }
};

