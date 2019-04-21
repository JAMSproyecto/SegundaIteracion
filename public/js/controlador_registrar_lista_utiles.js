'use strict';

const input_tipo = document.querySelector('#txt_tipo');
const input_nombre = document.querySelector('#txt_nombre');
const input_anno = document.querySelector('#txt_anno');
const titulo_centro = document.querySelector('#titulo_centro');
const lista_centros = document.querySelector('#lista');
const input_centros = document.querySelector('#lista_centros');
const bloqueOcultar = document.querySelector('#bloqueCentrosOcultar');
const bloqueOcultar2 = document.querySelector('#bloqueCentrosOcultar2');


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
            title: 'El articulo no fue registrado de manera correcta',
            text: 'Favor completar los espacios señalados en rojo'
        });
    }
};

boton_crear.addEventListener('click', obtener_datos);


window.onload = () => {

    let tipoUsuario = localStorage.getItem('tipoUsuario');

    if (null !== tipoUsuario) {
     

        if (tipoUsuario === 'SuperAdmin') {
            input_tipo.classList.remove('ocultar');
            input_centros.classList.remove('ocultar');
            input_tipo.innerHTML = '<option value="">Seleccione el tipo de lista</option><option value="MEP">MEP</option><option value="centro_educativo">Centro Educativo</option>';
            input_tipo.selectedIndex = 0;
            cargarCEdu();
            titulo_centro.innerHTML = 'MEP';
            input_tipo.addEventListener('change', mostrar_centros);

        }else {
            bloqueOcultar.classList.add('ocultar');
            bloqueOcultar2.classList.add('ocultar');
        }
    } else {
        console.error('No se encontró el tipo de usuario');
    }
};

  
function mostrar_centros(){
    if(this.value != 'centro_educativo'){
        localStorage.setItem('id', '1999');
        bloqueOcultar.classList.remove('ocultar');
    }else{
        bloqueOcultar.classList.add('ocultar');
        input_centros.addEventListener('change', obtener_codigo_centro);
        
    }
};

function obtener_codigo_centro(){
    localStorage.setItem('id', this.value);
    
};


let cargarCEdu = () => {
    listarCEdu((pSuccess, pMessage) => {
        if (pSuccess) {
            if ('object' == typeof pMessage) {
                pMessage.forEach(obj => {
                    let opcion = document.createElement('option');
                    opcion.value = obj['_id'];
                    opcion.textContent = obj['nombre'];
                    lista_centros.appendChild(opcion);
                });
            };
        }
    });
};
