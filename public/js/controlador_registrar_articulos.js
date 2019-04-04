'use strict';
//constantes que obtienen los datos del formulario
const input_nombre = document.querySelector('#txt_nombre');
const input_descripcion = document.querySelector('#txt_descripcion');
const boton_agregar = document.querySelector('#btn_agregar');

//función para validar que no hay campos vacíos 
let validar = () => {
    let error = false;

    if (input_nombre.value == '') {
        error = true;
        input_nombre.classList.add('error_input');
    } else {
        input_nombre.classList.remove('error_input');
    }

    if (input_descripcion.value == '') {
        error = true;
        input_descripcion.classList.add('error_input');
    } else {
        input_descripcion.classList.remove('error_input');
    }

    return error;
};

//función que envia los datos al servicio 
let obtener_datos = () => {
    if (validar() == false ) {
        let nombre = input_nombre.value;
        let descripcion = input_descripcion.value;
        registrar_articulo(nombre, descripcion);
        input_nombre.value = '';
        input_descripcion.value = '';
    } else {
        swal.fire({
            type: 'warning',
            title: 'El articulo no fue enviado',
            text: 'Por favor revise los campos resaltados'
        });
    }
};  
//evento para agregar los datos 
boton_agregar.addEventListener('click', obtener_datos );