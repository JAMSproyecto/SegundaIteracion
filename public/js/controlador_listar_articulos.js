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

        //se agrego el boton para actualizar 
        let btn_actualizar = document.createElement('button');
        btn_actualizar.dataset.id_articulo = articulos[i]['_id'];
        btn_actualizar.textContent = 'Actualizar';

        btn_actualizar.addEventListener('click', actualizar_articulos);
        let celda_actualizar = fila.insertCell();
        celda_actualizar.appendChild(btn_actualizar);


      }  
    }
};
input_filtrar.addEventListener('keyup', mostrar_datos);
mostrar_datos();

function actualizar_articulos() {
window.location.href = `actualizar_articulos.html?id=${this.dataset.id_articulo}`;    
};