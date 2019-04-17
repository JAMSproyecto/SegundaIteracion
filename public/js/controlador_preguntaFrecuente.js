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
let registrar_preguntaFrecuente = () => {
    if (validar() == true) {//llamada a la función
        swal.fire(
            {
                type: 'warning',
                title: 'La pregunta frecuente no fue registrada de forma correcta',
                text: 'Favor completar los espacios señalados en rojo'
    
            }
        );

    } else {
        let pregunta = Input_pregunta.value;
        let respuesta = Input_respuesta.value;
        let centroEducativo = localStorage.getItem('id');


        post_registrarPreguntaFrecuente(pregunta, respuesta, centroEducativo);


    }
};


boton_registrar.addEventListener('click', registrar_preguntaFrecuente);


