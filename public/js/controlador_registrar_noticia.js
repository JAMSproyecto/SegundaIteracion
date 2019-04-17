'use strict';
const input_tema = document.querySelector('#txt_tema');

const input_informacion = document.querySelector('#txt_informacion');

const boton_enviar = document.querySelector('#btn_enviar'); 

let validar = () => {

    let error = false;

    if (input_tema.value == ''){
        input_tema.classList.add('error_input');
        error = true;
    } else {
        input_tema.classList.remove('error_input');

    }



    if (input_informacion.value == ''){
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
            title: 'La noticia no fue registrada de manera correcta',
            text: 'Favor completar los espacios señalados en rojo'
        }
        )
    }
    else { 

        let idCentro = localStorage.getItem("id");
        let tema = input_tema.value;
        let informacion = input_informacion.value;
        registrar_noticia(idCentro, tema,  informacion);
    }


};


boton_enviar.addEventListener('click', mostrar_datos);



