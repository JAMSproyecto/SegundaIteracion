'use strict';

//función para registrar los datos con su respectiva ruta
let registrar_articulo = (pnombre, pdescripcion) => {

    let request = $.ajax({
        url: "http://localhost:4000/api/registrar_articulo",
        method: "POST",
        data:{
            nombre : pnombre,
            descripcion : pdescripcion
        },
         dataType: "json",
         contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
    });

    request.done(function (msg)
        {
            swal.fire({
                type: 'success',
                title: 'El artículo fue registrado de forma exitosa'
              });
        });
    
    request.fail(function (jqXHR, textStatus) {
        swal.fire({
          type: 'error',
          title: 'El artículo no fue registrado',
          text: 'Ocurrió un error inesperado, por favor intente de nuevo'
        });
      });
};

//función para obtener los datos con su respectiva ruta
let obtener_articulos = () =>{
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
let buscar_articulo_por_id = (id) =>{
  let articulo = [];

  let request = $.ajax({
    url: "http://localhost:4000/api/buscar_articulo_por_id/" +id ,
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
let registrar_articulo = (pid,pnombre, pdescripcion) => {

  let request = $.ajax({
      url: "http://localhost:4000/api/actualizar_articulo",
      method: "POST",
      data:{
          id : pid,
          nombre : pnombre,
          descripcion : pdescripcion
      },
       dataType: "json",
       contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
  });

  request.done(function (msg)
      {
          swal.fire({
              type: 'success',
              title: 'El artículo fue actualizado de forma exitosa'
            });
      });
  
  request.fail(function (jqXHR, textStatus) {
      swal.fire({
        type: 'error',
        title: 'El artículo no fue actualizado',
        text: 'Ocurrió un error inesperado, por favor intente de nuevo'
      });
    });
};