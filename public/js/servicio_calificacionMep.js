'use strict';

let registrar_calificacionMEP = (pidCentro, pestrellasMep, prubro1, pcalificacionRubro1, prubro2, pcalificacionRubro2,prubro3, pcalificacionRubro3,prubro4, pcalificacionRubro4,prubro5, pcalificacionRubro5,prubro6, pcalificacionRubro6,prubro7, pcalificacionRubro7,prubro8, pcalificacionRubro8,prubro9, pcalificacionRubro9,prubro10, pcalificacionRubro10) => {
    let request = $.ajax({
        url: "http://localhost:4000/api/registrar_calificacionMEP",
        method: "POST",
        data: {
            idCentro: pidCentro,
            calificacion: pestrellasMep,
            rubro1: prubro1,
            calificacionRubro1: pcalificacionRubro1,
            rubro2: prubro2,
            calificacionRubro2: pcalificacionRubro2,
            rubro3: prubro3,
            calificacionRubro3: pcalificacionRubro3,
            rubro4: prubro4,
            calificacionRubro4: pcalificacionRubro4,
            rubro5: prubro5,
            calificacionRubro5: pcalificacionRubro5,
            rubro6: prubro6,
            calificacionRubro6: pcalificacionRubro6,
            rubro7: prubro7,
            calificacionRubro7: pcalificacionRubro7,
            rubro8: prubro8,
            calificacionRubro8: pcalificacionRubro8,
            rubro9: prubro9,
            calificacionRubro9: pcalificacionRubro9,
            rubro10: prubro10,
            calificacionRubro10: pcalificacionRubro10
        },
        dataType: "json",
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
    });

    request.done(function (msg) {
        if (msg.success) {
            console.log(msg);
        } else {
            swal.fire({
                type: 'success',
                title: 'Los datos fueron guardados exitosamente',
                text: 'El centro ha recibido un total de ' + pestrellasMep + ' estrellas'
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