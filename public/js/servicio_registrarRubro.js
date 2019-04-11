'use strict';


let registrar_rubro = (prubro) => {
  let request = $.ajax({
    url: "http://localhost:4000/api/registrar_Rubro",
    method: "POST",
    data: {
      rubro: prubro,
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
            window.location.replace('./agregar_rubros_a_evaluar.html');
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




let listar_rubros = () => {
  let lista_rubros = [];

  let request = $.ajax({
    url: "http://localhost:4000/api/listar_Rubros",
    method: "GET",
    data: {
    },
    dataType: "json",
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    async: false
  });

  request.done(function (res) {
    lista_rubros = res.data;

  }); 

  request.fail(function (jqXHR, textStatus) {

  });
  return lista_rubros;

};

let actualizar_rubro = (prubro, pid) => {
  let request = $.ajax({
    url: "http://localhost:4000/api/actualizar_Rubro",
    method: "POST",
    data: {
      rubro: prubro,
      id: pid
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
          onAfterClose: function () {
          
            window.location.replace('#');
          }
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

let agregar_rubro = (pid, prubro_seleccionado) => {

  let request = $.ajax({
    url: "http://localhost:4000/api/agregar_Rubros",
    method: "POST",
    data: {
      id_Admin: pid,
      rubro_seleccionado: prubro_seleccionado
    },
    dataType: "json", 
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
  });

  request.done(function (msg) {

    if (msg.success){
      swal.fire({
        type: 'success',
        title: 'Rubros registrados',
        text: msg.msg
      });
    } else {
      swal.fire({
        type: 'error',
        title: 'Artículo no enviada',
        text: msg.msg
      });
    }
   
  });

  request.fail(function (jqXHR, textStatus) {
    swal.fire({
      type: 'error',
      title: 'Artículo no enviada',
      text: 'Ocurrió un error inesperado, por favor intente de nuevo'
    });
  });
};

let activar_rubro = (pid) => {
  let request = $.ajax({
    url: "http://localhost:4000/api/activar_Rubros",
    method: "POST",
    data: {
      id : pid,
    },
    dataType: "json",
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
  });

  request.done(function(res){
    swal.fire({
        type : 'success',
        title : 'Proceso realizado con éxito',
        text : res.msg
    });

});

request.fail(function(res){
    swal.fire({
        type : 'error',
        title : 'Proceso no realizado',
        text : res.msg
    });

});
};


let desactivar_rubro = (pid) => {
  let request = $.ajax({
    url: "http://localhost:4000/api/desactivar_Rubros",
    method: "POST",
    data: {
      id : pid,
    },
    dataType: "json",
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
  });

  request.done(function(res){
    swal.fire({
        type : 'success',
        title : 'Proceso realizado con éxito',
        text : res.msg
    });

});

request.fail(function(res){
    swal.fire({
        type : 'error',
        title : 'Proceso no realizado',
        text : res.msg
    });

});
};






