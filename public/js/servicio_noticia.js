'use strict';

let registrar_noticia = (pidCentro, ptema, pinformacion) => {
    if ('undefined' == typeof pidCentro || null === pidCentro) {
        throw new Error('Error al registrar noticia: El identificador no puede estar vacio');
    }
    let request = $.ajax({
        url: "http://localhost:4000/api/registrar_noticia",
        method: "POST",
        data: {
            idCentro: pidCentro,
            tema: ptema,
            informacion: pinformacion

        },
        dataType: "json",
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
    });

    request.done(function (res) {
        if (res.success) {
            swal.fire({
                type: 'success',
                title: res.msg,
                onAfterClose: function () {
                    location.replace('./listar_noticia.html');
                }
            });
        } else {
            swal.fire({
                type: 'error',
                title: res.msg,
                text: 'Por favor, intente de nuevo'
            });
        }
    });

    request.fail(function (jqXHR, textStatus) {
        console.error(textStatus);
        console.error(jqXHR);
    });
}; 

let listar_todas_noticias = () => {
	
    let idCentro;
    switch(localStorage.getItem('tipoUsuario').toLowerCase()){
        case 'superadmin':
            idCentro = localStorage.getItem('verPerfilCEdu');
            break;
        case 'centroeducativo':
            idCentro = localStorage.getItem('id');
            break;
        case 'padrefamilia':
            idCentro = localStorage.getItem('verPerfilCEdu');
            break;
        default:
		    throw new Error('Error al listar noticias: Tipo de usuario desconocido');
            break;
    }
	
    if ('undefined' == typeof idCentro || null === idCentro) {
        throw new Error('Error al listar noticias: El identificador no puede estar vacio');
    }

    let noticias_arreglo = [];
    let request = $.ajax({
        url: "http://localhost:4000/api/listar_todas_noticias/" + idCentro,
        method: "GET",
        dataType: "json",
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        async: false
    });

    request.done(function (res) {
		if(res.success){
            noticias_arreglo = res.msg;
		}else{
			console.log(res.msg);
		}

    });

    request.fail(function (jqXHR, textStatus) {
        console.error(textStatus);
        console.error(jqXHR);
    });

    return noticias_arreglo;

};

let buscar_noticia = (pIdCentro) => {
    if ('undefined' == typeof pIdCentro || null === pIdCentro) {
        throw new Error('Error al buscar noticia: El identificador no puede estar vacio');
    }
    let noticia = [];
    let request = $.ajax({
        url: "http://localhost:4000/api/buscar_noticia/" + pIdCentro,
        method: "GET",
        dataType: "json",
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        async: false
    });

    request.done(function (res) {
        noticia = res.msg;

    });

    request.fail(function (jqXHR, textStatus) {
        console.error(textStatus);
        console.error(jqXHR);
    });

    return noticia;

};



let actualizar = (ptema, pinformacion, pid) => {
    if ('undefined' == typeof pid || null === pid) {
        throw new Error('Error al actualizar noticia: El identificador no puede estar vacio');
    }
    let request = $.ajax({
        url: "http://localhost:4000/api/actualizar_noticia",
        method: "POST",
        data: {
            tema: ptema,
            informacion: pinformacion,
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
                    window.location.replace('./listar_noticia.html');
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

    request.fail(function (jqXHR, textStatus) {
        console.error(textStatus);
        console.error(jqXHR);
    });
};


let eliminar = (ptema, pinformacion, pid) => {
    if ('undefined' == typeof pid || null === pid) {
        throw new Error('Error al eliminar noticia: El identificador no puede estar vacio');
    }
    let request = $.ajax({
        url: "http://localhost:4000/api/actualizar_noticia",
        method: "POST",
        data: {
            tema: ptema,
            informacion: pinformacion,
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
                    window.location.replace('./listar_noticia.html');
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

    request.fail(function (jqXHR, textStatus) {
        console.error(textStatus);
        console.error(jqXHR);
    });
};





