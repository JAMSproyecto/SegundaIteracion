'use strict';
const model_articulo = require('./articulos.model');
const ModelBitacora = require('./../bitacora_transaccional/bitacora.model');
const ObtenerFecha = require('./../funciones_genericas/obtenerFecha');

/**
 * Función para insertar en la bitácora
 * @param  {String} pRealizadaPor Sólo acepta: 'Instalador'|'SuperAdmin'|'CentroEducativo'|'PadreFamilia'.
 * @param  {String} pAccion Descripción de lo que se va a registrar.
 * @return {Boolean}
 */
let insertarBitacora = async (pRealizadaPor, pAccion) => {
    try {
        let bitacora_nuevo = new ModelBitacora({
            realizadaPor: pRealizadaPor || '',
            accion: pAccion || '',
            fecha: ObtenerFecha.get() || ''
        });
        let guardarAccion = await bitacora_nuevo.save();
        console.log(`Se han registrado los datos en la bitácora: ${pAccion}`);
    } catch (err) {
        console.log(`Error al registrar en la bitácora '${pAccion}':`);
        console.log(err.message);
        return false;
    }
    return true;
};


//función para registrar 
module.exports.registrar = (req,res) => {
    let articulo_nuevo = new  model_articulo(
        {
        nombre : req.body.nombre,
        descripcion : req.body.descripcion,
        estado : 'Activo'
        }
    );


articulo_nuevo.save(
     function(error){
        if (error){
			
			const log = insertarBitacora('CentroEducativo', `Error al registrar el artículo: ${req.body.nombre} | ${error}`);
			
            res.json(
                {
                    success : false,
                    msg : `No se pudo guardar el artículo, ocurrio el siguiente error ${error} `
                }
            );
        } else {
			
			const log = insertarBitacora('CentroEducativo', `Se registró el artículo: ${req.body.nombre} - ${req.body.descripcion}`);
			
            res.json(
                {
                    success : true,
                    msg :  `Se ha registrado el artículo de forma correcta`
                }
            );
        }
    }
);
};

//función para obtener todos los articulos 
module.exports.listar_todos = (req, res) =>{
    model_articulo.find().then(
        function(articulos){
            if (articulos.length > 0) {
                res.json(
                    {
                        success :  true,
                        articulos : articulos
                    }
                )
            } else {
                res.json(
                    {
                        success : false,
                        articulos : `No se encontraron artículos registrados`
                    }
                )
            }
        }
    )
};

//función para obtener articulos esprecificos por medio del id unico 
module.exports.buscar_por_id = (req, res) => {
    //se envian por parametro el id del articulo que se quiere encontrar 
    console.log(req.body.id);
    model_articulo.find({_id : req.body.id }).then(
        function (articulo){
            if (articulo) {
                res.json(
                    {
                        success : true,
                        articulo : articulo
                    }
                )
            } else {
                res.json(
                    {
                        success : false,
                        articulo : `No se encontraron artículos registrados`
                    }
                )
            }
        }
        
    )
};

//función para actualizar los articulos 
module.exports.actualizar = function(req, res){
   
    model_articulo.findByIdAndUpdate(req.body.id, { $set: req.body },
        function (error){
            if(error){
                res.json({success : false , msg : 'No se pudo actualizar el artículo'});
            }else{
                res.json({success: true , msg : 'El artículo se actualizó con éxito'});
            }
        }
    
    );
};

//para activar y desactivar 
module.exports.activar_desactivar = function(req, res){
    let estado ='';

    if(req.body.estado == 'Activo'){
        estado = 'Inactivo';
    }else{
        estado = 'Activo';
    }
    model_articulo.findByIdAndUpdate(req.body.id, {$set: { 
        estado: estado 
      }},
        function(error){
            if(error){
                res.json({success: false ,msg: 'No se pudo activar el artículo '});
            }else{
                res.json({success: true ,msg: 'El artículo se activó con éxito'}); 
            }
        }
    )
};

//para eliminar articulos 
module.exports.eliminar_articulo = function(req, res){
    console.log(req.body.id);
    model_articulo.findByIdAndRemove(req.body.id,

        function(error){
            if(error){
                res.json({success: false ,msg: 'No se pudo eliminar el artículo'});
            }else{
                res.json({success: true ,msg: 'El articulo se eliminó con éxito'}); 
            }
        }
    )
};