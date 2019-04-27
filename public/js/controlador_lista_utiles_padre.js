'use strict';

const tabla = document.querySelector('#tbl_lista_utiles tbody');
const titulo = document.querySelector('#titulo');
const input_filtrar = document.querySelector('#txt_filtrar');

//funcion que redirige a la pagina para ver los articulos que ya estan agregado a la lista de útiles
function ver_info_lista() {
    let id_lista = this.dataset.codigo;
    localStorage.setItem('lista', id_lista);
    window.location.href = 'ver_articulos_lista_utiles.html';
};

let mostrar_datos = () => {
    let filtro = input_filtrar.value;
    tabla.innerHTML = '';

    let response = [];

    response = obtener_lista_utiles();


    let lista_utiles = response.coleccion_utiles;
    let nombre = response.nombre_centro;
    if (response.success == true) {
        titulo.innerHTML = nombre;
        for (let i = 0; i < lista_utiles.length; i++) {
            if (lista_utiles[i]['nombre'].toLowerCase().includes(filtro.toLowerCase()) ||
                lista_utiles[i]['anno'].toLowerCase().includes(filtro.toLowerCase())) {


                let fila = tabla.insertRow();
                let boton_ver = document.createElement('a');

                //se crea el boton  para ver la los articulos ya agregados en la lista de utiles 
                boton_ver.classList.add('fas', 'fa-eye');
                boton_ver.dataset.codigo = lista_utiles[i]['_id'];
                //se llama a la función para ver los articuos de una lista de utiles 
                boton_ver.addEventListener('click', ver_info_lista);

                let centro = buscar_nombre_centro_por_id(lista_utiles[i]['codigo']);

                fila.insertCell().innerHTML = lista_utiles[i]["nombre"];
                fila.insertCell().innerHTML = lista_utiles[i]["anno"];
                fila.insertCell().appendChild(boton_ver);
            };

        }
    }
};

input_filtrar.addEventListener('keyup', mostrar_datos);
mostrar_datos();


