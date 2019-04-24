'use strict';

/**
 * Retorna la calificación total del 1 al 5. 
 * En caso de error retorna -1. 
 * @param {Object} pCalificaciones Ejemplo: [ { "calificacion" : 4 }, { "calificacion" : 1 } ]
 * @return {Number}
 */
let obtenerRankingPadres = (pCalificaciones) => {
    try {
        if ('object' == typeof pCalificaciones) {

            const VALOR_PORCENTUAL = 5;	// 5% -> 5 estrellitas.	
            const cantCalificaciones = Object.keys(pCalificaciones).length;

            // El valor total = cantidad * porcentaje 
            const valorPuntos = cantCalificaciones * VALOR_PORCENTUAL;

            let resultadoTotal = 0;

            if (cantCalificaciones > 0) {

                //Obtenemos la sumatoria de las calificaciones:
                let sumatoria = 0;
                pCalificaciones.forEach(res => (sumatoria += res.calificacion));

                //El resultado se redondear hacia arriba.
                resultadoTotal = Math.round((sumatoria / valorPuntos) * VALOR_PORCENTUAL);

                //Si el número redondeado resultó ser mayor a VALOR_PORCENTUAL entonces lo igualamos a VALOR_PORCENTUAL:
                if (resultadoTotal > VALOR_PORCENTUAL) {
                    resultadoTotal = VALOR_PORCENTUAL;
                }
            }

            return resultadoTotal;
        } else {
            return -1;
        }
    } catch (err) {
        console.log('Error al obtener el ranking de padres:');
        console.log(err.message);
        return -1;
    }
};

module.exports.get = obtenerRankingPadres;
