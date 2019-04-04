'use strict';


let get_obtenerPerfil = (pId)=>{
  let perfil;
  let request = $.ajax({
    url: "http://localhost:4000/api/obtener_perfil_centro_educativo/" + pId,
    method: 'GET',
    contentType: "application/x-www-form-urlencoded; charset=utf-8",
    async: false
  });

  request.done(function (res) {
    if (res.success)
      perfil = res.centro;
  });

  request.fail(function (jqXHR, textStatus) {
    console.error('Error al buscar el padre');
  });
  return perfil;
};