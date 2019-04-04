
'use strict';


let buscar_padre = (pIdPadre) => {
  let buscar_info_padre = [];
  let request = $.ajax({
    url: "http://localhost:4000/api/buscar_padre/" + pIdPadre,
    method: 'GET',
    contentType: "application/x-www-form-urlencoded; charset=utf-8",
    async: false
  });

  request.done(function (res) {
    if (res.success) {
      buscar_info_padre = res.message;
    } else {
      buscar_info_padre[0] = res.message;
    }
  });

  request.fail(function (jqXHR, textStatus) {
    console.error('Error al buscar el padre');
  });
  return buscar_info_padre;
};

/*
let buscar_informacion_padre = (pcorreo) => {
  let buscar_informacion_padre = [];
  let request = $.ajax({
      url: "http://localhost:4000/api/buscar_informacion_padre/" + pcorreo,
      method: 'GET',
      contentType: "application/x-www-form-urlencoded; charset=utf-8",
      async: false,
      data: {
      },
      beforeSend: function beforeSend() {
      },
      success: function success(response) {
        buscar_informacion_padre = response;
      },
      error: function error(_error) {
          console.log("Request fail error:" + _error);
      }

  });

  request.done(function (res){
    buscar_informacion_padre = res.correo;
  });

  request.fail(function (jqXHR, textStatus){

  });
  return buscar_informacion_padre;
}; */
