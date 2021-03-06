'use strict';

//función para registrar los datos con su respectiva ruta
let registrar_articulo = (pnombre, pdescripcion, pEnviaResultado) => {

  //NOTA: pEnviaResultado es una función que viene como parámetro para enviar el resultado al controlador.
  // La función pEnviaResultado recibe sus propios parámetros (en el controlador): success, msg.

  let request = $.ajax({
    url: "http://localhost:4000/api/registrar_articulo",
    method: "POST",
    data: {
      nombre: pnombre,
      descripcion: pdescripcion
    },
    dataType: "json",
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
  });

  request.done(function (res) {

    //Enviamos los resultados que el api retornó, al controlador:
    //Ejecutamos la función pEnviaResultado y le enviamos los propios parámetros:
    pEnviaResultado(res.success, res.msg);

  });

  request.fail(function (jqXHR, textStatus) {
    pEnviaResultado(false, 'Ocurrió un error inesperado, por favor intente de nuevo');
  });
};

//función para obtener los datos con su respectiva ruta
let obtener_articulos = () => {
  let articulos = [];

  let request = $.ajax({
    url: "http://localhost:4000/api/obtener_articulos",
    method: "GET",
    data: {
    },
    dataType: "json",
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    async: false
  });

  request.done(function (res) {
    articulos = res.articulos;

  });

  request.fail(function (jqXHR, textStatus) {

  });
  return articulos;
};

//función para buscar los articulos por medio del id de mongo
let buscar_articulo_por_id = (id) => {
  let articulo = [];

  let request = $.ajax({
    url: "http://localhost:4000/api/buscar_articulo_por_id/" + id,
    type: "GET",
    data: {
    },
    dataType: "json",
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    async: false
  });

  request.done(function (res) {
    articulo = res.articulo;

  });

  request.fail(function (jqXHR, textStatus) {

  });
  return articulo;
};

//funcion para actualizar articulo
let actualizar_articulo = (pid, pnombre, pdescripcion) => {

  let request = $.ajax({
    url: "http://localhost:4000/api/actualizar_articulo",
    method: "POST",
    data: {
      id: pid,
      nombre: pnombre,
      descripcion: pdescripcion
    },
    dataType: "json",
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
  });

  request.done(function (msg) {
    swal.fire({
      type: 'success',
      title: '¡El artículo fue actualizado de forma exitosa!'

    }).then((result) => {
      if (result.value) {
        window.location.href = 'listar_articulos.html';
      }
    })
  });
  request.fail(function (jqXHR, textStatus) {
    swal.fire({
      type: 'error',
      title: '¡El artículo no fue actualizado!',
      text: 'Ocurrió un error inesperado, por favor intente de nuevo'
    });
  });
};

//funcio para activar o desactivar articulos 
let activar_desactivar = (id, estado) => {
  let request = $.ajax({
    url: "http://localhost:4000/api/activar_desactivar_articulo",
    type: "POST",
    data: {
      id: id,
      estado: estado
    },
    dataType: "json",
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    async: false
  });

  request.done(function (res) {
    if (res.success) {

      // Muestra el mensaje de éxito que retorna el api:
      swal.fire({
        type: 'success',
        title: res.msg,
        onAfterClose: function () {

        }
      });

    } else {

      // Muestra el mensaje de error que retorna el api:
      swal.fire({
        type: 'error',
        title: res.msg
      });

    }
  });

  request.fail(function (jqXHR, textStatus) {
    console.error(jqXHR);
    console.error(textStatus);
  });

};

//función para eliminar artículos 
let eliminar_articulo = (id) => {
  let request = $.ajax({
    url: "http://localhost:4000/api/eliminar_articulo/" + id,
    type: "GET",
    data: {
    },
    dataType: "json",
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    async: false
  });

  request.done(function (res) {
    swal.fire({
      type: 'success',
      title: '¡El artículo fue eliminado de forma exitosa!'
    }).then((result) => {
      if (result.value) {
        window.location.href = 'listar_articulos.html';
      }
    });
  });

  request.fail(function (jqXHR, textStatus) {

  });

};

