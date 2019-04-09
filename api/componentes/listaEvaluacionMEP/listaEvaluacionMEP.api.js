'use strict';

const model_listaMEP = require('./listaEvaluacionMEP.model');


module.exports.agregar_Rubros = (req, res) =>{

    model_listaMEP.update(
        { _id : req.body.id_lista},

        {
            $push:
            {
                'rubros':
                {
                  rubro: req.body.rubro
                }
            }

        },
        function(error){
            if (error) {
                res.json(
                    {
                        success : false,
                        msg : `No se pudo guardar el rubro, ocurrio el siguiente error ${error}`
                    }
                )
            } else {
                res.json(
                    {
                        success : true,
                        msg : `Se registro el rubro con exito `
                    }
                )
            }
        }

    );
};
