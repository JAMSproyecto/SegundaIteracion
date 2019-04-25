'use strict';

/**
 * Aprobar centro educativo
 * @param  {Number} pIdCedu
 * @return  {Boolean}
 */
let aprobar_cedu = (pIdCedu, esAprobar) => {
    if ('undefined' == typeof pIdCedu || null === pIdCedu) {
        throw new Error('Error al aprobar el centro educativo: El identificador no puede estar vacio');
    }

let resultado = false;

let laUrl = 'http://127.0.0.1:4000/api/aprobar_centro_educativo/' + pIdCedu;
if(esAprobar === false){
	//es rechazar:
	laUrl = 'http://127.0.0.1:4000/api/rechazar_centro_educativo/' + pIdCedu;
}

    let request = $.ajax({
        url: laUrl,
        method: 'GET',
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        cache: false,
        async: false
    });

    request.done(res => {
		resultado = res.success;
        if (res.success) {
            Swal.fire({
                type: 'success',
                title: res.message
            });
        } else {
            Swal.fire({
                type: 'error',
                title: res.message
            });
        }
    });

    request.fail((jqXHR, textStatus) => {
        console.error(textStatus);
        console.error(jqXHR);
    });
	
return resultado;
};

