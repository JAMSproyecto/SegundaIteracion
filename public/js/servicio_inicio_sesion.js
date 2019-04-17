'use strict';

let validar_credenciales = (pusuario, pcontrasenna) => {
  let respuesta = false;
  let peticion = $.ajax({
    url: 'http://localhost:4000/api/validar_credenciales',
    type: 'post',
    contentType: 'application/x-www-form-urlencoded; charset=utf-8',
    dataType: 'json',
    async: false,
    data: {
      correo: pusuario,
      contrasena: pcontrasenna
    }
  });

  peticion.done(response => {

    localStorage.setItem('tiempoConexion', (new Date()).getTime());
    localStorage.setItem('conectado', response.success);
    localStorage.setItem('tipoUsuario', response.message.tipoUsuario);
    localStorage.setItem('nombreUsuario', response.message.nombreUsuario);
    localStorage.setItem('correo', pusuario);
    localStorage.setItem('id', response.message.id);

    if ('undefined' !== typeof response.message.nombreInstitucion) {
      localStorage.setItem('nombreInstitucion', response.message.nombreInstitucion);
    } else {
      localStorage.setItem('nombreInstitucion', '');
    }

    respuesta = response.success;
  });

  peticion.fail(jqXHR => {
    console.error('Ocurrió un error:');
    console.error(jqXHR);
  });

  return respuesta;
};