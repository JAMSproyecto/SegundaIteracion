'use strict';

const nombre_etiqueta = document.querySelector('#txt_nombre');

const Boton_Registrar = document.querySelector('#btn-registrar');

let validar = () => {
    let error = false;

    if (nombre_etiqueta.value == '') {
        error = true;
        nombre_etiqueta.classList.add('error_input');
    } else {
        nombre_etiqueta.classList.remove('error_input');
    }
  
    return error; 
};

let obtener_datos = () =>{
    if (validar() == false) {
        let nombre_etiqueta = nombre_etiqueta.value;
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