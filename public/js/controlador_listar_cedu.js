'use strict';

const CardsCentros = document.querySelector('#cards_centros');
const FiltroCards = document.querySelector('#filtrar_cards');
const selectEtiquetas = document.querySelector('#select_etiquetas')
const tipoUsuario = localStorage.getItem('tipoUsuario');

const listaEtiquetas = listar_etiquetas();

let elContenedor = [];

let irAlPerfil = (idCEdu) => {
    localStorage.setItem('verPerfilCEdu', idCEdu);

    switch (tipoUsuario.toLowerCase()) {
        case 'superadmin':
            location.replace('./perfilCentroAdmin.html');
            break;
        case 'padrefamilia':
            location.replace('./perfilCentroPadre.html');
            break;
        default:
            console.error('El tipo de usuario no tiene página de redirección');
            break;
    }
};

//Agregado por Marlon. 4/22 - Modificado por Jeison 4/23
let llenarSelectEtiquetas = () => {
    selectEtiquetas.innerHTML = '<option value="" selected="selected">Ninguno</option>';

    const cantEtiquetas = Object.keys(listaEtiquetas).length || listaEtiquetas.length;
    if (cantEtiquetas > 0) {

        let opcionGrupo = document.createElement('optgroup');
        opcionGrupo.label = 'Etiquetas:';
        let i = 0;
        for (i; i < cantEtiquetas; i++) {
            let opcionEtiqueta = document.createElement('option');
            opcionEtiqueta.text = listaEtiquetas[i]['nombre'];
            opcionEtiqueta.value = listaEtiquetas[i]['nombre'];
            opcionGrupo.appendChild(opcionEtiqueta);
        }
        selectEtiquetas.appendChild(opcionGrupo);

    }
};

let llenarContenido = () => {

    const laEtiqueta = selectEtiquetas.value;
    const cantEtiquetas = laEtiqueta.trim().length;

    const filtros = FiltroCards.value;
    const cantFiltros = filtros.trim().length;

    //Limpiamos antes de añadir los cards:
    CardsCentros.innerHTML = '';

    elContenedor.forEach(obj => {

        //Filtro por etiqueta:
        if (cantEtiquetas < 1 || combux.contiene(laEtiqueta, obj['etiquetas'])) {

            //Búsqueda por nombre del centro educativo:
            if (cantFiltros < 1 || combux.contiene(filtros, obj['nombre'])) {

                let card = document.createElement('div');
                card.classList.add('contenedor_cards_principal');

                let div_card = document.createElement('div');
                div_card.classList.add('contenedor_cards');


                let centro_nombre = document.createElement('h1');
                centro_nombre.innerHTML = obj['nombre'];


                let telefono = document.createElement('p');
                telefono.innerHTML = 'Teléfono: ' + obj['telefono'];

                let correo = document.createElement('p');
                correo.innerHTML = 'Correo: ' + obj['correo'];

                let provincia = document.createElement('p');
                provincia.innerHTML = 'Provincia: ' + obj['provincia'];

                let direccion = document.createElement('p');
                direccion.innerHTML = 'Dirección: ' + obj['direccion'];

                let calificacionMEP = document.createElement('p');

                calificacionMEP.innerHTML = '<strong class="Calificacion ">Calificación MEP: </strong>' + obj['calificacionMEP'];

                let calificacionPadres = document.createElement('p');

                calificacionPadres.innerHTML = '<strong class="Calificacion ">Calificación de los padres de familia: </strong>' + obj['calificacionPadres'];

                let verMas = document.createElement('a');
                verMas.addEventListener('click', () => {
                    irAlPerfil(obj['_id']);
                }, false);
                verMas.innerHTML = '<i class="fas fa-id-card"></i>';

                card.appendChild(centro_nombre);
                div_card.appendChild(telefono);
                div_card.appendChild(correo);
                div_card.appendChild(provincia);
                div_card.appendChild(direccion);

                div_card.appendChild(calificacionMEP);
                div_card.appendChild(calificacionPadres);
                div_card.appendChild(verMas);

                card.appendChild(div_card);
                CardsCentros.appendChild(card);

            }
        }
    });
};

let cargarCEdu = () => {

    listarCEdu((pSuccess, pMessage) => {

        if (pSuccess) {
            if ('object' == typeof pMessage) {

                FiltroCards.value = '';
                FiltroCards.addEventListener('keyup', llenarContenido);
                elContenedor = pMessage;
                llenarContenido();

            } else {
                CardsCentros.innerHTML = '';
                console.error(pMessage);
            }
        } else {
            CardsCentros.innerHTML = '<h4>' + pMessage + '</h4>';
            console.error(pMessage);
        }
    });
};


if (selectEtiquetas) {
    selectEtiquetas.addEventListener('change', llenarContenido);
}

window.onload = () => {
    cargarCEdu();
    llenarSelectEtiquetas();

};

