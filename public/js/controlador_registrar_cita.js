'uset strict';

const input_nombre = document.querySelector('#txt_nombre');
const input_apellidos = document.querySelector('#txt_apellidos');
const input_telefono = document.querySelector('#txt_telefono');
const input_correo = document.querySelector('#txt_correo');
const input_fecha = document.querySelector('#fecha');
const input_hora = document.querySelector('#hora');
const input_comentario = document.querySelector('#comentario');

const select = document.querySelector('#motivo_cita');


const boton_registrar = document.querySelector('#btn');


let validar = () => {
    let error = false;

    if (input_nombre.value == '') {
        error = true;
        input_nombre.classList.add('error_input');
    } else {
        input_nombre.classList.remove('error_input');
    }


    if (input_apellidos.value == '') {
        error = true;
        input_apellidos.classList.add('error_input');
    } else {
        input_apellidos.classList.remove('error_input');
    }


    if (input_telefono.value == '') {
        error = true;
        input_telefono.classList.add('error_input');
    } else {
        input_telefono.classList.remove('error_input');
    }

    if (input_correo.value == '') {
        error = true;
        input_correo.classList.add('error_input');
    } else {
        input_correo.classList.remove('error_input');
    }

    if (input_fecha.value == '') {
        error = true;
        input_fecha.classList.add('error_input');
    } else {
        input_fecha.classList.remove('error_input');
    }


    if (input_hora.value == '') {
        error = true;
        input_hora.classList.add('error_input');

    } else {
        input_hora.classList.remove('error_input');
    }
    if (select.value == '') {
        error = true;
        select.classList.add('error_input');

    } else {
        select.classList.remove('error_input');
    }


    if (input_comentario.value == '') {
        error = true;
        input_comentario.classList.add('error_input');

    } else {
        input_comentario.classList.remove('error_input');
    }

    return error;

};


let mostrar_datos = () => {
    if (validar() == true) {//llamada a la función
        swal.fire(
            {
                type: 'warning',
                title: 'Datos  Incompletos',
                text: 'Por favor, revise los campos resaltados en rojo'
            }
        );

    } else {
        let nombre = input_nombre.value;
        let apellidos = input_apellidos.value;
        let telefono = input_telefono.value;
        let correo = input_correo.value;
        let fecha = input_fecha.value;
        let hora = input_hora.value;
        let motivo = select.value;
        let comentario = input_comentario.value;
        
        let codigo = sessionStorage.getItem('padreVerPerfilCEdu'); 
        
        




        registrar_cita(codigo,nombre, apellidos, telefono, correo, fecha, hora, motivo, comentario);


    }
};



window.onload = () => {

    $.datetimepicker.setLocale('es');
    $('#fecha').datetimepicker({
        timepicker: false, datepicker: true, mask: true, format: 'Y-m-d', /*yearStart: ,*/
       
        minDate: '2017-01-01'
    });
};

let getFecha = () => {
    const InputDatepicker = document.querySelector('#fecha');
    alert(InputDatepicker.value);

};





boton_registrar.addEventListener('click', mostrar_datos);


