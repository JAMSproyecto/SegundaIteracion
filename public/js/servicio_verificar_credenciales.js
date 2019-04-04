'use strict';

function verificar_pin(pPin, pC1) {
  let respuesta = {};
  const peticion = $.ajax({
    url: 'http://localhost:4000/api/verificar_credenciales',
    type: 'post',
    dataType: 'json',
    async: false,
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    cache: false,
    data: {
      pin: pPin,
      contrasenna: pC1
    }
  });

  peticion.done(function (response) {
    respuesta = response;
  });

  peticion.fail(function (response) {
    respuesta = response;
  });

  return respuesta;
};