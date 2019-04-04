'use strict';

const div_noticias = document.querySelector('#tabla__noticias');
let id_centro = sessionStorage.getItem('padreVerPerfilCEdu');

const noticias = listar_todas_noticias(id_centro);

let mostrar_datos = () => {
    div_noticias.innerHTML = '';
    if (noticias) {
        if ('object' == typeof noticias && Object.keys(noticias).length > 0) {
           
            let bloques = '';
        noticias.forEach( function (objeto) {
            bloques +='<div class="noticia not">';
            bloques +=' <h3 class="titulo">'+ objeto.tema +'</h3>';
            bloques +='<strong class="nombre__noticia">'+ objeto.noticia +'</strong>';
            bloques +='<p class="hora__noticia">'+ objeto.fecha +'</p>';
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
