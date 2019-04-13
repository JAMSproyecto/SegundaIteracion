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

        //se agrego el boton para Modificar 
        let btn_actualizar = document.createElement('a');
        btn_actualizar.dataset.id_articulo = articulos[i]['_id'];
        btn_actualizar.classList.add('fas', 'fa-pencil-alt');
        //se llama a la función para Modificar el articulo
        btn_actualizar.addEventListener('click', function(){
          Swal.fire({
            title: 'Modificar artículos',
            html : `<input id="swal-input1" class="swal2-input" value = "${articulos[i]['nombre']}">`+
            `<input id="swal-input2" class="swal2-input" value = "${articulos[i]['descripcion']}">`,
            
            showCancelButton: true,
            preConfirm: () => {
                actualizar_articulo(this.dataset.id_articulo, document.getElementById('swal-input1').value, document.getElementById('swal-input2').value);
                mostrar_datos(); 
            }
          })
        });
        let celda_actualizar = fila.insertCell();
        celda_actualizar.appendChild(btn_actualizar);

        //se agrego el boton para eliminar artículos
        let btn_eliminar = document.createElement('a');
        btn_eliminar.dataset.id_articulo = articulos[i]['_id'];
        btn_eliminar.classList.add('fas' ,'fa-trash-alt');
        //se llama a la función para eliminar articulos 
        btn_eliminar.addEventListener('click',eliminar_articulos);
        let celda_eliminar = fila.insertCell();
        celda_eliminar.appendChild(btn_eliminar);

        let celda_estado = fila.insertCell();
        //para mostrar el  boton de activo o desactivo en la misma celda 
        if (articulos[i]['estado'] === 'Activo') {
          //se agregro el boton para desactivar 
          let btn_desactivar = document.createElement('a');
          btn_desactivar.dataset.id_articulo = articulos[i]['_id'];
          btn_desactivar.dataset.estado = articulos[i]['estado'];
          btn_desactivar.classList.add('fas','fa-user-check');
          btn_desactivar.addEventListener('click',activar_desactivar_articulos);
          celda_estado.appendChild(btn_desactivar);
        }else{
          //se agrego el boton para activar 
          let btn_activar = document.createElement('a');
          btn_activar.dataset.id_articulo = articulos[i]['_id'];
          btn_activar.dataset.estado = articulos[i]['estado'];
          btn_activar.classList.add('fas','fa-user-minus');
          btn_activar.addEventListener('click',activar_desactivar_articulos);
          celda_estado.appendChild(btn_activar);
        }
        
        
      }  
    }
};
//funcionalidad de filtrar 
input_filtrar.addEventListener('keyup', mostrar_datos);
mostrar_datos();

//función de activar o desactivar 
function activar_desactivar_articulos(){
  activar_desactivar(this.dataset.id_articulo, this.dataset.estado);
  articulos = obtener_articulos();
  mostrar_datos();
};
//función de eliminar 
function eliminar_articulos(){
  Swal.fire({
    title: '¿Está seguro que desea eliminar el artículo?',
    text: "Ésta acción no se puede revertir",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '¡Sí, estoy seguro!'
  }).then((result) => {
    if (result.value) {
      eliminar_articulo(this.dataset.id_articulo);
      articulos = obtener_articulos();
      mostrar_datos();
      Swal.fire(
        '¡Artículo eliminado!',
        'La lista ya no posee éste artículo',
        'success'
      )
    }
  })
  
};