'use strict';

let registrar_calificacionMEP = (pidCentro, pestrellasMep, prubro1, pcalificacionRubro1, prubro2, pcalificacionRubro2, prubro3, pcalificacionRubro3, prubro4, pcalificacionRubro4, prubro5, pcalificacionRubro5, prubro6, pcalificacionRubro6, prubro7, pcalificacionRubro7, prubro8, pcalificacionRubro8, prubro9, pcalificacionRubro9, prubro10, pcalificacionRubro10) => {
    let request = $.ajax({
        url: "http://localhost:4000/api/registrar_calificacionMEP",
        method: "POST",
        data: {
            idCentro: pidCentro,
            calificacionTotal: pestrellasMep,
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

    request.done(res => {
        if (res.success) {

            const HtmlEstrellaAmarilla = '<i class="fas fa-star" style="color: rgb(255, 203, 49);"></i>';
            const HtmlEstrellaGris = '<i class="far fa-star" style="color: rgb(50, 50, 50);"></i>';

            let TOP = 5, i = 0, estrellasMepHtml = '';
            for (; i < TOP; ++i) {
                if (i < pestrellasMep) {
                    estrellasMepHtml += HtmlEstrellaAmarilla;
                } else {
                    estrellasMepHtml += HtmlEstrellaGris;
                }
            }

            Swal.fire({
                type: 'success',
                title: res.msg,
                html: '<p>La calificación total es:</p><p><span class="plataformaEstrella">' + estrellasMepHtml + '</span></p> ',
                onAfterClose: () => {
                     location.replace('./perfilCentroAdmin.html');
                }
            });
        } else {
            Swal.fire({
                type: 'error',
                title: res.msg,
                text: 'Error al registrar'
            });
        }
    });
    request.fail(function (jqXHR, textStatus) {
        console.error('Ocurrió un error al registrar la calificación');
    });
};


let listar_calificacion_CEdu = (pId) => {
    let calificacionMEP = [];
    let request = $.ajax({
        url: "http://localhost:4000/api/listar_calificacionMEP/" + pId,
        method: "GET",
        dataType: "json",
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        async: false
    });

    request.done(function (res) {
        calificacionMEP = res.msg;

    });


    request.fail(function (jqXHR, textStatus) {


    });
    return calificacionMEP;

};