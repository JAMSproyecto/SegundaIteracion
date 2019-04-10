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

const boton_actualizar = document.querySelector('#boton_registrar');

let _id = sessionStorage.getItem('id');

let infoPadre = buscar_padre(_id);

if (infoPadre) {

    txt_nombre.value = infoPadre['nombre'];
    txt_segundo_nombre.value = infoPadre['segundoNombre'];
    txt_apellido.value = infoPadre['apellido'];
    txt_segundo_apellido.value = infoPadre['segundoApellido'];
    lbl_tipo_id.value = infoPadre['tipoIdentificacion'];
    num_identidad.value = infoPadre['numIdentificacion'];
    txt_nacionalidad.value = infoPadre['nacionalidad'];
    fecha_nacimiento.value = infoPadre['fechaNacimiento'];
    num_cel.value = infoPadre['numCel'];
    num_casa.value = infoPadre['numCasa'];
    email_correo.value = infoPadre['correo'];
    

    //Esto no anda bien aún
    let opciones_provincias = document.querySelectorAll('#slt_provincias option');


    for(let i = 0; i < opciones_provincias.length; i++){
        if(opciones_provincias[i].textContent ==   slt_provincias.value == infoPadre['provincia']){
            opciones_provincias[i].selected = true;
            llenar_cantones();
            slt_provincias.value == infoPadre['provincia'];
        }
    }

    let opciones_cantones = document.querySelectorAll('#slt_cantones option');

    for(let i = 0; i < opciones_cantones.length; i++){
        if(opciones_cantones[i].textContent == slt_cantones.value == infoPadre['canton']){
            opciones_cantones[i].selected = true;
            slt_cantones.value == infoPadre['canton'];
        }
    }
  
    let opciones_distritos = document.querySelectorAll('#slt_distritos option');

    for(let i = 0; i < opciones_distritos.length; i++){
        if(opciones_distritos[i].textContent == slt_cantones.value == slt_distritos.value == infoPadre['distrito']){
            opciones_distritos[i].selected = true;
            slt_distritos.value == infoPadre['distrito'];
        }
    }
    
    //Aquí termina lo que tengo que corregir

    txt_direccion.value = infoPadre['direccion'];
    cant_hijos.value = infoPadre['cantidadHijos'];
    nombre_hijo.value = infoPadre['nombreHijo'];
    edad_hijo.value = infoPadre['edadHijo'];
    nombre_hijo2.value = infoPadre['nombreHijo2'];
    edad_hijo2.value = infoPadre['edadHijo2'];
    nombre_hijo3.value = infoPadre['nombreHijo3'];
    edad_hijo3.value = infoPadre['edadHijo3'];
    nombre_hijo4.value = infoPadre['nombreHijo4'];
    edad_hijo4.value = infoPadre['edadHijo4'];

} else {
    console.log(infoPadre[0]);
};



let actualizar_datos = () => {

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
    actualizar_padre(nombre, segundoNombre, apellido, segundoApellido, tipoIdentificacion, numIdentificacion, nacionalidad, fechaNacimiento, numCel, numCasa, email, provincia, canton, distrito, direccion, cantidadHijos, nombreHijo, edadHijo, nombreHijo2, edadHijo2, nombreHijo3, edadHijo3, nombreHijo4, edadHijo4, _id);

};

boton_actualizar.addEventListener('click', actualizar_datos);
