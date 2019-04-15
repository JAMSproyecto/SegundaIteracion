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

       if (registrar_articulo) {
          
        Swal.fire({
            title: '¡El artículo fue registrado de forma exitosa! ' + 
            '         ¿ Desea agregar otro artículo ?',
            type: 'question',
            customClass: {
              icon: 'swal2-spanish-question-mark'
            },
            confirmButtonText:  'Si',
            cancelButtonText:  'No',
            showCancelButton: true,
            showCloseButton: true
          }).then((result) => {
            if(result.value){
                boton_agregar.addEventListener('click', obtener_datos );
                  
            }else{
                window.location.href = 'listar_articulos.html';
            }
          })
       };
       
    } else {
        swal.fire({
            type: 'warning',
            title: 'El artículo no fue guardado de manera correcta',
            text: 'Favor completar los espacios señalados en rojo'
        });
    }
};  
//evento para agregar los datos 
boton_agregar.addEventListener('click', obtener_datos );


