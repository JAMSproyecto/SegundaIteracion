'use strict';

const input_nombre = document.querySelector('#txt_nombre');
const input_descripcion = document.querySelector('#txt_descripcion');
const btn_actualizar = document.querySelector('#btn_actualizar');

let get_id =(param) => {
    let url_string = window.location.href;
    let url = new URL(url_string);
    let id = url.searchParams.get(param);

    return id;
};

let id_articulo = get_id('id');

let articulo = buscar_articulo_por_id(id_articulo);

let mostrar_datos = () =>{    
  input_nombre.value = articulo[0]['nombre'];
  input_descripcion.value = articulo[0]['descripcion'];  
};

btn_actualizar.addEventListener('click' ,actualizar);
mostrar_datos();

function actualizar (){
    let nombre = input_nombre.value;
    let descripcion = input_descripcion.value;

    actualizar_articulo(id_articulo,nombre,descripcion);
    
};