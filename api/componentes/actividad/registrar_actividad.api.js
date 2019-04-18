'use strict';

const model_registrar_actividad = require('./registrar_actividad.model');
const fecha = require('../funciones_genericas/obtenerFecha');

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
    model_registrar_actividad.find(filtros).then(
        function (actividades) {
            if (actividades.length > 0) {
                res.json(
                    {
                        success: true,
                        msg: actividades
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
        }

    )
};


module.exports.buscar_por_id = function (req, res) {
    model_registrar_actividad.find({ _id: req.body.idCentro }).then(
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
