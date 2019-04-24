'use strict';

/**
 * Aprobar centro educativo
 * @param  {Number} pIdCentro
 */
let aprobar_cedu = (pIdCentro) => {
    if ('undefined' == typeof pIdCentro || null === pIdCentro) {
        throw new Error('Error al aprobar el centro educativo: El identificador no puede estar vacio');
    }

    let request = $.ajax({
        url: 'http://127.0.0.1:4000/api/aprobar_centro_educativo/' + pIdCentro,
        method: 'GET',
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        cache: false,
        async: false
    });

    request.done(res => {
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
};
