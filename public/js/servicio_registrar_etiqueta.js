'use strict';

let registrar_etiqueta = (pnombre) => {
    let request = $.ajax({
        url: "http://localhost:4000/api/registrar_etiqueta",
        method: "POST",
        data: { 
            nombre: pnombre
        },
        dataType: "json",
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
    });

    request.done(function (msg) {
        if (msg.success) {
            swal.fire({
                type: 'success',
                title: msg.msg
            });     
        }
        else {
            swal.fire({
                type: 'error',
                title: msg.msg
            });

        }
    });

    request.fail(function (jqXHR, textStatus) {
        swal.fire({
            type: 'error',
            title: 'La actividad no pude ser registrada',
            text: 'Ocurrió un error inesperado, por favor intente de nuevo'
        });
    });
};

