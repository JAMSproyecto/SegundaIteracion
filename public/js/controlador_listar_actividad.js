'use strict';

const tabla = document.querySelector('#tbl_listar_actividad tbody');
const input_filtrar = document.querySelector('#txt_filtrar');

let mostrar_actividad = () => {
    const actividades = listar_todas_actividades();
    let filtros = input_filtrar.value;//para buscar en modo filtrado
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

            let celda_editar = fila.insertCell();//esta es la celda que es dinamica
            let celda_eliminar = fila.insertCell();//donde coloco los iconos
            let boton_eliminar = document.createElement('a');
            //creación del icono editar
            let boton_editar = document.createElement('a');//creo un elemento de html
            boton_editar.innerHTML = '<i class="fas fa-pencil-alt"></i>';
            boton_editar.href = `actualizar_actividad.html?idCentro=${actividades[i]['_id']}`;//accedo a la propiedades de los elementos enlace
            celda_editar.appendChild(boton_editar);//le agrego a al celda un elemento de hijo


            //creación del icono eliminar

            boton_eliminar.innerHTML = '<i class="far fas fa-trash-alt"></i>';
            boton_eliminar.dataset.idCentro = actividades[i]['_id'];
            celda_eliminar.appendChild(boton_eliminar);
            boton_eliminar.addEventListener('click', function () {

                Swal.fire({
                    title: '¿Está seguro que desea eliminar la actividad?',
                    text: "Ésta acción no se puede revertir",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: '¡Sí, estoy seguro!'
                }).then((result) => {
                    if (result.value) {
                        eliminar_actividad(this.dataset.idCentro);
                        mostrar_actividad();
                        Swal.fire(
                            '¡Actividad eliminada!',
                            'La lista ya no posee la actividad',
                            'success'
                        )
                    }
                })

            }
            )
        }
    };

    input_filtrar.addEventListener('keyup', mostrar_actividad);
}
mostrar_actividad();
