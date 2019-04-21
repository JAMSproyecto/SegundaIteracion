'use strict';

const tabla = document.querySelector('#tbl_servicios tbody');
const titulo = document.querySelector('#titulo');
const input_filtrar = document.querySelector('#txt_filtrar');
let id_centro = localStorage.getItem('id');



let mostrar_datos = ()=>{
    let response = obtener_servicios_por_id(id_centro);
    let res = obtener_nombre_centro_id(id_centro);
    let filtro = input_filtrar.value;
    tabla.innerHTML = '';
    let lista_servicios = response;
    let nombre_centro = res;

         titulo.innerHTML = nombre_centro;
        for (let i = 0; i < lista_servicios.length; i++) {
        if (lista_servicios[i]['nombre'].toLowerCase().includes(filtro.toLowerCase()) || lista_servicios[i]['descripcion'].toLowerCase().includes(filtro.toLowerCase())) {

            let fila = tabla.insertRow();
            let btn_modificar = document.createElement('a');    
            let btn_eliminar = document.createElement('a');

            //se crea el boton para modificar los servicios 
            btn_modificar.classList.add('fas', 'fa-pencil-alt');
            btn_modificar.dataset.id_servicio = lista_servicios[i]['_id'];
          
            //se crea la función para modificar 
            btn_modificar.addEventListener('click',
            function(){
                Swal.fire({
                        title: 'Modificar servicio',
                        html : `<input id="swal-input1" class="swal2-input" value = "${lista_servicios[i]['nombre']}">`+
                        `<input id="swal-input2" class="swal2-input" value = "${lista_servicios[i]['descripcion']}">`,
                        
                        showCancelButton: true,
                        preConfirm: () => {
                                modificar_servicio(this.dataset.id_servicio, document.getElementById('swal-input1').value, document.getElementById('swal-input2').value);
                            mostrar_datos(); 
                        }
                      })
            });

            //ser creas el boton para eliminar servicios 
            btn_eliminar.classList.add('fas','fa-trash-alt');
            btn_eliminar.dataset.id_servicio = lista_servicios[i]['_id'];
            //función para eliminar servicios 
            btn_eliminar.addEventListener('click',function(){
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
                            eliminar_servicio(this.dataset.id_servicio);
                            mostrar_datos();
                          Swal.fire(
                            '¡Servicio eliminado!',
                            'La lista ya no posee éste artículo',
                            'success'
                          )
                        }
                      })
            });


            fila.insertCell().innerHTML = lista_servicios[i]['nombre'];
            fila.insertCell().innerHTML = lista_servicios[i]['descripcion'];
            fila.insertCell().appendChild(btn_modificar);
            fila.insertCell().appendChild(btn_eliminar);
           }
        }
    
};
input_filtrar.addEventListener('keyup', mostrar_datos);
mostrar_datos();