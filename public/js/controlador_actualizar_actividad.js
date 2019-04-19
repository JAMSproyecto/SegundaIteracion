'use strict';

import { actualizar_actividad } from "../../api/componentes/actividad/registrar_actividad.api";

const input_actividad = document.querySelector('#txt_actividad');
const input_fecha = document.querySelector('#txt_fecha');
const input_hora_inicio = document.querySelector('#txt_hora_inicio');
const input_finaliza = document.querySelector('#txt_finaliza');
const input_lugar = document.querySelector('#txt_lugar');
const input_detalles = document.querySelector('#txt_detalles');
const boton_actualizar = document.querySelector('#btn_actualizar');

let get_param = (param) => {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var id = url.searchParams.get(param);

    return id;
}


let id = get_param('idActividad');



let actividad = buscar_actividad(id);
if (actividad) {
    input_actividad.value = actividad[0]['actividad'];
    input_fecha.value = actividad[0]['fecha']; //esta es la que nos deja el espacio en blanco
    input_hora_inicio.value = actividad[0]['hora_inicio'];
    input_finaliza.value = actividad[0]['finaliza'];
    input_lugar.value = actividad[0]['lugar'];

    input_detalles.value = actividad[0]['detalles']

} else {
    console.log('actividad', actividad);
}
let obtener_datos = () => {
   let actividad =  input_actividad.value;
   let fecha =  input_fecha.value;
   let hora_inicio = input_hora_inicio.value;
   let finaliza = input_finaliza.value;
   let detalles = input_lugar.value;

    input_detalles.value;

    actualizar_actividad(actividad,fecha,hora_inicio,finaliza, detalles, id);
};


boton_actualizar.addEventListener('click', obtener_datos);