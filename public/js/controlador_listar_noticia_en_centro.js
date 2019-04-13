'use strict';

const div_noticias = document.querySelector('#tabla__noticias');
let id_centro = localStorage.getItem('padreVerPerfilCEdu');

const noticias = listar_todas_noticias(id_centro);

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
    div_noticias.innerHTML = ''; 
    if (noticias) {
        if ('object' == typeof noticias && Object.keys(noticias).length > 0) {
           
            let bloques = '';
        noticias.forEach( function (objeto) {
            bloques +='<div class="noticia not">';
            bloques +=' <h3 class="titulo">Tema:'+ objeto.tema +'</h3>';
         bloques +='<p class="informacion"> ' + objeto.informacion + '</p>';
            bloques +='<p class="hora__noticia">Fecha:' + formatearFecha (objeto.fecha)  +'</p>';
         
            bloques +='</div>';
        });
        div_noticias.innerHTML = bloques;
    }else{
    }
    } else {
        console.error('Error al obtener las noticias');
    }

};

mostrar_datos();
