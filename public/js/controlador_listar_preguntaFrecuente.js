'use strict'


const Tabla_PreguntaFrecuente = document.querySelector('#tbl_preguntasFrecuentes tbody');
const Slt_Filtros = document.querySelector('#txt_filtro');
const Id_Centro = sessionStorage.getItem("id");
/*
    Eventos
 */

let filtrarPreguntas = () =>{
    let preguntas = Tabla_PreguntaFrecuente.querySelectorAll('tr');

    preguntas.forEach((e, k)=>{
        //Obtiene la pregunta de la tabla
        let pregunta = e.children[0].innerText;
        if(pregunta.includes(Slt_Filtros.value)){
            e.classList.remove('invisible');
        }
        else{
            e.classList.add('invisible');
        }
    });
};


window.addEventListener('load', () => {

    /** Metodo listar_mascotas definido en el servicio_mascotas */
    get_ListarPreguntasFrecuentes(Tabla_PreguntaFrecuente, Id_Centro);
    Slt_Filtros.addEventListener('keyup', filtrarPreguntas);
    Slt_Filtros.addEventListener('blur', filtrarPreguntas);

});