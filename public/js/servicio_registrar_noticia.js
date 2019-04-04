'use strict';

let registrar_noticia = (pidCentro, ptema, pnoticia, pautor, pfecha, 
    pinformacion) => {
    let request = $.ajax({
        url: "http://localhost:4000/api/registrar_noticia",
        method: "POST",
        data: {
            idCentro: pidCentro,
            tema: ptema,
            noticia: pnoticia,
            autor: pautor,
            fecha: pfecha,
            informacion: pinformacion

        },
        dataType: "json",
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
    });

    request.done(function (msg) {
        if (msg.success) {
            swal.fire({
                type: 'success',
                title: 'La noticia fue registrada exitosamente',
                onAfterClose: function () {
                    window.location.replace('./listar_noticia.html');
                  }
            });

        }
        else {
            swal.fire({
                type: 'error',
                title: 'La noticia no fue registrada',
                text: ' Inténtelo nuevamente'
            });

        }

    });

    request.fail(function (jqXHR, textStatus) {
        swal.fire({
            type: 'error',
            title: 'La noticia no puede ser registrada',
            text: 'Ocurrió un error inesperado, por favor intente de nuevo'
        });
    });
};

let listar_todas_noticias = (pId) => {
    let noticias_arreglo = [];
    let request = $.ajax({
        url: "http://localhost:4000/api/listar_todas_noticias/" + pId,
        method: "GET",
        dataType: "json",
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        async: false
    });

    request.done(function (res){
        noticias_arreglo = res.msg;

    });


    request.fail(function (jqXHR, textStatus) {
 
        
    });
    return noticias_arreglo;

}; 