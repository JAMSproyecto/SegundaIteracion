'use strict';


const input_actividad = document.querySelector('#txt_actividad');
const input_fecha = document.querySelector('#txt_fecha');
const input_hora_inicio = document.querySelector('#txt_hora_inicio');
const input_finaliza = document.querySelector('#txt_finaliza');
const input_lugar = document.querySelector('#txt_lugar');
const input_detalles = document.querySelector('#txt_detalles');
const boton_actualizar = document.querySelector('#btn_actualizar');


//aqui capture el id de la actividad en el url, como parametro
let get_param = (param) => {//agarre el 
    var url_string = window.location.href;
    var url = new URL(url_string);
    var id = url.searchParams.get(param);
    //toma el paramentro id de la actividad del url y retorna el valor

    return id;
};


let id = get_param('idCentro');//aqui guardo el id de la actividad en una variable

let formatearFecha = (pFecha) => {
    if (pFecha.length > 0) {
        const fecha = new Date(pFecha);
        const anio = fecha.getFullYear();
        let dia_mes = fecha.getDate();
        let mes = fecha.getMonth();
        let h = fecha.getHours();
        let m = fecha.getMinutes();
        mes += 1;
        if (mes < 10) {
            mes = '0' + mes;
        }
        if (dia_mes < 10) {
            dia_mes = '0' + dia_mes;
        }
        if (h < 10) {
            h = '0' + h;
        }
        if (m < 10) {
            m = '0' + m;
        }
        return anio + '-' + mes + '-' + dia_mes ;
    } else {
        return '';
    }
};

let actividad = buscar_actividad(id);

if (actividad) {
    
    input_actividad.value = actividad[0]['actividad'];
    input_fecha.value = formatearFecha(actividad[0]['fecha']);
    input_hora_inicio.value = actividad[0]['hora_inicio'];
    input_finaliza.value = actividad[0]['finaliza'];
    input_lugar.value = actividad[0]['lugar'];

    input_detalles.value = actividad[0]['detalles']

} else {
    console.log('actividad', actividad);
}
let obtener_datos = () => {
   let actividad =  input_actividad.value;
   let fecha =  input_fecha.value;
   let hora_inicio = input_hora_inicio.value;
   let finaliza = input_finaliza.value;
   let detalles = input_detalles.value;
   let lugar = input_lugar.value;

    input_detalles.value;

    actualizar_actividad(actividad,fecha,hora_inicio,finaliza,lugar,  detalles, id);
};


boton_actualizar.addEventListener('click', obtener_datos);