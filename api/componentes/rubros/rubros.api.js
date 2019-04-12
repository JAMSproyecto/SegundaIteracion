'use strict';

const model_registrar_rubro = require('./rubros.model');


module.exports.registrar_Rubro = (req, res) =>{
    let rubro_nuevo = new model_registrar_rubro( 
        {
            rubro : req.body.rubro,
            valor : 5,
            estado : 'Inactivo'
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

module.exports.desactivar = function(req, res){
    model_registrar_rubro.findByIdAndUpdate(req.body.id, {$set: { 
        estado: 'Inactivo'
      }},
        function(error){
            if(error){
                res.json({success: false ,msg: 'No se pudo deshabilitar el rubro '});
            }else{
                res.json({success: true ,msg: 'El rubro se desactivó con éxito'}); 
            }
        }
    )
};
module.exports.activar = function(req, res){
    model_registrar_rubro.findByIdAndUpdate(req.body.id, {$set: { 
        estado: 'Activo'
      }},
        function(error){
            if(error){
                res.json({success: false ,msg: 'No se pudo activar el rubro '});
            }else{
                res.json({success: true ,msg: 'El rubro se activó con éxito'}); 
            }
        }
    )
};


module.exports.eliminar = function(req, res){
    modelo_inmueble.findByIdAndRemove(req.body.id,
        function(error){
            if(error){
                res.json({success: false ,msg: 'No se pudo eliminar el inmueble '});
            }else{
                res.json({success: true ,msg: 'El inmueble se eliminó con éxito'}); 
            }
        }
    )

};