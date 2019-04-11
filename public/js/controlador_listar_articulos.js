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

        let celda_estado = fila.insertCell();
        //para mostrar el  boton de activo o desactivo en la misma celda 
        if (articulos[i]['estado'] === 'Activo') {
          //se agregro el boton para desactivar 
          let btn_desactivar = document.createElement('button');
          btn_desactivar.dataset.id_articulo = articulos[i]['_id'];
          btn_desactivar.dataset.estado = articulos[i]['estado'];
          btn_desactivar.textContent = 'Activo';
          btn_desactivar.addEventListener('click',activar_desactivar_articulos);
          celda_estado.appendChild(btn_desactivar);
        }else{
          //se agrego el boton para activar 
          let btn_activar = document.createElement('button');
          btn_activar.dataset.id_articulo = articulos[i]['_id'];
          btn_activar.dataset.estado = articulos[i]['estado'];
          btn_activar.textContent = 'Desactivo';
          btn_activar.addEventListener('click',activar_desactivar_articulos);
          celda_estado.appendChild(btn_activar);
        }
        
        //se agrego el boton para actualizar 
        let btn_actualizar = document.createElement('button');
        btn_actualizar.dataset.id_articulo = articulos[i]['_id'];
        btn_actualizar.textContent = 'Actualizar';
        //se llama a la función para actualizar el articulo
        btn_actualizar.addEventListener('click', actualizar_articulos);
        let celda_actualizar = fila.insertCell();
        celda_actualizar.appendChild(btn_actualizar);

        //se agrego el boton para eliminar artículos
        let btn_eliminar = document.createElement('button');
        btn_eliminar.dataset.id_articulo = articulos[i]['_id'];
        btn_eliminar.textContent = 'Eliminar';
        //se llama a la función para eliminar articulos 
        btn_eliminar.addEventListener('click',eliminar_articulos);
        let celda_eliminar = fila.insertCell();
        celda_eliminar.appendChild(btn_eliminar);
      }  
    }
};
//funcionalidad de filtrar 
input_filtrar.addEventListener('keyup', mostrar_datos);
mostrar_datos();
//función de actualizar 
function actualizar_articulos() {
window.location.href = `actualizar_articulos.html?id=${this.dataset.id_articulo}`;    
};
//función de activar o desactivar 
function activar_desactivar_articulos(){
  activar_desactivar(this.dataset.id_articulo, this.dataset.estado);
  articulos = obtener_articulos();
  mostrar_datos();
};
//función de eliminar 
function eliminar_articulos(){
  eliminar_articulo(this.dataset.id_articulo);
  articulos = obtener_articulos();
  mostrar_datos();
};