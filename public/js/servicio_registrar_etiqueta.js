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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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

<<<<<<< HEAD

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



let agregar_etiqueta_en_lista = (pid, pidEtiqueta, pNombre) => {
  let request = $.ajax({
    url: "http://localhost:4000/api/agregar_a_lista_etiqueta",
    method: "POST",
    data: {
      idCentro: pid,
      idEtiqueta: pidEtiqueta,
      nombre: pNombre
    },
    dataType: "json",
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
  });
=======
    });
>>>>>>> parent of 16d022a... Merge branch 'master' of https://github.com/JAMSproyecto/SegundaIteracion

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

=======
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

>>>>>>> parent of 4477e80... Merge branch 'master' of https://github.com/JAMSproyecto/SegundaIteracion
=======
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

>>>>>>> parent of 4477e80... Merge branch 'master' of https://github.com/JAMSproyecto/SegundaIteracion
    request.fail(function (jqXHR, textStatus) {
        swal.fire({
            type: 'error',
            title: 'La actividad no pude ser registrada',
            text: 'Ocurrió un error inesperado, por favor intente de nuevo'
        });
    });
};

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD

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
=======
>>>>>>> parent of 16d022a... Merge branch 'master' of https://github.com/JAMSproyecto/SegundaIteracion
=======
>>>>>>> parent of 16d022a... Merge branch 'master' of https://github.com/JAMSproyecto/SegundaIteracion
=======
>>>>>>> parent of 4477e80... Merge branch 'master' of https://github.com/JAMSproyecto/SegundaIteracion
=======
>>>>>>> parent of 4477e80... Merge branch 'master' of https://github.com/JAMSproyecto/SegundaIteracion
