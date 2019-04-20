'use strict';

const tabla = document.querySelector('#tbl_servicios tbody');
const titulo = document.querySelector('#titulo');
const input_filtrar = document.querySelector('#txt_filtrar');

let response = obtener_servicios_por_id();
let res = obtener_nombre_centro_id();

let mostrar_datos = ()=>{
    let filtro = input_filtrar.value;
    tabla.innerHTML = '';
    let lista_servicios = response;
    let nombre_centro = res;
    console.log('servicios: ',lista_servicios);
 
        titulo.innerHTML = nombre_centro;
        for (let i = 0; i < lista_servicios.length; i++) {
        if (lista_servicios[i]['nombre'].toLowerCase().includes(filtro.toLowerCase()) || lista_servicios[i]['descripcion'].toLowerCase().includes(filtro.toLowerCase())) {

            let fila = tabla.insertRow();
            fila.insertCell().innerHTML = lista_servicios[i]['nombre'];
            fila.insertCell().innerHTML = lista_servicios[i]['descripcion'];
           }
        }
    
};
input_filtrar.addEventListener('keyup', mostrar_datos);
mostrar_datos();