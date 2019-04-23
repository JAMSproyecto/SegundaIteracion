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
        console.log(`¡Los datos se registraron exitosamente: ${pAccion}!`);
    } catch (err) {
        console.log(`¡No se pueden registrar los datos'${pAccion}':!`);
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
			
			const log = insertarBitacora('CentroEducativo', `¡El proceso no fue realizado con éxito: ${req.body.nombre} | ${error}!`);
			
			console.error(`¡El proceso no fue realizado con éxito, ocurrió el siguiente error: ${error} !`);
			
            res.json(
                {
                    success : false,
                    msg : '¡El proceso no fue realizado con éxito!'
                }
            );
        } else {
			
			const log = insertarBitacora('CentroEducativo', `¡Se registró el artículo: ${req.body.nombre} - ${req.body.descripcion}!`);
			
            res.json(
                {
                    success : true,
                    msg :  '¡El proceso fue registrado con éxito!'
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
                        articulos : `¡No se encontraron los datos!`
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
                        articulo : `¡No se encontraron los datos!`
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
                res.json({success : false , msg : '¡No se pueden actualizar los datos!'});
            }else{
                res.json({success: true , msg : '¡Los datos se actualizaron exitosamente!'});
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
			
			let cambioError ='';
			let cambioOk ='';

			if(req.body.estado == 'Activo'){
				cambioError = 'desactivar';
				cambioOk = 'desactivó';
			}else{
				cambioError = 'activar';
				cambioOk = 'activó';
			}
			
            if(error){
                res.json({success: false ,msg: `¡No se pudo ${cambioError} el artículo!`});
            }else{
                res.json({success: true ,msg: `¡El artículo se ${cambioOk} con éxito!`});
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
                res.json({success: false ,msg: '¡No se pudo eliminar el artículo!'});
            }else{
                res.json({success: true ,msg: '¡Los datos se eliminaron exitosamente!'}); 
            }
        }
    )
};