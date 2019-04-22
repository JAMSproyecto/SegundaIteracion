'use strict';

const model_etiqueta = require('./etiquetas.model');


module.exports.registrar_etiqueta = (req, res) =>{
    let etiqueta = new model_etiqueta(
        {
            nombre : req.body.nombre
        }
    );
     
    etiqueta.save(
        function(error){
            if(error){
                res.json(
                    {
                        success : false,
                        msg : `¡El proceso no fue registrado con éxito, ocurrió el siguiente error ${error}!`
                    }
                )
            }else{
                res.json(
                    {
                        success : true,
                        msg : `¡El proceso se registró de manera exitosa!`
                    }
                )
            }
        }

    );
};