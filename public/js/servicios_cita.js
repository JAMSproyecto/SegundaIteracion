'use strict';


let registrar_cita = (pId, pNombre, pApellidos, pTelefono, pCorreo, pfecha, phora, pmotivo, pcomentario) => {
    let request = $.ajax({
            url: "http://localhost:4000/api/registrar_cita",
            type: "POST",
            data: {
                Nombre: pNombre,
                Apellidos: pApellidos,
                Telefono: pTelefono,
                Correo: pCorreo,
                Fecha: pfecha,
                Hora: phora,
                Motivo: pmotivo,
                Comentario: pcomentario,
                Centro_asociado: pId
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
        if(res.success)
            lista_citas = res.citas;
    });

    request.fail(function (jqXHR, textStatus) {

    });
    return lista_citas;

};

let eliminar_cita = (pId) =>{
    let request = $.ajax({
        url: "http://localhost:4000/api/eliminar_cita/",
        type: "POST",
        data: {
            id: pId
        },
        dataType: "json",
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        async: false
    });

    request.done(function (res) {
        swal.fire({
            type: 'success',
            title: 'La cita fue cancelada exitosamente'
        });
    });

    request.fail(function (jqXHR, textStatus) {
        swal.fire({
            type: 'error',
            title: 'Ocurrió un error inesperado al eliminar la cita'
        });
    });

}