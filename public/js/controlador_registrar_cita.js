'uset strict';

const input_nombre = document.querySelector('#txt_nombre');
const input_apellidos = document.querySelector('#txt_apellidos');
const input_telefono = document.querySelector('#txt_telefono');
const input_correo = document.querySelector('#txt_correo');
const input_fecha = document.querySelector('#fecha');
const input_hora = document.querySelector('#hora');
const input_comentario = document.querySelector('#comentario');

const select = document.querySelector('#motivo_cita');


const boton_registrar = document.querySelector('#btnRegistrarCita');


let validar = () => {
    let error = false;
    let fecha = moment(`${input_fecha.value} ${input_hora.value}`, 'DD-MM-YYYY hh:mm');

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

    if (fecha.toString() == 'Invalid date' || fecha.isSameOrBefore(moment())) {
        error = true;
        input_fecha.classList.add('error_input');
        input_hora.classList.add('error_input');
    } else {
        input_fecha.classList.remove('error_input');
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
                title: 'La cita no fue registrada de manera correcta',
                text: 'Favor completar los espacios señalados en rojo'
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
        
        let codigo = localStorage.getItem('verPerfilCEdu'); 
        
        
        



        registrar_cita(codigo,nombre, apellidos, telefono, correo, fecha, hora, motivo, comentario);


    }
};



window.onload = () => {
    $.datetimepicker.setDateFormatter({
        parseDate: function (date, format) {
            var d = moment(date, format);
            return d.isValid() ? d.toDate() : false;
        },
        
        formatDate: function (date, format) {
            return moment(date).format(format);
        },
    
        //Optional if using mask input
        formatMask: function(format){
            return format
                .replace(/Y{4}/g, '9999')
                .replace(/Y{2}/g, '99')
                .replace(/M{2}/g, '19')
                .replace(/D{2}/g, '39')
                .replace(/H{2}/g, '29')
                .replace(/m{2}/g, '59')
                .replace(/s{2}/g, '59');
        }
    });


    $.datetimepicker.setLocale('es');
    $('#fecha').datetimepicker({
        timepicker: false, datepicker: true, mask: true, format: 'DD-MM-YYYY',
       
        minDate: '2017-01-01'
    });
 
    let informacionPadre = buscar_padre(localStorage.getItem('id'));

    input_nombre.value = informacionPadre.nombre;
    input_apellidos.value = `${informacionPadre.apellido} ${informacionPadre.segundoApellido}`;
    if(informacionPadre.numCasa != '' && typeof informacionPadre.numCasa != "undefined")
        input_telefono.value = informacionPadre.numCasa;
    else
        input_telefono.value = informacionPadre.numCel;
    
    input_correo.value = informacionPadre.correo;


};




boton_registrar.addEventListener('click', mostrar_datos);


