'use strict';

const tabla = document.querySelector('#tbl_rubros tbody');
const tabla_inactivos = document.querySelector('#tbl_rubros_inactivos tbody');
const input_filtrar = document.querySelector('#txt_filtrar');
const input_filtrar_inactivos = document.querySelector('#txt_filtrar_inactivos');

let rubros = listar_rubros();


let mostrar_datos = () => {

  let filtro = input_filtrar.value;
  let filtro_inactivos = input_filtrar_inactivos.value;

  tabla.innerHTML = '';
  tabla_inactivos.innerHTML = '';

  for (let i = 0; i < rubros.length; i++) {

    if (rubros[i]['estado'] == 'Activo') {
      if ((rubros[i]['rubro'].toLowerCase().includes(filtro.toLowerCase()))) {
        let fila = tabla.insertRow();
        fila.insertCell().innerHTML = rubros[i]['rubro'];

        let boton_desactivar = document.createElement('a');
        boton_desactivar.innerHTML = '<i class="fas fa-minus"></i>';
        boton_desactivar.dataset.id_rubro = rubros[i]['_id'];
        fila.insertCell().appendChild(boton_desactivar);
        boton_desactivar.addEventListener('click', function () {
          desactivar_rubro(this.dataset.id_rubro);
          rubros = listar_rubros();
          mostrar_datos();
          
        })
      }
    } else {
      if ((rubros[i]['rubro'].toLowerCase().includes(filtro_inactivos.toLowerCase()))) {
        let fila_inactivos = tabla_inactivos.insertRow();
        fila_inactivos.insertCell().innerHTML = rubros[i]['rubro'];

        let boton_activar = document.createElement('a');
        boton_activar.innerHTML = '<i class="fas fa-plus"></i>';
        boton_activar.dataset.id_rubro = rubros[i]['_id'];
        fila_inactivos.insertCell().appendChild(boton_activar);
        boton_activar.addEventListener('click', function () {
          activar_rubro(this.dataset.id_rubro);
          rubros = listar_rubros();
          mostrar_datos();
          
        })
      }
    }
  }
};

input_filtrar.addEventListener('keyup', mostrar_datos);
input_filtrar_inactivos.addEventListener('keyup', mostrar_datos);
mostrar_datos();



