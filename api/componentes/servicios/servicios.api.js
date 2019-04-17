'use strict';
const model_servicio = require('./servicios.model');
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


//funcion para regsitrar servicios 
module.exports.registrar = (req,res) =>{
    let servicio_nuevo = new model_servicio(
        {
            nombre : req.body.nombre,
            descripcion : req.body.descripcion
        }
    );

servicio_nuevo.save(
        function(error){
            if (error) {
                const log = insertarBitacora('CentroEducativo', `Error al registrar el servicio: ${req.body.nombre} | ${error}`);

                res.json(
                    {
                        succes : false,
                        msg : `No se pudo guardar el servicio, ocurrio el siguiente error ${error} `
                    }
                );
            } else {
                const log = insertarBitacora('CentroEducativo', `Se registró el servicio: ${req.body.nombre} - ${req.body.descripcion}`);
                
                res.json(
                    {
                        success : true,
                        msg :  `Se ha registrado el servicio de forma correcta`
                    }
                );
            }
        }
    );    
};

