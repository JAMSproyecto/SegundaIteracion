'use strict';


const tabla = document.querySelector('#tbl_listar_actividad tbody');
const input_filtrar = document.querySelector('#txt_filtrar');
let idCentro = localStorage.getItem('id');


let formatearFecha = (pFecha) => {
    const fecha = new Date(pFecha);
    const anio = fecha.getFullYear();
    let dia_mes = fecha.getDate();
    let mes = fecha.getMonth();
    mes += 1;
    if (mes < 10) {
        mes = '0' + mes;
    }
    if (dia_mes < 10) {
        dia_mes = '0' + dia_mes;
    }
    return dia_mes + '/' + mes + '/' + anio;
};

let mostrar_datos = () => {
    const actividades = listar_todas_actividades(idCentro);

    let filtros = input_filtrar.value;
    tabla.innerHTML = '';

    for (let i = 0; i < actividades.length; i++) {
        if (actividades[i]['actividad'].toLowerCase().includes(filtros.toLowerCase())) {


            let fila = tabla.insertRow();

            fila.insertCell().innerHTML = actividades[i]['actividad'];
            fila.insertCell().innerHTML = formatearFecha(actividades[i]['fecha']);
            fila.insertCell().innerHTML = actividades[i]['hora_inicio'];
            fila.insertCell().innerHTML = actividades[i]['finaliza'];
            fila.insertCell().innerHTML = actividades[i]['lugar'];
            fila.insertCell().innerHTML = actividades[i]['detalles'];

            let celda_actualizar = fila.insertCell();
            let celda_eliminar = fila.insertCell();



            let boton_editar = document.createElement('a');
            boton_editar.innerHTML = '<i class="fas fa-pen"></i> ';
            boton_editar.href = `actualizar_actividad.html?idActividad=${actividades[i]['_id']}`;

            celda_actualizar.appendChild(boton_editar);



            let boton_eliminar = document.createElement('a');
            boton_eliminar.innerHTML = '<i class="far fa-trash-alt"></i>';
            boton_eliminar.dataset.idCentro = actividades[i]['_id'];
            celda_eliminar.appendChild(boton_eliminar);
            boton_eliminar.addEventListener('click', function () {
                eliminar(this.dataset.idCentro);

                mostrar_datos();


            });


        }


    }
};

input_filtrar.addEventListener('keyup', mostrar_datos);

mostrar_datos();
