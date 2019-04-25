'use strict';

/**
 * Aprobar centro educativo
 * @param  {Number} pIdCedu
 * @return  {Boolean}
 */
let aprobar_cedu = (pIdCedu) => {
    if ('undefined' == typeof pIdCedu || null === pIdCedu) {
        throw new Error('Error al aprobar el centro educativo: El identificador no puede estar vacio');
    }

let resultado = false;

    let request = $.ajax({
        url: 'http://127.0.0.1:4000/api/aprobar_centro_educativo/' + pIdCedu,
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

