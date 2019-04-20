'use strict';

const input_actividad = document.querySelector('#txt_actividad');
const input_fecha = document.querySelector('#txt_fecha');
const input_hora_inicio = document.querySelector('#txt_hora_inicio');
const input_finaliza = document.querySelector('#txt_finaliza');
const input_lugar = document.querySelector('#txt_lugar');

const input_detalles = document.querySelector('#txt_detalles');
const boton_enviar = document.querySelector('#btn_agregar');



let validar = () => {

    let error = false;
    if (input_actividad.value == '') {
        error = true;
        input_actividad.classList.add('error_input');
    } else {
        input_actividad.classList.remove('error_input');

    }
    

    if (input_fecha.value == '') {
        error = true;
        input_fecha.classList.add('error_input');
    } else {
        input_fecha.classList.remove('error_input');

    }


    if (input_hora_inicio.value == '') {
        error = true;
        input_hora_inicio.classList.add('error_input');
    } else {
        input_hora_inicio.classList.remove('error_input');

    }


    if (input_finaliza.value == '') {
        input_finaliza.classList.add('error_input');
        error = true;
    } else {
        input_finaliza.classList.remove('error_input');

    }


    if (input_lugar.value == '') {
        input_lugar.classList.add('error_input');
        error = true;
    } else {
        input_lugar.classList.remove('error_input');
    }

  


    if (input_detalles.value == '') {
        error = true;
        input_detalles.classList.add('error_input');
    } else {
        input_detalles.classList.remove('error_input');
    }
    return error;
};


let mostrar_datos = () => {

    if (validar() == true) {
        Swal.fire({
            type: 'warning',
            title: 'Los datos no fueron registrados de manera correcta',
            text: 'Favor completar los espacios señalados en rojo'
        }
        )
    }
    else {

        let idCentro = localStorage.getItem("id");
        let actividad = input_actividad.value;
        let fecha = input_fecha.value;
        let hora_inicio = input_hora_inicio.value;
        let finaliza = input_finaliza.value;
        let lugar = input_lugar.value;
        let detalles = input_detalles.value

        registrar_actividad(idCentro, actividad, fecha, hora_inicio, finaliza,
             lugar, detalles);
    }

};


boton_enviar.addEventListener('click', mostrar_datos);



