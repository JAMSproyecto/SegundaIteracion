'use strict';
const input_tema = document.querySelector('#txt_tema');
const input_noticia = document.querySelector('#txt_noticia');
const input_autor = document.querySelector('#txt_autor');
const input_fecha = document.querySelector('#txt_fecha');
const input_informacion = document.querySelector('#txt_informacion');

const boton_enviar = document.querySelector('#btn_enviar');



let validar = () => {

    let error = false;

    if (input_tema.value.trim() == '') {
        input_tema.classList.add('error_input');
        error = true;
    } else {
        input_tema.classList.remove('error_input');

    }


    if (input_noticia.value.trim() == '') {
        input_noticia.classList.add('error_input');
        error = true;
    } else {
        input_noticia.classList.remove('error_input');
    }


    if (input_autor.value.trim() == '') {
        input_autor.classList.add('error_input');
        error = true;
    } else {
        input_autor.classList.remove('error_input');

    }


    if (input_fecha.value.trim() == '') {
        input_fecha.classList.add('error_input');
        error = true;
    } else {
        input_fecha.classList.remove('error_input');

    }


    if (input_informacion.value.trim() == '') {
        input_informacion.classList.add('error_input');
        error = true;
    } else {
        input_informacion.classList.remove('error_input');

    }

    return error;
};

let mostrar_datos = () => {


    if (validar() == true) {
        Swal.fire({
            type: 'warning',
            title: 'Validación Incorrecta',
            text: 'Por favor revise los espacios resaltados en rojo'
        }
        )
    }
    else {

        let idCentro = sessionStorage.getItem("id");
        let tema = input_tema.value;
        let noticia = input_noticia.value;
        let autor = input_autor.value;
        let fecha = input_fecha.value;
        let informacion = input_informacion.value;

        registrar_noticia(idCentro, tema, noticia, autor, fecha, informacion);
    }


};


boton_enviar.addEventListener('click', mostrar_datos);



