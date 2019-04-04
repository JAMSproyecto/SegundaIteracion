'use strict';

let registrar_actividad = (pidCentro, pactividad, pfecha, phora_inicio, pfinaliza, pcosto,
    plugar, pfinalidad, pdetalles) => {
    let request = $.ajax({
        url: "http://localhost:4000/api/registrar_actividad",
        method: "POST",
        data: {
            idCentro: pidCentro,
            actividad: pactividad,
            fecha: pfecha,
            hora_inicio: phora_inicio,
            finaliza: pfinaliza,
            costo: pcosto,
            lugar: plugar,
            finalidad: pfinalidad,
            detalles: pdetalles

        },
        dataType: "json",
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
    });

    request.done(function (msg) {
        if (msg.success) {
            swal.fire({
                type: 'success',
                title: 'Los datos fueron guardados exitosamente',
                text: ' Nos comunicaremos con usted',
                onAfterClose: function () {
                    window.location.replace('./listar_actividad.html');
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

let listar_todas_actividades = () => {
    let actividades_arreglo = [];
    let idCentro;
    switch(sessionStorage.getItem('tipoUsuario').toLowerCase()){
        case 'centroeducativo':
            idCentro = sessionStorage.getItem('id');
            break;
        case 'padrefamilia':
            idCentro = sessionStorage.getItem('padreVerPerfilCEdu');
            break;
        default:
        break;
        
    }

    let request = $.ajax({
        url: "http://localhost:4000/api/listar_todas_actividades/" + idCentro,
        method: "GET",
        dataType: "json",
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        async: false
    });
    request.done(function (res){
        actividades_arreglo = res.msg;

        

    });


    request.fail(function (jqXHR, textStatus) {
 
        
    });
    return actividades_arreglo;

};