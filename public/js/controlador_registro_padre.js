'use strict';

const txt_nombre = document.querySelector('#txt_nombre');
const txt_segundo_nombre = document.querySelector('#txt_segundo_nombre');
const txt_apellido = document.querySelector('#txt_apellido');
const txt_segundo_apellido = document.querySelector('#txt_segundo_apellido');
const lbl_tipo_id = document.querySelector('#lbl_tipo_id');
const num_identidad = document.querySelector('#num_identidad');
const txt_nacionalidad = document.querySelector('#txt_nacionalidad');
const fecha_nacimiento = document.querySelector('#fecha_nacimiento');


const num_cel = document.querySelector('#num_cel');
const num_casa = document.querySelector('#num_casa');
const email_correo = document.querySelector('#email_correo');
const email_correo2 = document.querySelector('#email_correo2');


const slt_provincias = document.querySelector('#slt_provincias');
const slt_cantones = document.querySelector('#slt_cantones');
const slt_distritos = document.querySelector('#slt_distritos');
const txt_direccion = document.querySelector('#txt_direccion');

const cant_hijos = document.querySelector('#slt_hijos');
const nombre_hijo = document.querySelector('#txt_nombre_hijo');
const edad_hijo = document.querySelector('#num_edad_hijo');
const nombre_hijo2 = document.querySelector('#txt_nombre_hijo2');
const edad_hijo2 = document.querySelector('#num_edad_hijo2');
const nombre_hijo3 = document.querySelector('#txt_nombre_hijo3');
const edad_hijo3 = document.querySelector('#num_edad_hijo3');
const nombre_hijo4 = document.querySelector('#txt_nombre_hijo4');
const edad_hijo4 = document.querySelector('#num_edad_hijo4');

const boton_registrar = document.querySelector('#boton_registrar');

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


let validar_datos_generales = () => {
    let error_datos_generales = false;

    if (txt_nombre.value == '') {
        error_datos_generales = true;
        txt_nombre.classList.add('error_input');
    } else {
        txt_nombre.classList.remove('error_input');
    }

    if (txt_apellido.value == '') {
        error_datos_generales = true;
        txt_apellido.classList.add('error_input');
    } else {
        txt_apellido.classList.remove('error_input');
    }

    if (lbl_tipo_id.value == '') {
        error_datos_generales = true;
        lbl_tipo_id.classList.add('error_input');
    } else {
        lbl_tipo_id.classList.remove('error_input');
    }

    if (num_identidad.value == '') {
        error_datos_generales = true;
        num_identidad.classList.add('error_input');
    } else {
        num_identidad.classList.remove('error_input');
    }

    if (txt_nacionalidad.value == '') {
        error_datos_generales = true;
        txt_nacionalidad.classList.add('error_input');
    } else {
        txt_nacionalidad.classList.remove('error_input');
    }

    return error_datos_generales;
};


let obtenerEdad = (pFecha) =>{
    return Math.floor( (new Date() - new Date(pFecha).getTime() ) / 3.15576e+10 );
};


let validar_edad = () => {
    let error_edad = false;
    let DOB = fecha_nacimiento.value.trim(); //YYYY-MM-DD
   

    if (DOB.length < 1) {
        error_edad = true;
        fecha_nacimiento.classList.add('error_input');
    } else {
        let edad = obtenerEdad(DOB);
        if (edad > 17) {
            fecha_nacimiento.classList.remove('error_input');
        } else {
            fecha_nacimiento.classList.add('error_input');
            error_edad = true;
            mostrarAlerta('El usuario debe de ser mayor de edad');
        }
    }
    return error_edad;
}


/**
 * @param  {String} pValor
 * @return {Boolean}
 */
let validarCorreo = (pValor) => {
    const ExpresionRegular = /^((([a-z]|\d|[!#\$%&’\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&’\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/;
    return ExpresionRegular.test(pValor);
};

let validar_datos_contacto = () => {
    let error_datos_contacto = false;

    if (num_cel.value == '') {
        error_datos_contacto = true;
        num_cel.classList.add('error_input');
    } else {
        num_cel.classList.remove('error_input');
    }

    if (email_correo.value == '' || validarCorreo(email_correo.value) == false) {
        error_datos_contacto = true;
        email_correo.classList.add('error_input');
    } else {
        email_correo.classList.remove('error_input');
    }

    if (email_correo2.value == '' || validarCorreo(email_correo2.value) == false) {
        error_datos_contacto = true;
        email_correo2.classList.add('error_input');
    } else {
        email_correo2.classList.remove('error_input');
    }

    if (email_correo.value == email_correo2.value) {
        email_correo2.classList.remove('error_input');
    } else {
        error_datos_contacto = true;
        email_correo2.classList.add('error_input');
    }
    return error_datos_contacto;
};


let validar_direccion = () => {
    let error_direccion = false;

    if (slt_provincias.value == '') {
        error_direccion = true;
        slt_provincias.classList.add('error_input');
    } else {
        slt_provincias.classList.remove('error_input');
    }

    if (slt_cantones.value == '') {
        error_direccion = true;
        slt_cantones.classList.add('error_input');
    } else {
        slt_cantones.classList.remove('error_input');
    }

    if (slt_distritos.value == '') {
        error_direccion = true;
        slt_distritos.classList.add('error_input');
    } else {
        slt_distritos.classList.remove('error_input');
    }

    if (txt_direccion.value == '') {
        error_direccion = true;
        txt_direccion.classList.add('error_input');
    } else {
        txt_direccion.classList.remove('error_input');
    }

    return error_direccion;
};


let obtener_datos = () => {

    if (validar_datos_generales() == false) {
        if (validar_edad() == false) {
            if (validar_datos_contacto() == false) {
                if (validar_direccion() == false) {              
                        let nombre = txt_nombre.value;
                        let segundoNombre = txt_segundo_nombre.value;
                        let apellido = txt_apellido.value;
                        let segundoApellido = txt_segundo_apellido.value;
                        let tipoIdentificacion = lbl_tipo_id.value;
                        let numIdentificacion = num_identidad.value;
                        let nacionalidad = txt_nacionalidad.value;
                        let fechaNacimiento = fecha_nacimiento.value;
                        let numCel = num_cel.value;
                        let numCasa = num_casa.value;
                        let email = email_correo.value;
                        let provincia = slt_provincias.value;
                        let canton = slt_cantones.value;
                        let distrito = slt_distritos.value;
                        let direccion = txt_direccion.value;
                        let cantidadHijos = cant_hijos.value;
                        let nombreHijo = nombre_hijo.value;
                        let edadHijo = edad_hijo.value;
                        let nombreHijo2 = nombre_hijo2.value;
                        let edadHijo2 = edad_hijo2.value;
                        let nombreHijo3 = nombre_hijo3.value;
                        let edadHijo3 = edad_hijo3.value;
                        let nombreHijo4 = nombre_hijo4.value;
                        let edadHijo4 = edad_hijo4.value;
                        registrar_padre(nombre, segundoNombre, apellido, segundoApellido, tipoIdentificacion, numIdentificacion, nacionalidad, fechaNacimiento, numCel, numCasa, email, provincia, canton, distrito, direccion, cantidadHijos, nombreHijo, edadHijo, nombreHijo2, edadHijo2, nombreHijo3, edadHijo3, nombreHijo4, edadHijo4);
                } else {
                    mostrarAlerta('Por favor revise los campos resaltados en la sección de dirección');
                }
            } else {
                mostrarAlerta('Por favor revise los campos resaltados en la sección de datos de contacto');
            }
        } else {
            mostrarAlerta('El usuario debe de ser mayor de edad');
        }
    } else {
        mostrarAlerta('Por favor revise los campos resaltados en la sección de datos generales');
    }
};


boton_registrar.addEventListener('click', obtener_datos);
