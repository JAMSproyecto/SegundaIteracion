'use strict';


let registrarCentroEducativo = (pNombre, pNombreComercial, pCedulaJuridica, pCorreoCentro, pAnnoFundacion, pResenna, pTelefonoCentro, pFax, pTipoInstitucion, pNiveles, pEtiquetas, pIdProvincia, pIdCanton, pIdDistrito, pDirSennas, pPrimerNombre, pSegundoNombre, pPrimerApellido, pSegundoApellido, pCorreoContacto, pIdentificacionContacto, pDepartamentoContacto, pTelefonoContacto, pfotoCentro) => {
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
            etiquetas: pEtiquetas,
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

    request.done(res => {
        if ('object' == typeof res) {
            if (res.success) {
                Swal.fire({
                    type: 'success',
                    title: res.message
                    onAfterClose: function () {
                        window.location.replace("credenciales.html");
                    }
                });
            } else {
                Swal.fire({
                    type: 'error',
                    title: res.message
                });
            }
        } else {
			Swal.fire({
				type: 'error',
				title: 'Error al obtener la respuesta'
			});
        }
    });

    request.fail(function (jqXHR, textStatus) {
        swal.fire({
            type: 'error',
            title: 'El centro educativo no puede ser registrado',
            html: 'Ocurrió un error inesperado, por favor intente de nuevo'
        });
    });
};

