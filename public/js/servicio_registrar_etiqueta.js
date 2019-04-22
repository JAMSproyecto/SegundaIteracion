'use strict';

let registrar_etiqueta = (pnombre) => {
  let request = $.ajax({
    url: "http://localhost:4000/api/registrar_etiqueta",
    method: "POST",
    data: {
      nombre: pnombre
    },
    dataType: "json",
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
  });

  request.done(function (msg) {
    if (msg.success) {
      swal.fire({
        type: 'success',
        title: msg.msg
      });
    }
    else {
      swal.fire({
        type: 'error',
        title: msg.msg
      });

    }
  });

  request.fail(function (jqXHR, textStatus) {
    swal.fire({
      type: 'error',
      title: 'La actividad no pude ser registrada',
      text: 'Ocurrió un error inesperado, por favor intente de nuevo'
    });
  });
};

let listar_etiquetas = () => {
  let etiquetas_array = [];
  let request = $.ajax({
    url: "http://localhost:4000/api/listar_etiquetas_en_admin",
    method: "GET",
    dataType: "json",
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    async: false
  });

  request.done(function (res) {
    etiquetas_array = res.msg;

  });


  request.fail(function (jqXHR, textStatus) {


  });
  return etiquetas_array;

};

let actualizar_etiqueta = (pid, petiqueta) => {
  let request = $.ajax({
    url: "http://localhost:4000/api/actualizar_etiqueta",
    method: "POST",
    data: {
      _id: pid,
      nombre: petiqueta
    },
    dataType: "json",
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
  });

  request.done(function (msg) {

    if ("object" == typeof msg) {
      if (msg.success) {
        swal.fire({
          type: 'success',
          title: 'Se han modificado los datos de manera exitosa',
          text: msg.message,
        });
      } else {
        swal.fire({
          type: 'error',
          title: 'Error al actualizar los datos: ' + msg.message,
          timer: 10000,
          position: 'center'
        });
      }

    } else {
      console.error(msg);
      swal.fire({
        type: 'error',
        title: 'Error al actualizar',
        timer: 10000,
        position: 'center',
        text: 'Ocurrió un error inesperado'
      });
    }

  });

  request.fail(function (jqXHR, textStatus) {
    swal.fire({
      type: 'error',
      title: 'Error al actualizar',
      timer: 10000,
      position: 'center',
      text: 'Ocurrió un error inesperado, por favor intente de nuevo'
    });
  });
};


let eliminar_etiqueta = (pid) => {
  let request = $.ajax({
    url: "http://localhost:4000/api/eliminar_etiqueta",
    method: "POST",
    data: {
      _id: pid,
    },
    dataType: "json",
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
  });

  request.done(function (res) {
    swal.fire({
      type: 'success',
      title: 'Proceso realizado con éxito',
      text: res.msg
    });

  });

  request.fail(function (res) {
    swal.fire({
      type: 'error',
      title: 'Proceso no realizado', 
      text: res.msg
    });

  });
};


//Para el componente de agregar etiquetas a la lista del centro



let agregar_etiqueta_en_lista  = (pid, pidEtiqueta, pNombre) => {
  let request = $.ajax({
    url: "http://localhost:4000/api/agregar_a_lista_etiqueta",
    method: "POST",
    data: {
      idCentro: pid,
              _id : pidEtiqueta,
              nombre: pNombre
    },
    dataType: "json",
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
  });

  request.done(function (msg) {

    if ("object" == typeof msg) {
      if (msg.success) {
        swal.fire({
          type: 'success',
          title: 'Se han modificado los datos de manera exitosa',
          text: msg.message,
        });
      } else {
        swal.fire({
          type: 'error',
          title: 'Error al actualizar los datos: ' + msg.message,
          timer: 10000,
          position: 'center'
        });
      }

    } else {
      console.error(msg);
      swal.fire({
        type: 'error',
        title: 'Error al actualizar',
        timer: 10000,
        position: 'center',
        text: 'Ocurrió un error inesperado'
      });
    }

  });

  request.fail(function (jqXHR, textStatus) {
    swal.fire({
      type: 'error',
      title: 'Error al actualizar',
      timer: 10000,
      position: 'center',
      text: 'Ocurrió un error inesperado, por favor intente de nuevo'
    });
  });
};


let lista_etiquetas_centro = (pidCentro) => {
  let etiquetas_array = [];
  let request = $.ajax({
    url: "http://localhost:4000/api/lista_etiquetas_en_centro/" + pidCentro,
    method: "GET",
    dataType: "json",
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    async: false
  });

  request.done(function (res) {
    etiquetas_array = res.msg;

  });


  request.fail(function (jqXHR, textStatus) {


  });
  return etiquetas_array;

};