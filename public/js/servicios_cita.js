'use strict';


let registrar_cita = (pid,pnombre, papellidos, ptelefono, pcorreo, pfecha, phora, pmotivo, pcomentario) => {
    let request = $.ajax({
            url: "http://localhost:4000/api/registrar_cita",
            type: "POST",
            data: {
                Nombre: pnombre,
                Apellidos: papellidos,
                Telefono: ptelefono,
                Correo: pcorreo,
                Fecha: pfecha,
                Hora: phora,
                Motivo: pmotivo,
                Comentario: pcomentario,
                Centro_asociado: pid
            },
            dataType: "json",
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
        }

    );

    request.done(function (msg) {
            swal.fire({
                type: 'success',
                title: 'Los datos fueron guardados exitosamente',
                text: 'Nos comunicaremos con usted tan pronto como sea posible',
      
            }).then((result) => {
                if (result.value) {
                  window.location.href = 'perfilCentroPadre.html';
                }
        })
     });

    request.fail(function (jqXHR, textStatus) {
        swal.fire({
            type: 'error',
            title: 'Los datos no se lograron guardar',
            text: 'Error de conexión'
        });
    });
};



let listar_citas = (id) => {
    let lista_citas = [];
    let request = $.ajax(
        {
            url: "http://localhost:4000/api/obtener_citasCentro/" + id,
            type: "GET",
            dataType: "json",
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            async: false
        }
    );

    request.done(function (res) {
        lista_citas = res.citas;
    });

    request.fail(function (jqXHR, textStatus) {

    });
    return lista_citas;

};