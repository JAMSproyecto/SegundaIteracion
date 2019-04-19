'use strict';

const model_registrar_actividad = require('./registrar_actividad.model');
const fecha = require('../funciones_genericas/obtenerFecha');


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

module.exports.registrar_actividad = (req, res) => {
    let actividad_nueva = new model_registrar_actividad(
        {
            idCentro: req.body.idCentro,
            actividad: req.body.actividad,
            fecha: fecha.get(),
            hora_inicio: req.body.hora_inicio,
            finaliza: req.body.finaliza,
            lugar: req.body.lugar,
            detalles: req.body.detalles,
            estado: 'Activo'
        }
    );

    actividad_nueva.save(
        function (error) {
            if (error) {
                res.json(
                    {
                        success: false,
                        msg: `La actividad no pudo ser registrada, ocurrió el siguiente error ${error}`
                    }
                )
            } else {

                res.json(
                    {
                        success: true,
                        msg: `Se registró la actividad de manera exitosa`
                    }
                )
            }
        }

    );
};

/**
 * Listar actividades 
 * @param req {body:idCentro}
 */
module.exports.listar_todas_actividades = (req, res) => {
    const filtros = { idCentro: req.body.idCentro };
    model_registrar_actividad.find(filtros).sort({ fecha: 'desc' }).then(
        function (resultado) {
            if (resultado) {
                if (Object.keys(resultado).length > 0) {
                    let listarResultado = [];
                    const has = Object.prototype.hasOwnProperty;
                    let key;
                    for (key in resultado) {
                        if (!has.call(resultado, key)) continue;

                        listarResultado.push(
                            {
                                '_id': resultado[key]['_id'] || '',
                                'idCentro': resultado[key]['idCentro'] || 0,
                                'actividad': resultado[key]['actividad'] || '',
                                'fecha': formatearFecha(resultado[key]['fecha'] || ''),
                                'hora_inicio': resultado[key]['hora_inicio'] || '',//por si no se encontro resultadom, no se caiga y muestre el resultado en blanco
                                'finaliza': resultado[key]['finaliza'] || '',
                                'lugar': resultado[key]['lugar'] || '',
                                'detalles': resultado[key]['detalles'] || '',
                                'estado': resultado[key]['estado'] || ''
                            }
                        );
                    }
                    res.json(
                        {
                            success: true,
                            msg: listarResultado
                        }
                    )
                
            } else {
                res.json(
                    {
                        success: false,
                        msg: 'No se encontraron actividades'
                    }
                )
            }
        }else {
            res.json(
                {
                    success: false,
                    msg: 'No se encontraron actividades'
                }
            )
        }
    }

    )
};


module.exports.buscar_por_id = function (req, res) {
    model_registrar_actividad.find({ _id: req.body.idActividad }).then(
        function (actividad) {
            if (actividad) {
                res.json(
                    {
                        success: true,
                        msg: actividad
                    }
                )
            } else {
                res.json(
                    {
                        success: false,
                        msg: 'No se encontró la actividad'
                    }
                )

            }
        }

    )

};


module.exports.actualizar_actividad = function (req, res) {
    console.log(req.body);
    model_registrar_actividad.findByIdAndUpdate(req.body.id, { $set: req.body }, function (error) {
        if (error) {
            res.json(
                {
                    success: false,
                    msg: `No se puede actualizar la actividad, ocurrió el siguiente error ${error}`
                }
            );

        } else {
            res.json(
                {
                    success: true,
                    msg: 'La actividad se actualizó exitosamente'
                }
            );

        }
    });
}

module.exports.eliminar = function (req, res) {
    console.log(req.body);
    model_registrar_actividad.findByIdAndRemove(req.body.id,
        function (error) {
            if (error) {
                res.json(
                    {
                        success: false,
                        msg: `No se pudo eliminar la actividad, ocurrió el siguiente error ${error}`
                    }
                );
            } else {
                res.json(
                    {
                        success: true,
                        msg: 'La actividad se elimino  exitosamente'
                    }
                );
            }
        });
}
