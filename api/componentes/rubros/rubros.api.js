'use strict';

const model_registrar_rubro = require('./rubros.model');


module.exports.registrar_Rubro = (req, res) =>{
    let rubro_nuevo = new model_registrar_rubro( 
        {
            rubro : req.body.rubro

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



module.exports.listar_Rubros = (req, res) => {
    model_registrar_rubro.find().then(
        function (data) {
            if (data.length > 0) {
                res.json(
                    {
                        success: true,
                        data: data
                    }
                )
            } else {
                res.json(
                    {
                        success: false,
                        data: 'Datos no encontrados'
                    }
                )
            }
        }
    );
};

module.exports.actualizar_Rubros = function(req, res){
   
    model_registrar_rubro.findByIdAndUpdate(req.body.id, { $set: req.body },
        function (error){
            if(error){
                res.json({success : false , msg : 'No se pudo actualizar la información del usuario'});
            }else{
                res.json({success: true , msg : 'El usuario se actualizó con éxito'});
            }
        }
    
    );
};

