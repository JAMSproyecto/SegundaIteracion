'use strict';

let registrar_calificacionMEP = (pidCentro, pestrellasMep) => {
    let request = $.ajax({
        url: "http://localhost:4000/api/registrar_calificacionMEP",
        method: "POST",
        data: {
            idCentro: pidCentro,
            calificacion: pestrellasMep
        },
        dataType: "json",
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
    });

    request.done(function (msg) {
        if (msg.success) {
            console.log(msg);
        } else {
            swal.fire({
                type: 'error',
                title: 'Los datos no pudieron ser guardados',
                text: 'Error al registrar'
            });

        }

    });
    request.fail(function (jqXHR, textStatus) {
        swal.fire({
            type: 'error',
            title: 'Los datos no pudieron ser guardados',
            text: 'Error al registrar'
        });
    });
};