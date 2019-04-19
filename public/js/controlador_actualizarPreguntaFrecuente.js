'uset strict';


const Input_pregunta = document.querySelector('#txt_pregunta');
const Input_respuesta = document.querySelector('#txt_respuesta');


const boton_registrar = document.querySelector('#btn');

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
let actualizar_preguntaFrecuente = () => {
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
        let id_preguntaFrecuente = localStorage.getItem('IdPreguntaFrecuente');

        post_actualizarPreguntaFrecuente(pregunta, respuesta, centroEducativo, id_preguntaFrecuente);


    }
};


window.addEventListener('load', function(){
    if(typeof localStorage.getItem('IdPreguntaFrecuente') != 'undefined'){
        let preguntaFrecuente = get_obtenerPreguntaFrecuente(localStorage.getItem('IdPreguntaFrecuente'));

        Input_pregunta.value = preguntaFrecuente.pregunta;
        Input_respuesta.value = preguntaFrecuente.respuesta;
        boton_registrar.addEventListener('click', actualizar_preguntaFrecuente);   
    }
});
