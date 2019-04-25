'uset strict';

const input_fecha = document.querySelector('#fecha');
const input_hora = document.querySelector('#hora');
const input_comentario = document.querySelector('#comentario');
const select = document.querySelector('#motivo_cita');
const boton_registrar = document.querySelector('#btnRegistrarCita');

const codigo = localStorage.getItem('verPerfilCEdu');

let elNombre = '';
let elApellido = '';
let elTelefono = '';
let elCorreo = '';

let validar = () => {
    let error = false;
    let fecha = moment(`${input_fecha.value} ${input_hora.value}`, 'DD-MM-YYYY hh:mm');

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
        let fecha = input_fecha.value;
        let hora = input_hora.value;
        let motivo = select.value;
        let comentario = input_comentario.value.trim();


        if ('undefined' == typeof codigo || null === codigo) {
            throw new Error('Error al cargar el perfil: El identificador no puede estar vacio');
        }

        registrar_cita(codigo, elNombre, elApellido, elTelefono, elCorreo, fecha, hora, motivo, comentario);

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
        formatMask: function (format) {
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
        timepicker: false, datepicker: true, mask: true, format: 'DD-MM-YYYY', minDate: '2019-01-01'
    });

    let informacionPadre = buscar_padre(localStorage.getItem('id'));

    elNombre = informacionPadre.nombre;
    elApellido = `${informacionPadre.apellido} ${informacionPadre.segundoApellido}`;

    if ('undefined' != typeof informacionPadre.numCasa && null !== typeof informacionPadre.numCasa && informacionPadre.numCasa.trim() != '') {
        elTelefono = informacionPadre.numCasa;
    } else {
        elTelefono = informacionPadre.numCel;
    }

    elCorreo = informacionPadre.correo;


    if ('undefined' == typeof codigo || null === codigo) {
        throw new Error('Error al cargar el perfil: El identificador no puede estar vacio');
    }
    const perfil = get_obtenerPerfil(codigo);

    if ('undefined' !== typeof perfil.nombre) {
        document.querySelector('.titulo_centro_educativo').innerHTML = perfil.nombre;
    }

};


if (boton_registrar) {
    boton_registrar.addEventListener('click', mostrar_datos);
}

