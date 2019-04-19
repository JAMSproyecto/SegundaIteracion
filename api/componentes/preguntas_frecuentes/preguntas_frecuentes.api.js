'use strict';

const Model_PreguntaFrecuente = require('./preguntas_frecuentes.model');

/**
 * Método para agregar pregunta frecuente para centro educativo
 * @param req{
 *              Pregunta,
 *              Respuesta,
 *              ID Centro Educativo
 *          }
 * @returns res {
 *          exito,
 *          (Opcional)msg,
 *          
 *      }
 */
module.exports.registrar_PreguntaFrecuente_CentroEducativo = (req, res) =>{

    let preguntaFrecuente = new Model_PreguntaFrecuente({
        pregunta: req.body.pregunta,
        respuesta: req.body.respuesta,
        idCentroEducativo: req.body.idCentroEducativo
    });

    preguntaFrecuente.save( (error)=>{
        if(error){
            console.log(`No se pudo guardar la pregunta frecuente, ocurrió el siguiente error ${error} `); 

            res.json({
                exito: false,
                msg: 'No se logró registrar pregunta frecuente'
            });
        }
        else{
            console.log(`La pregunta frecuente se registró correctamente `);

            res.json({
                exito: true,
                msg: 'La pregunta frecuente se registró correctamente'
            });
        }
    });

    
}; 
/**
 Método para agregar pregunta frecuente para la aplicación
 * @param req{
 *              Pregunta,
 *              Respuesta
 *          }
 * @returns res {
 *          exito,
 *          (Opcional)msg,
 *          
 *      }
 */
module.exports.obtener_PreguntaFrecuente_CentroEducativo = (req ,res) =>{
    Model_PreguntaFrecuente.find({
        idCentroEducativo: req.body.idCentroEducativo
    }).then(
        function(preguntasFrecuentes){
            if(preguntasFrecuentes.length > 0){
                res.json(
                    {
                        exito: true,
                        preguntasFrecuentes: preguntasFrecuentes
                    }
                )
            }else{
                res.json(
                    {
                        exito: false,
                        comentarios: 'No se encontraron preguntas frecuentes'
                    }
                )
            }
        }

    )
};


/**
 * Método para agregar pregunta frecuente para centro educativo
 * @param req{
 *              Pregunta,
 *              Respuesta
 *          }
 * @returns res {
 *          exito,
 *          (Opcional)msg,
 *          
 *      }
 */
module.exports.registrar_PreguntaFrecuente_General = (req, res) =>{

    let preguntaFrecuente = new Model_PreguntaFrecuente({
        pregunta: req.body.pregunta,
        respuesta: req.body.respuesta,
        idCentroEducativo: "General"
    });

    preguntaFrecuente.save( (error)=>{
        if(error){
            console.log(`No se pudo guardar la pregunta frecuente, ocurrió el siguiente error ${error}`);

            res.json({
                exito: false,
                msg: 'No se pudo registrar pregunta frecuente'
            });
        }
        else{
            console.log(`Se ha registrado la pregunta frecuente de forma correcta`);

            res.json({
                exito: true,
                msg: 'Se ha registrado la pregunta frecuente de forma correcta'
            });
        }
    });

    
};

/**
 Método para agregar pregunta frecuente para la aplicación
 * @param req{
 *              Pregunta,
 *              Respuesta
 *          }
 * @returns res {
 *          exito,
 *          (Opcional)msg,
 *          
 *      }
 */
module.exports.obtener_PreguntaFrecuente_General = (req ,res) =>{
    Model_PreguntaFrecuente.find({
        idCentroEducativo: "General"
    }).then(
        function(preguntasFrecuentes){
            if(preguntasFrecuentes.length > 0){
                res.json(
                    {
                        exito: true,
                        preguntasFrecuentes: preguntasFrecuentes
                    }
                )
            }else{
                res.json(
                    {
                        exito: false,
                        comentarios: 'No se encontraron preguntas frecuentes'
                    }
                )
            }
        }

    )
};

/**
 Método para agregar pregunta frecuente para la aplicación
 * @param req{
 *              Pregunta,
 *              Respuesta
 *          }
 * @returns res {
 *          exito,
 *          (Opcional)msg,
 *          
 *      }
 */
module.exports.obtener_PreguntaFrecuente = (req ,res) =>{
    console.log(req.body.id);
    Model_PreguntaFrecuente.findById(
        req.body.id,
        function(error,preguntaFrecuente){
            if(error){
                res.json(
                    {
                        exito: false
                    }
                )
            }else{
                res.json(
                    {
                        exito: true,
                        preguntaFrecuente: preguntaFrecuente
                    }
                )
            }
        }
    )
};

module.exports.actualizar_PreguntaFrecuente = function(req, res){
    Model_PreguntaFrecuente.findByIdAndUpdate(req.body.id, { $set: {
        pregunta: req.body.pregunta,
        respuesta: req.body.respuesta
    } },
        function (error){
            console.log(error);
            if(error){
                
                res.json({success : false , msg : 'No se pudo actualizar la pregunta frecuente'});
            }else{
                res.json({success: true , msg : 'La pregunta frecuente se actualizó con éxito'});
            }
        }
    
    );
};

module.exports.eliminar_PreguntaFrecuente = function(req, res){
    console.log(req.body.id);
    Model_PreguntaFrecuente.findByIdAndRemove(req.body.id,

        function(error){
            if(error){
                res.json({success: false ,msg: 'No se pudo eliminar el artículo'});
            }else{
                res.json({success: true ,msg: 'El articulo se eliminó con éxito'}); 
            }
        }
    )
};