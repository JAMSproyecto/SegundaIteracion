'use strict';

const input_tipo = document.querySelector('#txt_tipo');
const input_nombre = document.querySelector('#txt_nombre');
const input_anno = document.querySelector('#txt_anno');
const label_tipo = document.querySelector('#label_tipo');
const titulo_centro = document.querySelector('#titulo_centro');
const lista_centros = document.querySelector('#lista');
const input_centros = document.querySelector('#lista_centros');
input_centros.classList.add('ocultar');

let response = obtener_lista_utiles();


const boton_crear = document.querySelector('#btn_agregar');

let validar = () => {
    let error = false;



    if (input_nombre.value == '') {
        error = true;
        input_nombre.classList.add('error_input');
    } else {
        input_nombre.classList.remove('error_input');
    }

    if (input_anno.value == '') {
        error = true;
        input_anno.classList.add('error_input');
    } else {
        input_anno.classList.remove('error_input');
    }


    return error;
};



let obtener_datos = () => {

    if (validar() == false) {
        let tipo = input_tipo.value;
        let nombre = input_nombre.value;
        let anno = input_anno.value;
        registrar_lista_utiles(tipo, nombre, anno);

    } else {
        swal.fire({
            type: 'warning',
            title: 'La lista de útiles no fue enviada',
            text: 'Por favor revise los campos resaltados'
        });
    }
};

boton_crear.addEventListener('click', obtener_datos);

window.onload = () => {

    let tipoUsuario = sessionStorage.getItem('tipoUsuario');

    if (null !== tipoUsuario) {

        if (tipoUsuario === 'SuperAdmin') {

            input_tipo.innerHTML = '<option value="">Seleccione el tipo de lista</option><option value="MEP">MEP</option><option value="centro_educativo">Centro Educativo</option>';
            input_tipo.selectedIndex = 0;
            cargarCEdu();
            let nombre = response.coleccion_utiles[0]['nombre'];
            titulo_centro.innerHTML = nombre;

            input_tipo.addEventListener('change', mostrar_centros);


        }
        if (tipoUsuario === 'CentroEducativo') {
            
            input_tipo.selectedIndex = 2;
            input_tipo.remove();

            
            let nombre = response.nombreCentro;

            titulo_centro.innerHTML = nombre;
        }
    } else {
        console.error('No se encontró el tipo de usuario');
    }
};
function mostrar_centros(){
    if(this.value != 'centro_educativo'){
        input_centros.classList.add('ocultar');
    }else{
        input_centros.classList.remove('ocultar');
    }
};
let cargarCEdu = () => {
    listarCEdu_todo((pSuccess, pMessage) => {
        if (pSuccess) {
            if ('object' == typeof (pMessage)) {
                pMessage.forEach(obj => {
                    let opcion = document.createElement('option');
                    opcion.value = obj['_id'];
                    opcion.textContent = obj['nombre']
                    lista_centros.appendChild(opcion);


                });



            };
        }
    })
};
