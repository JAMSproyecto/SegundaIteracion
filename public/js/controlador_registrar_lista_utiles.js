'use strict';

const input_tipo = document.querySelector('#txt_tipo');
const input_nombre = document.querySelector('#txt_nombre');
const input_anno = document.querySelector('#txt_anno');
const titulo_centro = document.querySelector('#titulo_centro');
const lista_centros = document.querySelector('#lista');
const input_centros = document.querySelector('#lista_centros');
const label_centro = document.querySelector('#label_centro');
input_centros.classList.add('ocultar');
label_centro.classList.add('ocultar');

let response = obtener_lista_utiles();


const boton_crear = document.querySelector('#btn_agregar');

let validar = () => {
    let error = false;

    if (input_tipo.value == '') {
        error = true;
        input_tipo.classList.add('error_input');
    } else {
        input_tipo.classList.remove('error_input');
    }

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
            titulo_centro.innerHTML = 'MEP';
            input_tipo.addEventListener('change', mostrar_centros);
        }
        if (tipoUsuario === 'CentroEducativo') {
            input_tipo.innerHTML = '<option value="centro_educativo">Centro Educativo</option>';
            input_tipo.selectedIndex = 0;
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
        label_centro.classList.add('ocultar');
        sessionStorage.setItem('id', '1999')
    }else{
        input_centros.classList.remove('ocultar');
        label_centro.classList.remove('ocultar');
        input_centros.addEventListener('change', obtener_codigo_centro);
    }
};

function obtener_codigo_centro(){
    sessionStorage.setItem('id', this.value)
}


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


