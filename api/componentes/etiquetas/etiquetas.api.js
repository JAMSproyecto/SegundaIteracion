'use strict';
const model_etiqueta = require('./etiquetas.model');

//función para registrar una etiqueta
module.exports.registrar = (req,res) => {
    let etiqueta_nuevo = new  model_etiqueta(
        {
        nombre : req.body.nombre,
        }
    );

etiqueta_nuevo.save(
    function(error){
        if (error){
            res.json(
                {
                    success : false,
                    msg : `No se pudo guardar la etiqueta, ocurrio el siguiente error ${error} `
                }
            )
        } else {
            res.json(
                {
                    success : true,
                    msg :  `se registro la etiqueta de forma correcta`
                }
            )
        };
    }
);
};