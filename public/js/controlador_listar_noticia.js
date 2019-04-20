'use strict';
const tabla = document.querySelector('#tbl_listar_noticia tbody');
const input_filtrar = document.querySelector('#txt_filtrar');


let mostrar_noticias = () => {
const noticias = listar_todas_noticias();

    let filtros = input_filtrar.value;
    tabla.innerHTML = '';

    for (let i = 0; i < noticias.length; i++) {

        if (noticias[i]['tema'].toLowerCase().includes(filtros.toLowerCase())) {

            const ocultarHora = noticias[i]['fecha'].split(' ');


            let fila = tabla.insertRow();
            
            //celda que toman los datos de la base de datos
            fila.insertCell().innerHTML = noticias[i]['tema'];
            fila.insertCell().innerHTML = noticias[i]['informacion']
            fila.insertCell().innerHTML = ocultarHora[0];
            
            
            let celda_actualizar = fila.insertCell();
            let celda_eliminar = fila.insertCell();
            //accedo a esa celda para ir metiendo los elementos
            //creacion del boton del editar de manera dinamica


            let boton_editar = document.createElement('a');
            boton_editar.innerHTML = '<i class="fas fa-pen"></i> ';
            boton_editar.href = `actualizar_noticia.html?idCentro=${noticias[i]['_id']}`;
            //a esa variable le agrego un elemento como hijo
            celda_actualizar.appendChild(boton_editar);
            


            let boton_eliminar = document.createElement('a');
            boton_eliminar.innerHTML = '<i class="far fa-trash-alt"></i>';
            boton_eliminar.dataset.idCentro = noticias[i]['_id'];

            boton_eliminar.addEventListener('click', function () {
                eliminar_noticia(this.dataset.idCentro);
               
                mostrar_noticias();


            });
            //a esa variable le agrego un elemento como hijo
           
            celda_eliminar.appendChild(boton_eliminar);
        }


    }
};

input_filtrar.addEventListener('keyup', mostrar_noticias);

mostrar_noticias();
