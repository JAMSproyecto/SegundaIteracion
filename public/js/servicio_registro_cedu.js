'use strict';


let registrarCentroEducativo = (pNombre, pNombreComercial, pCedulaJuridica, pCorreoCentro, pAnnoFundacion, pResenna, pTelefonoCentro, pFax, pTipoInstitucion, pNiveles, pIdProvincia, pIdCanton, pIdDistrito, pDirSennas, pPrimerNombre, pSegundoNombre, pPrimerApellido, pSegundoApellido, pCorreoContacto, pIdentificacionContacto, pDepartamentoContacto, pTelefonoContacto, pfotoCentro) => {
    let request = $.ajax({
        url: "http://localhost:4000/api/registrar_centro_educativo",
        method: "POST",
        data: {
            nombre: pNombre,
            nombreComercial: pNombreComercial,
            cedulaJuridica: pCedulaJuridica,
            correoCentro: pCorreoCentro,
            annoFundacion: pAnnoFundacion,
            resenna: pResenna,
            telefonoCentro: pTelefonoCentro,
            fax: pFax,
            tipoInstitucion: pTipoInstitucion,
            niveles: pNiveles,
            idProvincia: pIdProvincia,
            idCanton: pIdCanton,
            idDistrito: pIdDistrito,
            dirSennas: pDirSennas,
            primerNombre: pPrimerNombre,
            segundoNombre: pSegundoNombre,
            primerApellido: pPrimerApellido,
            segundoApellido: pSegundoApellido,
            correoContacto: pCorreoContacto,
            identificacionContacto: pIdentificacionContacto,
            departamentoContacto: pDepartamentoContacto,
            telefonoContacto: pTelefonoContacto,
            fotoCentro: pfotoCentro
        },
        dataType: "json",
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        cache: false
    });

    request.done(function (res) {
        if ('object' == typeof (res)) {
            if (res.success) {
                swal.fire({
                    type: 'success',
                    title: 'Éxito',
                    html: 'El centro educativo se registr&oacute; correctamente',
                    onAfterClose: function () {
                        window.location.replace("credenciales.html");
                    }
                });
            } else {
                Swal.fire({
                    toast: false,
                    type: 'error',
                    position: 'top',
                    animation: false,
                    customClass: 'animated tada',
                    showConfirmButton: true,
                    text: res.message
                });

            }
        } else {
            Swal.fire({
                toast: false,
                type: 'error',
                position: 'top',
                animation: false,
                customClass: 'animated tada',
                showConfirmButton: true,
                text: 'Error al obtener la respuesta'
            });

        }
    });

    request.fail(function (jqXHR, textStatus) {
        swal.fire({
            type: 'error',
            title: 'El centro educativo no puede ser registrado',
            html: 'Ocurri&oacute; un error inesperado, por favor intente de nuevo'
        });
    });
};

