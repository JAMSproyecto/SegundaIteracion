'use strict';


let get_obtenerPerfil = (pId) => {
  if ('undefined' == typeof pId || null === pId) {
    throw new Error('Error al obtener el perfil: El identificador no puede estar vacio');
  }
  let perfil = {};
  let request = $.ajax({
    url: "http://localhost:4000/api/obtener_centro_por_id/" + pId,
    method: 'GET',
    contentType: "application/x-www-form-urlencoded; charset=utf-8",
    async: false
  });

  request.done(function (res) {
    if (res.success) {
      perfil = res.message;
    } else {
      console.error(res.message);
    }
  });

  request.fail(function (jqXHR, textStatus) {
    console.error('Error al buscar el centro educativo');
  });
  return perfil;
};


//Marlon. Agrego el servicio para calificar el mep. Esta funcionalidad lista las calificaciones

let listar_calificacion_mep = (pId) => {
  let listar_calificaciones = [];
  let request = $.ajax({
    url: "http://localhost:4000/api/listar_calificacion_mep/" + pId,
    method: 'GET',
    contentType: "application/x-www-form-urlencoded; charset=utf-8",
    async: false
  });

  request.done(function (res) {
    if (res.success) {
      listar_calificaciones = res.message;
    } else {
      listar_calificaciones[0] = res.message;
    }
  });

  request.fail(function (jqXHR, textStatus) {
    console.error('Error al buscar el padre');
  });
  return listar_calificaciones;
};



let asignar_calificacion_padre = (pCalificacion, pComentario, pCallback) => {

  let elIdPadre;
  let elIdCentro;
  switch (localStorage.getItem('tipoUsuario').toLowerCase()) {
    case 'padrefamilia':
      elIdPadre = localStorage.getItem('id');
      elIdCentro = localStorage.getItem('verPerfilCEdu');
      break;
    default:
      throw new Error('Error al asignar la calificación del padre: Tipo de usuario no tiene permisos o no existe');
      break;
  }


  let request = $.ajax({
    url: 'http://localhost:4000/api/asignar_calificacion_padre',
    method: 'POST',
    data: {
      idPadre: elIdPadre,
      idCentro: elIdCentro,
      calificacion: pCalificacion,
      comentario: pComentario
    },
    dataType: 'json',
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    cache: false
  }).done((respuesta) => {
    if ('function' == typeof (pCallback)) {
      if ('object' == typeof respuesta) {
        pCallback(respuesta.success, respuesta.message, elIdPadre, elIdCentro);
      } else {
        pCallback(false, respuesta, 0, 0);
      }
    } else {
      throw new Error('Se esperaba una función');
    }
  }).fail((jqXHR, textStatus) => {

    const elError = 'Error asignar_calificacion_padre: ' + jqXHR.statusText + ' [' + jqXHR.status + ']  -  ' + jqXHR.responseText;

    console.log(elError);
    console.log(textStatus);
  });
};




