'use strict';


const tabla = document.querySelector('#tbl_listar_actividad tbody');
const input_filtrar = document.querySelector('#txt_filtrar');

const actividades = listar_todas_actividades();

let mostrar_actividades = () => {
    

    let filtros = input_filtrar.value;
    tabla.innerHTML = '';

    for (let i = 0; i < actividades.length; i++) {

        if (actividades[i]['actividad'].toLowerCase().includes(filtros.toLowerCase())) {

            let fila = tabla.insertRow();

            const ocultarHora = actividades[i]['fecha'].split(' ');
            
            fila.insertCell().innerHTML = actividades[i]['actividad'];
            fila.insertCell().innerHTML = actividades[i]['hora_inicio'];
            fila.insertCell().innerHTML = actividades[i]['finaliza'];
            fila.insertCell().innerHTML = actividades[i]['lugar'];
            fila.insertCell().innerHTML = actividades[i]['detalles'];
            fila.insertCell().innerHTML = ocultarHora[0];

            let celda_actualizar = fila.insertCell();
            let celda_eliminar = fila.insertCell();



            let boton_editar = document.createElement('a');
            boton_editar.innerHTML = '<i class="fas fa-pen"></i> ';
            boton_editar.href = `actualizar_actividad.html?idCentro=${actividades[i]['_id']}`;

            celda_actualizar.appendChild(boton_editar);



            let boton_eliminar = document.createElement('a');
            boton_eliminar.innerHTML = '<i class="far fa-trash-alt"></i>';
            boton_eliminar.dataset.idCentro = actividades[i]['_id'];
           
           
           
            boton_eliminar.addEventListener('click', function () {
                eliminar(this.dataset.idCentro);

                mostrar_actividad();


            });
            celda_eliminar.appendChild(boton_eliminar);

        }


    }
};

input_filtrar.addEventListener('keyup', mostrar_actividades);

mostrar_actividades();
