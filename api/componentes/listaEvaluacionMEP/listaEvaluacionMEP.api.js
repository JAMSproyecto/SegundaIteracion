'use strict';

const model_listaMEP = require('./listaEvaluacionMEP.model');

module.exports.crear_Lista = (req, res) =>{
    let rubro_nuevo = new model_listaMEP( 
        {
            id_Admin : req.body.id_Admin,
            rubros: [
                {
                    rubros : ' ',
                    estado : false
                }
            ]
        }
    );
    
    rubro_nuevo.save(
        function(error){
            if(error){
                res.json(
                    {
                        success : false,
                        msg : `No se puede guardar el rubro, ocurrió el siguiente error ${error}`
                    }
                )
            }else{

                res.json(
                    {
                        success : true,
                        msg : `Se registró el rubro de forma correcta`
                    }
                )
            }
        }

    );
}; 


module.exports.agregar_Rubros = (req, res) =>{
    model_listaMEP.updateOne(
        {id_Admin : req.body.id_Admin},
        {
            $push:
            {
                rubros: [
                    {
                        rubros :req.body.rubro_seleccionado,
                        estado : true
                    }
                ]
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

