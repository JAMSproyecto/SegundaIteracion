'use strict';

const tabla = document.querySelector('#tbl_lista_utiles tbody');
const titulo = document.querySelector('#titulo');
const input_filtrar = document.querySelector('#txt_filtrar');
const th_centro = document.querySelector('#th_centro');
//
if (localStorage.getItem('tipoUsuario') === 'SuperAdmin') {
    th_centro.classList.add('ocultar');
}

//funcion que redirige a la pagina para ver los articulos que ya estan agregado a la lista de útiles
function ver_info_lista() {
    let tipoUsuario = localStorage.getItem('tipoUsuario');
    let id_lista = this.dataset.codigo;
    localStorage.setItem('lista', id_lista);
    if (tipoUsuario === 'SuperAdmin') {
    window.location.href = 'ver_articulos_lista_utiles_admin.html';
    } else {
    window.location.href = 'ver_articulos_lista_utiles.html';
    }
};

// funcion pque redirige a la pagina para agregar artículos a la lista de útiles
function seleccionar_lista() {
    let tipoUsuario = localStorage.getItem('tipoUsuario');
    let id_lista = this.dataset.codigo;
    localStorage.setItem('lista', id_lista);
    if (tipoUsuario === 'SuperAdmin') {
        window.location.href = 'agregar_articulos.html';
    } else {
        window.location.href = 'agregar_articulos_cedu.html';
    }
};
 

let mostrar_datos = () => {
    let filtro = input_filtrar.value;
    tabla.innerHTML = '';
    let tipoUsuario = localStorage.getItem('tipoUsuario');
    let response = [];

    if (null !== tipoUsuario) {
        if (tipoUsuario === 'SuperAdmin') {
            response = obtener_lista_utiles_todos();
        }else{
            response = obtener_lista_utiles();
        }
    }
   
    let lista_utiles = response.coleccion_utiles;
    let nombre = response.nombre_centro;
    if (response.success == true) {
        titulo.innerHTML = nombre;
        for (let i = 0; i < lista_utiles.length; i++) {
            if ( lista_utiles[i]['nombre'].toLowerCase().includes(filtro.toLowerCase()) ||
            lista_utiles[i]['anno'].toLowerCase().includes(filtro.toLowerCase())) {
                
          
            let fila = tabla.insertRow();
            let boton_agregar = document.createElement('a');
            let boton_ver = document.createElement('a');
            let btn_modificar = document.createElement('a');

            //se crea el boton para agregar articulos a la lista de útiles
            boton_agregar.classList.add('fas','fa-plus');
            boton_agregar.dataset.codigo = lista_utiles[i]['_id'];
            //se llama a la función para agregar articulos a una lista de utiles 
            boton_agregar.addEventListener('click', seleccionar_lista);

            //se crea el boton  para ver la los articulos ya agregados en la lista de utiles 
            boton_ver.classList.add('fas' ,'fa-eye');
            boton_ver.dataset.codigo = lista_utiles[i]['_id'];
            //se llama a la función para ver los articuos de una lista de utiles 
            boton_ver.addEventListener('click', ver_info_lista);
            
             //se crea el boton para modificar la lista de utiles 
             btn_modificar.classList.add('fas', 'fa-pencil-alt');
             btn_modificar.dataset.id_lista = lista_utiles[i]['_id'];
            //se llama a la funcion para modificar la lista de utiles 
            btn_modificar.addEventListener('click', function(){
                Swal.fire({
                    title: 'Modificar lista de útiles',
                    html : `<input id="swal-input1" class="swal2-input" value = "${lista_utiles[i]['nombre']}">`+
                    `<input id="swal-input2" class="swal2-input" value = "${lista_utiles[i]['anno']}">`,
                    
                    showCancelButton: true,
                    preConfirm: () => {
                        modificar_lista_utiles(this.dataset.id_lista, document.getElementById('swal-input1').value, document.getElementById('swal-input2').value);
                        mostrar_datos(); 
                    }
                  })
            });    

            //para buscar el titulo del centro si es super admin se quema el titulo en el codigo 
            let tipoUsuario = localStorage.getItem('tipoUsuario');
            if (tipoUsuario === 'SuperAdmin') {
                let centro = buscar_nombre_centro_por_id(lista_utiles[i]['codigo']);
                th_centro.classList.remove('ocultar');
                titulo.innerHTML = 'MEP';
                if(centro.nombre){
                    fila.insertCell().innerHTML = centro.nombre;
                }else{
                    fila.insertCell().innerHTML = 'MEP';
                    
                }  
            };

             //se agrego el boton para eliminar lista de útiles
            let btn_eliminar = document.createElement('a');
            btn_eliminar.dataset.id_lista =lista_utiles[i]['_id'];
            btn_eliminar.classList.add('fas' ,'fa-trash-alt');
            //se llama a la función para eliminar lista de útiles
            btn_eliminar.addEventListener('click',eliminar_lista_utiles);

            fila.insertCell().innerHTML = lista_utiles[i]["nombre"];
            fila.insertCell().innerHTML = lista_utiles[i]["anno"];
            fila.insertCell().appendChild(boton_agregar);
            fila.insertCell().appendChild(boton_ver);
            fila.insertCell().appendChild(btn_modificar);
            fila.insertCell().appendChild(btn_eliminar);
           
             //función para activar o desactivar 
             let celda_estado = fila.insertCell();
             //para mostrar el  boton de activo o desactivo en la misma celda 
             if (lista_utiles[i]['estado'] === 'Activo') {
                 //se agregro el boton para desactivar 
                 let btn_desactivar = document.createElement('a');
                 btn_desactivar.classList.add('fas','fa-user-check');
                 btn_desactivar.dataset.id_lista = lista_utiles[i]['_id'];
                 btn_desactivar.dataset.estado = lista_utiles[i]['estado'];
                 btn_desactivar.addEventListener('click',activar_desactivar_lista_utiles);
                 celda_estado.appendChild(btn_desactivar);
               }else{
                 //se agrego el boton para activar 
                 let btn_activar = document.createElement('a');
                 btn_activar.classList.add('fas','desactivo','fa-user-minus');
                 btn_activar.dataset.id_lista = lista_utiles[i]['_id'];
                 btn_activar.dataset.estado = lista_utiles[i]['estado'];
                 btn_activar.addEventListener('click',activar_desactivar_lista_utiles);
                 celda_estado.appendChild(btn_activar);
               }
        }
    }
    }
};
input_filtrar.addEventListener('keyup', mostrar_datos);
mostrar_datos();

//función de activar o desactivar lista de utiles 
function activar_desactivar_lista_utiles(){
    activar_desactivar_lista(this.dataset.id_lista, this.dataset.estado);
    mostrar_datos();
  };

//función de eliminar lista de útiles 
function eliminar_lista_utiles(){
    Swal.fire({
        title: '¿Está seguro que desea eliminar la lista de útiles?',
        text: "Ésta acción no se puede revertir",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Sí, estoy seguro!'
      }).then((result) => {
        if (result.value) {
            eliminar_lista(this.dataset.id_lista);
            mostrar_datos();
          Swal.fire(
            '¡Artículo eliminado!',
            'La lista ya no posee éste artículo',
            'success'
          )
        }
      })
  };
