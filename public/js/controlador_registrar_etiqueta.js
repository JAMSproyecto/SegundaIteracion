'use strict';

const input_etiqueta = document.querySelector('#txt_nombre');

const Boton_Registrar = document.querySelector('#btn-registrar');

let validar = () => {
    let error = false;

    if (input_etiqueta.value == '') {
        error = true;
        input_etiqueta.classList.add('error_input');
    } else {
        input_etiqueta.classList.remove('error_input');
    }
  
    return error; 
};

let obtener_datos = () =>{
    if (validar() == false) {
        let nombre_etiqueta = input_etiqueta.value;
        registrar_etiqueta(nombre_etiqueta);
     
    } else {
        swal.fire({
            type: 'warning',
            title: 'Error al registrar',
            text: 'Por favor revise los campos resaltados'
        });
    }
};

Boton_Registrar.addEventListener('click', obtener_datos);