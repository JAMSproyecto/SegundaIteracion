'uset strict';

const Input_pregunta = document.querySelector('#txt_pregunta');
const Input_respuesta = document.querySelector('#txt_respuesta');


const boton_registrar = document.querySelector('#btn');


/**
 * Función para validar los campos
 */
let validar = () => {
    let error = false;

    if (Input_pregunta.value == '') {
        error = true;
        Input_pregunta.classList.add('error_input');
    } else {
        Input_pregunta.classList.remove('error_input');
    }


    if (Input_respuesta.value == '') {
        error = true;
        Input_respuesta.classList.add('error_input');
    } else {
        Input_respuesta.classList.remove('error_input');
    }


    return error;

};


/**
 * Evento click para el botón registrar
 */
let registrar_preguntaFrecuenteGeneral = () => {
    if (validar() == true) {//llamada a la función
        swal.fire(
            {
                type: 'warning',
                title: 'Datos  Incompletos',
                text: 'Por favor, revise los campos resaltados en rojo'
            }
        );

    } else {
        let pregunta = Input_pregunta.value;
        let respuesta = Input_respuesta.value;
        
        post_registrarPreguntaFrecuenteGeneral(pregunta, respuesta);


    }
};


boton_registrar.addEventListener('click', registrar_preguntaFrecuenteGeneral);


