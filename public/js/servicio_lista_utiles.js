'use strict';

let registrar_lista_utiles = (ptipo,pnombre,panno) => {

  let request = $.ajax({
    url: "http://localhost:4000/api/registrar_lista_utiles",
    method: "POST",
    data: {
      codigo : sessionStorage.getItem('id'),
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
      title: 'Lista de utiles enviada',
      text: 'el registro fue éxitoso'

    }).then((result) => {
      if (result.value) {
        let tipoUsuario = sessionStorage.getItem('tipoUsuario');
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
  let id_usuario = sessionStorage.getItem('id');
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
    async: false
  });

  request.done(function (res) {
    
  });

  request.fail(function (jqXHR, textStatus) {

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
      panno : panno
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

