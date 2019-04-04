'use strict';

//variable para agregar los datos a la tabla dinamicamente
const tabla = document.querySelector('#tbl_articulos tbody');
//variables para agregarlos titulos dnamicamente 
const titulo = document.querySelector('#titulo');
const titulo2 = document.querySelector('#titulo2');
//variable para guardar información por tiempo indefinido, en este caso el id de lista Utiles
let id_lista = localStorage.getItem('lista');
// se envia el id de lista utiles, por parametro a la función en el api, para traer el id del articulo
let lista = buscar_por_id(id_lista);

//función para mostrar los articulos agregados dentro lista utiles
let mostrar_datos = () =>{
    for (let i = 0; i < lista[0]['articulos'].length; i++) {    
    let fila = tabla.insertRow();
    //se inserta el nombre de la base de datos dinamicamente 
    titulo2.innerHTML = lista[0]['nombre'];
    titulo.innerHTML = lista[0]['anno'];
    /*llamar al servicio de articulos funcion buscar articulo por id y pasarle
      el id del articulo que viene en lista[0]['articulos'][i]['_id']*/
    let articulo = buscar_articulo_por_id(lista[0]['articulos'][i]['codigo']);
    
    fila.insertCell().innerHTML = articulo[0]['nombre'];
    fila.insertCell().innerHTML = articulo[0]['descripcion'];
    fila.insertCell().innerHTML = lista[0]['articulos'][i]['cantidad'];
        
    }
}

mostrar_datos();