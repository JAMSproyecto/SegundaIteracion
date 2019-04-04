/**
 * Retorna la fecha en el formato 'YYYY-MM-DD hh:mm:ss'
 * @return {String}
 */
let obtenerFecha = () => {
    const fecha = new Date();
    const dia_semana = fecha.getDay();
    const anio = fecha.getFullYear();
    let dia_mes = fecha.getDate();
    let mes = fecha.getMonth();
	let h = fecha.getHours();
    let m = fecha.getMinutes();
    let s = fecha.getSeconds();
    mes += 1;
    if (mes < 10) {
        mes = '0' + mes;
    }
    if (dia_mes < 10) {
        dia_mes = '0' + dia_mes;
    }
	if (h < 10) {
        h = '0' + h;
    }
    if (m < 10) {
        m = '0' + m;
    }
    if (s < 10) {
        s = '0' + s;
    }
    return anio + '-' + mes + '-' + dia_mes + ' ' + h + ':' + m + ':' + s;
};

module.exports.get = obtenerFecha;
