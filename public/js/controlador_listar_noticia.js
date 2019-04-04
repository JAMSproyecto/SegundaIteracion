'use strict';


const tabla = document.querySelector('#tbl_listar_noticia tbody');
const input_filtrar = document.querySelector('#txt_filtrar');

let idCentro = sessionStorage.getItem('id');
const noticias = listar_todas_noticias(idCentro);

let mostrar_datos = () =>{
    
    let filtros = input_filtrar.value;
    tabla.innerHTML = '';
   
    for (let i = 0; i < noticias.length; i++){

        if (noticias[i]['tema'].toLowerCase().includes(filtros.toLowerCase())) {

            let fila = tabla.insertRow();

        fila.insertCell().innerHTML = noticias[i]['tema'];
        fila.insertCell().innerHTML = noticias[i]['noticia'];
        fila.insertCell().innerHTML = noticias[i]['autor'];
        fila.insertCell().innerHTML = noticias[i]['fecha'];
        fila.insertCell().innerHTML = noticias[i]['informacion'];

    }
    

}
};

input_filtrar.addEventListener('keyup', mostrar_datos);

mostrar_datos();