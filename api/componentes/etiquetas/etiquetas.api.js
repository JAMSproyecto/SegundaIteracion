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


module.exports.listar_etiquetas = (req, res) => {
    model_etiqueta.find().then(
        function (data) {
            if (data.length > 0) {
                res.json(
                    {
                        success: true,
                        msg: data
                    }
                )
            } else {
                res.json(
                    {
                        success: false,
                        msg: 'Datos no encontrados'
                    }
                )
            }
        }
    );
};


module.exports.actualizar_etiquetas = function(req, res){
   
    model_etiqueta.findByIdAndUpdate(req.body._id, { $set: req.body },
        function (error){
            if(error){
                res.json({success : false , msg : 'No se pudo actualizar el dato'});
            }else{
                res.json({success: true , msg : 'El dato se actualizó con éxito'});
            }
        }
    
    );
};

module.exports.eliminar_etiquetas = function(req, res){
    model_etiqueta.findByIdAndRemove(req.body._id,
        function(error){
            if(error){
                res.json({success: false ,msg: 'No se pudo eliminar el dato '});
            }else{
                res.json({success: true ,msg: 'El dato se eliminó con éxito'}); 
            }
        }
    )

};