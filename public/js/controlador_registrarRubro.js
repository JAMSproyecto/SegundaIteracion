'use strict';

const input_rubro = document.querySelector('#input_rubro');


const boton_registrar = document.querySelector('#btn_registrar');

let validar_vacios = () => {
    let error_vacios = false;

    if (input_rubro.value == '') {
        error_vacios = true;
        input_rubro.classList.add('error_input');
    } else {
        input_rubro.classList.remove('error_input');
        
    }
    return error_vacios;
}


 

let mostrarAlerta = (mensaje) => {
    Swal.fire({
        toast: false,
        title: mensaje,
        type: 'warning',
        position: 'center',
        timer: 10000,
        //animation: false,
        //  customClass: 'animated tada',
        showConfirmButton: true
    });
};




function obtener_datos(){

    if(validar_vacios()== false){
    let rubro = input_rubro.value;

    registrar_rubro(rubro);
} else {
    mostrarAlerta('Por favor ingrese el rubro a registrar');
}

};


boton_registrar.addEventListener('click', obtener_datos);