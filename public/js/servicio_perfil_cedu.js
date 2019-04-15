'use strict';


let get_obtenerPerfil = (pId)=>{
    if ('undefined' == typeof pId || null === pId) {
        throw new Error('Error al obtener el perfil: El identificador no puede estar vacio');
    }
  let perfil;
  let request = $.ajax({
    url: "http://localhost:4000/api/obtener_centro_por_id/" + pId,
    method: 'GET',
    contentType: "application/x-www-form-urlencoded; charset=utf-8",
    async: false
  });

  request.done(function (res) {
    if (res.success) {
        perfil = res.message;
    }
  });

  request.fail(function (jqXHR, textStatus) {
    console.error('Error al buscar el padre');
  });
  return perfil;
};