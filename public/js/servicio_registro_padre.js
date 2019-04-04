'use strict';


let registrar_padre = (pnombre, psegundoNombre, papellido, psegundoApellido, ptipoIdentificacion, pnumIdentificacion, pnacionalidad, pfechaNacimiento, pnumCel, pnumCasa, pEmail, pprovincia, pcanton, pdistrito, pdireccion, pcantidadHijos, pnombreHijo, pedadHijo, pnombreHijo2, pedadHijo2, pnombreHijo3, pedadHijo3, pnombreHijo4, pedadHijo4) => {
  let request = $.ajax({
    url: "http://localhost:4000/api/registrar_Padre",
    method: "POST",
    data: {
      nombre: pnombre,
      segundoNombre: psegundoNombre,
      apellido: papellido,
      segundoApellido: psegundoApellido,
      tipoIdentificacion: ptipoIdentificacion,
      numIdentificacion: pnumIdentificacion,
      nacionalidad: pnacionalidad,
      fechaNacimiento: pfechaNacimiento,
      numCel: pnumCel,
      numCasa: pnumCasa,
      email: pEmail,
      provincia: pprovincia,
      canton: pcanton,
      distrito: pdistrito,
      direccion: pdireccion,
      cantidadHijos: pcantidadHijos,
      nombreHijo: pnombreHijo,
      edadHijo: pedadHijo,
      nombreHijo2: pnombreHijo2,
      edadHijo2: pedadHijo2,
      nombreHijo3: pnombreHijo3,
      edadHijo3: pedadHijo3,
      nombreHijo4: pnombreHijo4,
      edadHijo4: pedadHijo4
    },
    dataType: "json",
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
  });

  request.done(function (msg) {

    if ("object" == typeof msg) {
      if (msg.success) {
        swal.fire({
          type: 'success',
          title: 'Registro Exitoso',
          text: msg.message,
          onAfterClose: function () {
            window.location.replace('./credenciales.html');
          }
        });
      } else {
        swal.fire({
          type: 'error',
          title: 'Error al registrar: ' + msg.message,
          timer: 10000,
          position: 'center'
        });
      }

    } else {
      console.error(msg);
      swal.fire({
        type: 'error',
        title: 'Error al registrar',
        timer: 10000,
        position: 'center',
        text: 'Ocurrió otro error'
      });
    }

  });

  request.fail(function (jqXHR, textStatus) {
    swal.fire({
      type: 'error',
      title: 'Error al registrar',
      timer: 10000,
      position: 'center',
      text: 'Ocurrió un error inesperado, por favor intente de nuevo'
    });
  });
};




let listar_padres = () => {
  let lista_padres = [];

  let request = $.ajax({
    url: "http://localhost:4000/api/listar_Padres",
    method: "GET",
    data: {
    },
    dataType: "json",
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    async: false
  });

  request.done(function (res) {
    lista_padres = res.data;

  });

  request.fail(function (jqXHR, textStatus) {

  });
  return lista_padres;

};