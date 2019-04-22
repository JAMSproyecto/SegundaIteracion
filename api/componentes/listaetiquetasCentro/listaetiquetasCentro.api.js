'use strict';

const model_lista_etiqueta = require('./listaetiquetasCentro.model');


module.exports.registrar_etiqueta = (req, res) =>{
    let etiqueta = new model_lista_etiqueta(
        {
            idCentro : req.body.idCentro,
            etiquetas : [{
                _id :  req.body._id,
                nombre :  req.body.nombre
           }]
        }
    );
     
    etiqueta.save(
        function(error){
            if(error){
                res.json(
                    {
                        success : false,
                        msg : `No se puede guardar la etiqueta, ocurrió el siguiente error ${error}`
                    }
                )
            }else{
                res.json(
                    {
                        success : true,
                        msg : `Se registró la etiqueta de forma correcta`
                    }
                )
            }
        }

    );
};


module.exports.lista_etiquetas_centro = (req, res) => {
model_lista_etiqueta.findOne({idCentro: req.body.idCentro}).then(
        function (data) {
            if (data) {
                res.json(
                    {
                        success: true,
                        message: data
                    }
                );
            } else {
                res.json(
                    {
                        success: false,
                        message: 'No se encontraron los datos'
                    }
                );
            }

        }
    )
};


module.exports.agregar_etiquetas = (req, res) =>{

    model_lista_etiqueta.findByIdAndUpdate(
        req.body.idCentro,

        {
            $push:
            {
                'etiquetas':
                {
                  _id: req.body._id,
                  nombre : req.body.etiqueta  
                }
            }

        },
        function(error){
            if (error) {
                res.json(
                    {
                        success : false,
                        msg : `No se pudo guardar la etiqueta, ocurrió el siguiente error ${error}`
                    }
                )
            } else {
                res.json(
                    {
                        success : true,
                        msg : `Se registró la etiqueta con éxito `
                    }
                )
            }
        }

    );
};