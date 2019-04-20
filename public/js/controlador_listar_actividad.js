'use strict';


const tabla = document.querySelector('#tbl_listar_actividad tbody');
const input_filtrar = document.querySelector('#txt_filtrar');


let mostrar_datos = () => {
    const actividades = listar_todas_actividades();

    let filtros = input_filtrar.value;
    tabla.innerHTML = '';

    for (let i = 0; i < actividades.length; i++) {

        if (actividades[i]['actividad'].toLowerCase().includes(filtros.toLowerCase())) {

            let fila = tabla.insertRow();
            const ocultarHora = actividades[i]['fecha'].split(' ');

            fila.insertCell().innerHTML = actividades[i]['actividad'];
            fila.insertCell().innerHTML = ocultarHora[0];
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
                eliminar_actividad(this.dataset.idCentro);

                mostrar_datos();


            });


        }


    }
};

input_filtrar.addEventListener('keyup', mostrar_datos);

mostrar_datos();
