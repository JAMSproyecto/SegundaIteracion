'use strict';

const bloque_calificar = document.querySelector('#bloque_calificar');

const info_centro = buscar_centro_por_id(id_centro);

let mostrar_calificacionMEP = () => {
    let calificacion_MEP = document.createElement('h2');
    calificacion_MEP.innerHTML = info_centro['calificacion'];
    bloque_calificar.appendChild(calificacion_MEP);
};