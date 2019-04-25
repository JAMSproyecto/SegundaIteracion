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

  request.done(function (res) {
    if (res.success) {
      swal.fire({
        type: 'success',
        title: res.msg,
     onAfterClose: function () {
          window.location.replace('./listaEtiquetas.html');
        }   
      });
    }
    else {
      swal.fire({
        type: 'error',
        title: res.msg
      });

    }
  });

  request.fail(function (jqXHR, textStatus) {
	console.error(textStatus);
	console.error(jqXHR);
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
	if(res.success){
        etiquetas_array = res.msg;
	} else {
		console.log(res.msg);
	}

  });


  request.fail(function (jqXHR, textStatus) {
	console.error(textStatus);
	console.error(jqXHR);
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

  request.done(function (res) {
    if (res.success) {
      swal.fire({
        type: 'success',
        title: res.msg,
        onAfterClose: function () {
          window.location.replace('./listaEtiquetas.html');
        }
      });
    }
    else {
      swal.fire({
        type: 'error',
        title: res.msg
      });

    }
  });

  request.fail(function (jqXHR, textStatus) {
	console.error(textStatus);
	console.error(jqXHR);
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
    if (res.success) {
      swal.fire({
        type: 'success',
        title: res.msg,
        onAfterClose: function () {
          window.location.replace('./listaEtiquetas.html');
        }
      });
    }
    else {
      swal.fire({
        type: 'error',
        title: res.msg
      });

    }
  });

  request.fail(function (jqXHR, textStatus) {
	console.error(textStatus);
	console.error(jqXHR);
  });
};