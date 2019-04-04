'use strict';

const model_registrar_actividad = require('./registrar_actividad.model');


module.exports.registrar_actividad = (req, res) =>{
    let actividad_nueva = new model_registrar_actividad(
        {
            idCentro : req.body.idCentro,
            actividad : req.body.actividad,
            fecha: req.body.fecha,
            hora_inicio : req.body.hora_inicio,
            finaliza : req.body.finaliza,
            costo: req.body.costo,
            lugar: req.body.lugar,
            finalidad: req.body.finalidad,
            detalles: req.body.detalles
        }
    );
    
    actividad_nueva.save(
        function(error){
            if(error){
                res.json(
                    {
                        success : false,
                        msg : `No se puede guardar el comentario ocurrió el siguiente error ${error}`
                    }
                )
            }else{

                res.json(
                    {
                        success : true,
                        msg : `Se registró atividad de forma correcta`
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
module.exports.listar_todas_actividades = (req ,res) =>{

    const filtros = {idCentro: req.body.idCentro};
    
    model_registrar_actividad.find(filtros).then(
        function(actividades){
            if(actividades.length > 0){
                res.json(
                    {
                        success: true,
                        msg: actividades
                    }
                )
            }else{
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

