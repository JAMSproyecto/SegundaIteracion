'use strict';

const tabla = document.querySelector('#tbl_lista_utiles tbody');
const titulo = document.querySelector('#titulo');
const input_filtrar = document.querySelector('#txt_filtrar');
const th_centro = document.querySelector('#th_centro');
if (sessionStorage.getItem('tipoUsuario') === 'SuperAdmin') {
    th_centro.classList.add('ocultar');
}


function ver_info_lista() {
    let tipoUsuario = sessionStorage.getItem('tipoUsuario');
    let id_lista = this.dataset.codigo;
    localStorage.setItem('lista', id_lista);
    if (tipoUsuario === 'SuperAdmin') {
    window.location.href = 'ver_articulos_lista_utiles_admin.html';
    } else {
    window.location.href = 'ver_articulos_lista_utiles.html';
    }
};

function seleccionar_lista() {
    let tipoUsuario = sessionStorage.getItem('tipoUsuario');
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
    let tipoUsuario = sessionStorage.getItem('tipoUsuario');
    let response = [];

    if (null !== tipoUsuario) {
        if (tipoUsuario === 'SuperAdmin') {
            response = obtener_lista_utiles_todos();
        }else{
            response = obtener_lista_utiles();
        }
    }
   
    let lista_utiles = response.coleccion_utiles;
    let nombre = response.nombreCentro;
    if (response.success == true) {
        titulo.innerHTML = nombre;
        for (let i = 0; i < lista_utiles.length; i++) {
            if ( lista_utiles[i]['nombre'].toLowerCase().includes(filtro.toLowerCase()) ||
            lista_utiles[i]['anno'].toLowerCase().includes(filtro.toLowerCase())) {
                
          
            let fila = tabla.insertRow();
            let boton_agregar = document.createElement('a');
            let boton_ver = document.createElement('a');
            let btn_modificar = document.createElement('a');

            //se crea el boton dinamico para agregar articulos a la lista de útiles
            boton_agregar.classList.add('fas','fa-plus');
            boton_agregar.dataset.codigo = lista_utiles[i]['_id'];
           
            
            //se crea el boton dinamino para ver la los articulos ya agregados en la lista de utiles 
            boton_ver.classList.add('fas' ,'fa-search');
            boton_ver.dataset.codigo = lista_utiles[i]['_id'];
            

            //se crea el boton para modificar la lista de utiles 
            btn_modificar.classList.add('fas', 'fa-pencil-alt');
            btn_modificar.dataset.id_lista = lista_utiles[i]['_id'];
           
            //se llama a la función para ver los articuos de una lista de utiles 
            boton_ver.addEventListener('click', ver_info_lista);
            //se llama a la función para agregar articulos a una lista de utiles 
            boton_agregar.addEventListener('click', seleccionar_lista);

            //se llama a la funcion para modificar la lista de utiles 
            btn_modificar.addEventListener('click', function(){
                
                Swal.fire({
                    title: 'Realice los cambios necesarios',
                    html : `<input id="swal-input1" class="swal2-input" value = "${lista_utiles[i]['nombre']}">`+
                    `<input id="swal-input2" class="swal2-input" value = "${lista_utiles[i]['anno']}">`,
                    
                    showCancelButton: true,
                    preConfirm: () => {
                        
                        modificar_lista_utiles(this.dataset.id_lista, document.getElementById('swal-input1').value, document.getElementById('swal-input2').value);
                       
                        mostrar_datos(); 
                    }
                    
                    
                  })
            });    

            let tipoUsuario = sessionStorage.getItem('tipoUsuario');
            if (tipoUsuario === 'SuperAdmin') {
                let centro = buscar_centro_por_id(lista_utiles[i]['codigo']);
                th_centro.classList.remove('ocultar');
                titulo.innerHTML = 'MEP';
                if(centro[0].nombre){
                    fila.insertCell().innerHTML = centro[0].nombre;
                }else{
                    fila.insertCell().innerHTML = 'MEP';
                    
                }  
            };

            fila.insertCell().innerHTML = lista_utiles[i]["nombre"];
            fila.insertCell().innerHTML = lista_utiles[i]["anno"];
            fila.insertCell().appendChild(boton_agregar);
            fila.insertCell().appendChild(boton_ver);
            fila.insertCell().appendChild(btn_modificar);
            
              
             //se agrego el boton para eliminar lista de útiles
            let btn_eliminar = document.createElement('a');
            btn_eliminar.dataset.id_lista =lista_utiles[i]['_id'];
            btn_eliminar.classList.add('fas' ,'fa-trash-alt');
            //se llama a la función para eliminar lista de útiles
            btn_eliminar.addEventListener('click',eliminar_lista_utiles);
            fila.insertCell().appendChild(btn_eliminar);

             //se agrega la fila para meter los botones 
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
                 btn_activar.classList.add('fas','fa-user-minus');
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
    eliminar_lista(this.dataset.id_lista);
    mostrar_datos();
  };