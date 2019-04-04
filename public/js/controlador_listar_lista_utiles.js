'use strict';

const tabla = document.querySelector('#tbl_lista_utiles tbody');


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
    let response = obtener_lista_utiles();
    let lista_utiles = response.coleccion_utiles;
    let nombre = response.nombreCentro;
    if (response.success == true) {
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

            fila.insertCell().innerHTML = lista_utiles[i]["tipo"];
            fila.insertCell().innerHTML = lista_utiles[i]["nombre"];
            fila.insertCell().innerHTML = lista_utiles[i]["anno"];
            fila.insertCell().innerHTML = nombre;
            fila.insertCell().appendChild(boton_ver);
            fila.insertCell().appendChild(boton_agregar);



        }
    }

};

mostrar_datos();