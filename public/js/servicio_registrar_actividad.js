'use strict';

let registrar_actividad = (pidCentro, pactividad, pfecha, phora_inicio, pfinaliza, plugar, pdetalles) => {
    let request = $.ajax({
        url: "http://localhost:4000/api/registrar_actividad",
        method: "POST",
        data: {
            idCentro: pidCentro,
            actividad: pactividad,
            fecha: pfecha,
            hora_inicio: phora_inicio,
            finaliza: pfinaliza,
            lugar: plugar,
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
            title: 'El dato no pude ser registrado',
            text: 'Ocurrió un error inesperado, por favor intente de nuevo'
        });
    });
};

let listar_todas_actividades = (pId) => {
    let actividades_arreglo = [];
    let request = $.ajax({
        url: "http://localhost:4000/api/listar_todas_actividades/" + pId,
        method: "GET",
        dataType: "json",
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        async: false
    });
    request.done(function (res) {
        actividades_arreglo = res.msg;

    });

    request.fail(function (jqXHR, textStatus) {


    });
    return actividades_arreglo;

};


let buscar_actividad = (idCentro) => {
    let actividad = [];
    let request = $.ajax({
        url: "http://localhost:4000/api/buscar_actividad/" + idCentro,
        method: "GET",
        dataType: "json",
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        async: false
    });
    request.done(function (res) {
        actividad = res.msg;

    });

    request.fail(function (jqXHR, textStatus) {


    });
    return actividad;

};


let actualizar = (pactividad, pfecha, phora_inicio, pfinaliza, plugar, pdetalles, pid) => {

    let request = $.ajax({
        url: "http://localhost:4000/api/actualizar_noticia",
        method: "POST",
        data: {
            actividad: pactividad,
            fecha: pfecha,
            hora_inicio: phora_inicio,
            finaliza: pfinaliza,
            lugar: plugar,
            detalles: pdetalles,
            id: pid
        },
        dataType: "json",
        async: false,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
    });

    request.done(function (msg) {
        if (msg.success) {
            swal.fire({
                type: 'success',
                title: msg.msg,
                onAfterClose: function () {
                    window.location.replace('./listar_actividad.html');
                }
            });

        }
        else {
            swal.fire({
                type: 'error',
                title: msg.msg
            });

        }

    });

    request.fail(function (jqXHR) {
        console.error(jqXHR);
    });
};



let eliminar_actividad = (pid) => {
    let request = $.ajax({
        url: "http://localhost:4000/api/eliminar_actividad",
        method: "POST",
        data: {
            id: pid
        },
        dataType: "json",
        async: false,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
    });

    request.done(function (msg) {
        if (msg.success) {
            swal.fire({
                type: 'success',
                title: msg.msg,
                onAfterClose: function () {
                    window.location.replace('./listar_actividad.html');
                }
            });

        }
        else {
            swal.fire({
                type: 'error',
                title: msg.msg
            });

        }

    });

    request.fail(function (jqXHR) {

    });
};




