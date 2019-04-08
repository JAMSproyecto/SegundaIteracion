'use strict';

const tabla = document.querySelector('#tbl_lista_utiles tbody');
const titulo = document.querySelector('#titulo');
const th_centro = document.querySelector('#th_centro');
th_centro.classList.add('ocultar');

function ver_info_lista() {
    let id_lista = this.dataset.codigo;
    localStorage.setItem('lista', id_lista);
    window.location.href = 'ver_articulos_lista_utiles.html';
};


function seleccionar_lista() {
    let id_lista = this.dataset.codigo;
    localStorage.setItem('lista', id_lista);
    window.location.href = 'agregar_articulos.html';
};


let mostrar_datos = () => {
    let response = obtener_lista_utiles_todos();
    let lista_utiles = response.coleccion_utiles;
    let nombre = response.nombreCentro;
    if (response.success == true) {
        titulo.innerHTML = nombre;
        for (let i = 0; i < lista_utiles.length; i++) {
            
            let fila = tabla.insertRow();
            let boton_agregar = document.createElement('button');
            let boton_ver = document.createElement('button');

            boton_agregar.type = 'button';
            boton_agregar.textContent = 'Agregar Artículos';
            boton_agregar.dataset.codigo = lista_utiles[i]['_id'];
            boton_agregar.classList.add('btn_tabla');
            

            boton_ver.type = 'button';
            boton_ver.textContent = 'Ver'
            boton_ver.dataset.codigo = lista_utiles[i]['_id'];
            boton_ver.classList.add('btn_tabla');

            boton_ver.addEventListener('click', ver_info_lista);
            boton_agregar.addEventListener('click', seleccionar_lista);
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
                
            }
            fila.insertCell().innerHTML = lista_utiles[i]["nombre"];
            fila.insertCell().innerHTML = lista_utiles[i]["anno"];
            fila.insertCell().appendChild(boton_ver);
            fila.insertCell().appendChild(boton_agregar);
        }
    }

};

mostrar_datos();