'use strict';
const tabla = document.querySelector('#tbl_listar_noticia tbody');
const input_filtrar = document.querySelector('#txt_filtrar');
let idCentro = sessionStorage.getItem('id');
const noticias = listar_todas_noticias(idCentro);

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
    /*document.querySelector('.titulo_centro_educativo').innerHTML = perfil.nombre;*/

    let filtros = input_filtrar.value;
    tabla.innerHTML = '';

    for (let i = 0; i < noticias.length; i++) {

        if (noticias[i]['tema'].toLowerCase().includes(filtros.toLowerCase())) {

            let fila = tabla.insertRow();
            //celda que toman los datos de la base de datos
            fila.insertCell().innerHTML = noticias[i]['tema'];
            fila.insertCell().innerHTML = noticias[i]['informacion']
            fila.insertCell().innerHTML = formatearFecha(noticias[i]['fecha']);

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
                eliminar(this.dataset.idCentro);

            });
            //a esa variable le agrego un elemento como hijo
            celda_actualizar.appendChild(boton_eliminar);
            celda_eliminar.appendChild(boton_eliminar);
        }


    }
};

input_filtrar.addEventListener('keyup', mostrar_datos);

mostrar_datos();