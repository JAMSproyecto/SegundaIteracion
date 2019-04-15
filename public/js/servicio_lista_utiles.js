'use strict';

let registrar_lista_utiles = (ptipo,pnombre,panno) => {

  let request = $.ajax({
    url: "http://localhost:4000/api/registrar_lista_utiles",
    method: "POST",
    data: {
      codigo : localStorage.getItem('id'),
      tipo: ptipo,
      nombre: pnombre,
      anno: panno
    },
    dataType: "json",
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    async: false
  });

  request.done(function (msg) {
    swal.fire({
      type: 'success',
      title: '!Lista de útiles registrada¡',
      text: 'el registro fue éxitoso'

    }).then((result) => {
      if (result.value) {
        let tipoUsuario = localStorage.getItem('tipoUsuario');
        if(tipoUsuario === 'SuperAdmin'){
          window.location.href = 'listar_lista_utiles.html';
        }else{
          window.location.href = 'listaUtilescentroEducativo.html';
        }
      }
    })
  });

  request.fail(function (jqXHR, textStatus) {
    swal.fire({
      type: 'error',
      title: 'La lista de utiles no fue registrada',
      text: 'Ocurrió un error inesperado, por favor intente de nuevo'
    });
  });
};


let obtener_lista_utiles = () => {
  let coleccion_utiles = [];
  let id_usuario = localStorage.getItem('id');
  let request = $.ajax({
    url: "http://localhost:4000/api/listar_lista_utiles/" + id_usuario,
    method: "GET",
    data: {
    },
    dataType: "json",
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    async: false
  });

  request.done(function (res) {
    coleccion_utiles = res;

  });

  request.fail(function (jqXHR, textStatus) {

  });
  return coleccion_utiles;

};
let obtener_lista_utiles_todos = () => {
  let coleccion_utiles = [];
  let request = $.ajax({
    url: "http://localhost:4000/api/listar_lista_utiles_todos",
    method: "GET",
    data: {
    },
    dataType: "json",
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    async: false
  });

  request.done(function (res) {
    coleccion_utiles = res;

  });

  request.fail(function (jqXHR, textStatus) {

  });
  return coleccion_utiles;

};

//agregar articulos a la lista de utiles 
let agregar_articulo = (pid_lista, pcodigo_articulo, pcantidad) => {

  let request = $.ajax({
    url: "http://localhost:4000/api/agregar_articulo",
    method: "POST",
    data: {
      id_lista: pid_lista,
      codigo_articulo: pcodigo_articulo,
      cantidad: pcantidad
    },
    dataType: "json", 
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
  });

  request.done(function (msg) {
    
  });

  request.fail(function (jqXHR, textStatus) {
    swal.fire({
      type: 'error',
      title: 'El artículo no registrado',
      text: 'Ocurrió un error inesperado, por favor intente de nuevo'
    });
  });
};


let buscar_por_id = (id) => {
  let lista = [];
  let request = $.ajax({
    url: "http://localhost:4000/api/buscar_lista_id/" + id,
    type: "GET",
    data: {
    },
    dataType: "json",
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    async: false
  });

  request.done(function (res) {
    lista = res.lista;
    
  });
  
  request.fail(function (jqXHR, textStatus) {

  });
  return lista;
};

//para buscar centro por id 
let buscar_centro_por_id = (id) => {
  let centro = [];

  let request = $.ajax({
    url: "http://localhost:4000/api/obtener_centro_por_id/" + id,
    type: "GET",
    data: {
    },
    dataType: "json",
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    async: false
  });

  request.done(function (res) {
    centro = res.centro;
    
  });
  
  request.fail(function (jqXHR, textStatus) {

  });
  return centro;
};

//función para eliminar artículos de la lista útiles
let  eliminar_articulo_de_lista_utiles = (id_art) => {
  let id_lista = localStorage.getItem('lista');
  let request = $.ajax({
    url: "http://localhost:4000/api/eliminar_articulo_lista_utiles" ,
    type: "POST",
    data: {
      id_lista : id_lista,
      id_articulo : id_art
    },
    dataType: "json",
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    async: false
  });

  request.done(function (res) {
    
  });

  request.fail(function (jqXHR, textStatus) {

  });

};

//función para modificar los aericulos de la lista de utiles 
let modificar_articulos_de_lista_utiles = (id_art,pcantidad) =>{
  let id_lista = localStorage.getItem('lista');
  let request = $.ajax({
    url: "http://localhost:4000/api/modificar_articulo_lista_utiles" ,
    type: "POST",
    data: {
      id_lista : id_lista,
      id_articulo : id_art,
      cantidad : pcantidad
    },
    dataType: "json",
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
   // async: false
  });

  request.done(function (res) {
    swal.fire({
      type: 'success',
      title: '¡ La cantidad de artículos fue actualizada de forma exitosa !'
      
    }).then((result) => {
      if (result.value) {
        window.location.href = 'ver_articulos_lista_utiles_admin.html';
    }
    });
  });

  request.fail(function (jqXHR, textStatus) {
    swal.fire({
      type: 'success',
      title: 'La cantidad de artículos no fue actualizada de forma exitosa'
      
    })
  });

};

//funcion para modificar el nombre de la lista de utiles  
let modificar_lista_utiles = (id_lista,pnombre,panno) =>{
  let request = $.ajax({
    url: "http://localhost:4000/api/modificar_lista_utiles" ,
    type: "POST",
    data: {
      id_lista : id_lista,
      nombre : pnombre,
      anno : panno
    },
    dataType: "json",
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
  });

  request.done(function (res) {
    swal.fire({
      type: 'success',
      title: 'La lista de útiles fue actualizada de forma exitosa'
      
    }).then((result) => {
      if (result.value) {
         window.location.href = 'listar_lista_utiles.html';
    }
    });
  });

  request.fail(function (jqXHR, textStatus) {
    swal.fire({
      type: 'error',
      title: 'La lista de útiles no fue actualizada',
      text: 'Ocurrió un error inesperado, por favor intente de nuevo'
    });
  });

};

//funcio para activar o desactivar lista de utiles 
let  activar_desactivar_lista = (id, estado) => {
  let request = $.ajax({
    url: "http://localhost:4000/api/activar_desactivar_lista_utiles" ,
    type: "POST",
    data: {
      id : id,
      estado : estado
    },
    dataType: "json",
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    async: false
  });

  request.done(function (res) {
    if (estado === 'Activo') {
      swal.fire({
        type: 'success',
        title: 'La lista de útiles fue desactivada'
      }).then((result) => {
        if (result.value) {
      }
  })
    }else{
      swal.fire({
        type: 'success',
        title: 'La lista de útiles fue activada'
      }).then((result) => {
        if (result.value) {
      }
  })
    }
  });

  request.fail(function (jqXHR, textStatus) {

  });

};

//función para eliminar lista de útiles
let  eliminar_lista = (id) => {
  let request = $.ajax({
    url: "http://localhost:4000/api/eliminar_lista_utiles/"+id ,
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
      title: 'La lista de útiles fue eliminada de forma exitosa'
    }).then((result) => {
      if (result.value) {
        window.location.href = 'lisar_lista_utiles.html';
    }
})
  });

  request.fail(function (jqXHR, textStatus) {

  });

};