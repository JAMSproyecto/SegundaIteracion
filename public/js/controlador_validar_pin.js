'use strict';

const Input_Pin_Validacion = document.querySelector('#input_pin');
const Input_Contrasenna = document.querySelector('#txt_contrasena');
const Input_Contrasenna2 = document.querySelector('#txt_contrasena2');
const Boton_Registrar = document.querySelector('#boton_registrar');

function validar_Pin(pInput_Pin_Validacion) {
    let error = false;

    if (pInput_Pin_Validacion == '') {
        error = true;
        input_pin.classList.add('error_input');
    } else {
        input_pin.classList.remove('error_input');
    }

    return error;
};

let obtener_Contrasena = () => {

    if (validar_Pin() == false) {
        let contrasena = Input_Contrasenna.value;
        registrar_contrasena(contrasena);
    } else {
        mostrarAlerta('El pin de validación debe de ser ingresado');
    }
};


Boton_Registrar.addEventListener('click', obtener_Contrasena);