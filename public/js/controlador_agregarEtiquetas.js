'use strict';

const tabla = document.querySelector('#tabla_etiquetas tbody');
const input_filtrar = document.querySelector('#txt_filtrar');

let idCentro = localStorage.getItem('id');
console.log('El id del centro es: '+ idCentro);

let etiquetasRegistradas = listar_etiquetas();

let etiquetasGuardadasEnCentro = 'idCentro' ;


let mostrar_datos = () => {
  let filtros = input_filtrar.value;
  tabla.innerHTML = '';
  for (let i = 0; i < etiquetasRegistradas.length; i++) {

    if (etiquetasRegistradas[i]['nombre'].toLowerCase().includes(filtros.toLowerCase())) {

      let fila = tabla.insertRow();

      fila.insertCell().innerHTML = etiquetasRegistradas[i]['nombre'];

      let boton_activar = document.createElement('a');
      boton_activar.innerHTML = '<i class="fas fa-user-plus"></i>';
      boton_activar.dataset.id_etiquetas = etiquetasRegistradas[i]['_id'];

      fila.insertCell().appendChild(boton_activar);
      boton_activar.addEventListener('click', function () {
        agregar_etiqueta_en_lista(this.dataset.id_etiquetas, etiquetasRegistradas[i]['_id'], etiquetasRegistradas[i]['nombre']);
        etiquetasRegistradas = listar_etiquetas();
        mostrar_datos();
      })
    }
  }
};

input_filtrar.addEventListener('keyup', mostrar_datos);
mostrar_datos();