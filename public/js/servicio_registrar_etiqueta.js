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
                title: 'Registro completo',
                text: 'Se ha registrado la etiqueta en la base de datos',
                onAfterClose: function () {
                    window.location.replace('#');
                  }
            });     
        }
        else {
            swal.fire({
                type: 'error',
                title: 'Los datos no se guardados',
                text: 'Error al registrar'
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

