'use strict';

const Input_Pin_Validacion = document.querySelector('#input_pin');
const Input_Contrasenna = document.querySelector('#txt_contrasena');
const Input_Contrasenna2 = document.querySelector('#txt_contrasena2');
const Boton_Registrar = document.querySelector('#boton_registrar');

let mostrarAlerta = (pMensaje, pInput) => {
    if (pInput) {
        pInput.classList.add('error_input');
    }
    Swal.fire({
        toast: false,
        title: pMensaje,
        type: 'warning',
        position: 'center',
        timer: 10000,
        showConfirmButton: true,
        onAfterClose: () => {
            if (pInput) {
                pInput.select();
                pInput.focus();
            }
        }
    });
};


let enviarDatos = () => {
    const pin = Input_Pin_Validacion.value.trim();
    const c1 = Input_Contrasenna.value.trim();
    const c2 = Input_Contrasenna2.value.trim();

    if (pin.length !== 6) {
        mostrarAlerta('Pin incorrecto', Input_Pin_Validacion);
        return false;
    } else {
        Input_Pin_Validacion.classList.remove('error_input');
    }

    if (c1.length < 6) {
        mostrarAlerta('Contraseña muy corta', Input_Contrasenna);
        return false;
    } else {
        if (c1.length > 8) {
            mostrarAlerta('Contraseña muy larga', Input_Contrasenna);
            return false;
        } else {
            Input_Contrasenna.classList.remove('error_input');
        }
    }


    if (c2.length < 6) {
        mostrarAlerta('Contraseña muy corta', Input_Contrasenna2);
        return false;
    } else {
        if (c2.length > 8) {
            mostrarAlerta('Contraseña muy larga', Input_Contrasenna2);
            return false;
        } else {
            Input_Contrasenna2.classList.remove('error_input');
        }
    }

    if (validarContrasena(c1) == false) {
        mostrarAlerta('El formato de la contraseña ingresada no es válida', Input_Contrasenna);
        return false;
    } else {
        Input_Contrasenna.classList.remove('error_input');
    }


    if (validarContrasena(c2) == false) {
        mostrarAlerta('El formato de la contraseña ingresada no es válida', Input_Contrasenna2);
        return false;
    } else {
        Input_Contrasenna2.classList.remove('error_input');
    }


    if (c1 === c2) {
        Input_Contrasenna.classList.remove('error_input');
        Input_Contrasenna2.classList.remove('error_input');
    } else {
        Input_Contrasenna.classList.add('error_input');
        Input_Contrasenna2.classList.add('error_input');
        mostrarAlerta('Las contraseñas deben de coincidir');
        return false;
    }

    const objResultado = verificar_pin(pin, codificar(c1));

    if(objResultado.success){
        swal.fire({
            type: 'success',
            title: objResultado.message,
            onAfterClose: function () {
                document.location = 'inicio_sesion.html';
            }
        });
    }else{
        mostrarAlerta(objResultado.message);
    }


};


Boton_Registrar.addEventListener('click', enviarDatos);

window.onload = () => {
    if (Input_Pin_Validacion) {
        Input_Pin_Validacion.select();
        Input_Pin_Validacion.focus();
    }
}