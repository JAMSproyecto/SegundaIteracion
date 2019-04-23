'use strict';

const ModelBitacora = require('./bitacora.model');
const Tiza = require('chalk');

module.exports.obtener_todos_bitacora = async (req, res) => {
    try {
	    const omitirColumnas = {_id:0, __v:0};

		//Muestra los Últimos 100,000 registros de la bitácora:
        const resultado = await ModelBitacora.find({}, omitirColumnas).sort({fecha: 'desc'}).limit(100000);
        if (!!Object.keys(resultado).length) {
            res.json({
                success: true,
                message: resultado
            });
        } else {
            res.json({
                success: false,
                message: 'No se encontraron datos en la bitácora'
            });
        }
    } catch (err) {
        console.log(Tiza.bold.yellow.bgBlack('Error al obtener la bitácora:'));
        console.log(Tiza.bold.yellow.bgBlack(err));
        res.json({
            success: false,
            message: 'Error al obtener la bitácora'
        });
    }
};

module.exports.registrar_bitacora = (pAccion, pActor, pFecha) =>{
    let registro = new ModelBitacora({
        accion: pAccion,
        realizadaPor: pActor,
        fecha: pFecha
    });

    registro.save((error)=>{
        if(error){
            return false;
            console.log("Error al registrar bitácora");
        }
        else{
            return true;
            console.log("Éxito al registrar en bitácora");
        }
    });
};
