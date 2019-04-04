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
    respuesta = response.success;
    sessionStorage.setItem('conectado', response.success);
    sessionStorage.setItem('tipoUsuario', response.message.tipoUsuario);
    sessionStorage.setItem('nombreUsuario', response.message.nombreUsuario);
    sessionStorage.setItem('correo', pusuario);
    sessionStorage.setItem('id', response.message.id);
    console.log(response.message.id);
	
	if('undefined' !== typeof response.message.nombreInstitucion){
		sessionStorage.setItem('nombreInstitucion', response.message.nombreInstitucion);
	}else{
		sessionStorage.setItem('nombreInstitucion', '');
	}
	
  });

  peticion.fail(jqXHR => {
    console.error('Ocurri&oacute; un error inesperado, por favor intente de nuevo');
  });

  return respuesta;
};