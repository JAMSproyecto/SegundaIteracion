'use strict';

const ModelCEduNiveles = require('./CEduNiveles.model');
const Tiza = require('chalk');

module.exports.obtener_todos_niveles_cedu = async (req, res) => {
    try {
	    const filtros = {activo: true};
		const mostrarColumnas = {_id:1, nivel:1};
        const resultado = await ModelCEduNiveles.find(filtros, mostrarColumnas).sort({_id: 'asc'});
        if (!!Object.keys(resultado).length) {
            let obtenerResultado = [];
            const has = Object.prototype.hasOwnProperty;
            let key;
            for (key in resultado) {
                if (!has.call(resultado, key)) continue;
                obtenerResultado.push({
                    'id': resultado[key]['_id'] || 0,
                    'nivel': resultado[key]['nivel'] || ''
                });
            }
            res.json({
                success: true,
                message: obtenerResultado
            });
        } else {
            res.json({
                success: false,
                message: 'No se encontraron registros'
            });
        }
    } catch (err) {
        console.log(Tiza.bold.yellow.bgBlack('Error al obtener los niveles:'));
        console.log(Tiza.bold.yellow.bgBlack(err));
        res.json({
            success: false,
            message: 'Error al obtener los niveles'
        });
    }
};


