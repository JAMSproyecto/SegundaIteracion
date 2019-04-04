'use strict';

function validar_pin(pPin, pC1, pC2) {
  let respuesta = {};
  let peticion = $.ajax({
    url: 'http://localhost:4000/api/validar_pin',
    type: 'post',
    contentType: 'application/x-www-form-urlencoded; charset=utf-8',
    dataType: 'json',
    async: false,
    data: {
      pin: pPin,
      c1: pC1,
      c2: pC2
    }
  });

  peticion.done(function (response) {
    respuesta = response;
    //sessionStorage.setItem('conectado', response.success);
    //sessionStorage.setItem('tipo_usuario', response.usuario.tipo);
  });

  peticion.fail(function (response) {
    respuesta = response;
  });

  return respuesta;
};