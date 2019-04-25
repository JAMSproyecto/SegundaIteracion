'use strict';
const tabla = document.querySelector('#tbl_listar_noticia tbody');
const input_filtrar = document.querySelector('#txt_filtrar');


let mostrar_datos = () => {
    const noticias = listar_todas_noticias();

    let filtros = input_filtrar.value;
    tabla.innerHTML = '';

    for (let i = 0; i < noticias.length; i++) {

        if (noticias[i]['tema'].toLowerCase().includes(filtros.toLowerCase())) {

            const ocultarHora = noticias[i]['fecha'].split(' ');


            let fila = tabla.insertRow();
            let boton_editar = document.createElement('a');
            let boton_eliminar = document.createElement('a');


         

            //celda que toman los datos de la base de datos
            fila.insertCell().innerHTML = noticias[i]['tema'];
            fila.insertCell().innerHTML = noticias[i]['informacion']
            fila.insertCell().innerHTML = ocultarHora[0];


            let celda_actualizar = fila.insertCell();
            let celda_eliminar = fila.insertCell();
            //accedo a esa celda para ir metiendo los elementos
            //creacion del boton del editar de manera dinamica



            boton_editar.innerHTML = '<i class="fas fa-pencil-alt"></i>';
            boton_editar.href = `actualizar_noticia.html?idCentro=${noticias[i]['_id']}`;
            //a esa variable le agrego un elemento como hijo
            celda_actualizar.appendChild(boton_editar);



            boton_eliminar.innerHTML = '<i class="far fas fa-trash-alt"></i>';
            boton_eliminar.dataset.idCentro = noticias[i]['_id'];
            //celda_actualizar.appendChild(boton_eliminar);
            celda_eliminar.appendChild(boton_eliminar);
            boton_eliminar.addEventListener('click', function () {
                    Swal.fire({
                        title: '¿Está seguro que desea eliminar la noticia?',
                        text: "Ésta acción no se puede revertir",
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: '¡Sí, estoy seguro!'
                    }).then((result) => {
                        if (result.value) {
                            eliminar_noticia(this.dataset.idCentro);
                            mostrar_datos();
                            Swal.fire(
                                '¡Noticia eliminada!',
                                'La lista ya no posee la noticia',
                                'success'
                            )
                        }
                    })

                  

                

            }

            )
        };
    }
    input_filtrar.addEventListener('keyup', mostrar_datos);
}
mostrar_datos();
