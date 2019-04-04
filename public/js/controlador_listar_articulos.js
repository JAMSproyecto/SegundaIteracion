'use strict';

const tabla = document.querySelector('#tbl_articulos tbody');
const input_filtrar = document.querySelector('#txt_filtrar');

let articulos = obtener_articulos();


let mostrar_datos = () =>{    
    let filtro = input_filtrar.value;
    tabla.innerHTML = '';
    for (let i = 0; i < articulos.length; i++) {
      if (
      articulos[i]['nombre'].toLowerCase().includes(filtro.toLowerCase()) ||
       articulos[i]['descripcion'].toLowerCase().includes(filtro.toLowerCase())){

        let fila = tabla.insertRow();
        fila.insertCell().innerHTML = articulos[i]['nombre'];
        fila.insertCell().innerHTML = articulos[i]['descripcion'];
      }  
    }
};
input_filtrar.addEventListener('keyup', mostrar_datos);
mostrar_datos();
