'use strict';

const CardsCentros = document.querySelector('#cards_centros');
const FiltroCards = document.querySelector('#filtrar_cards');

let elContenedor = [];

let irAlPerfil = (idCEdu) => {
    localStorage.setItem('verPerfilCEdu', idCEdu);

    const tipoUsuario = localStorage.getItem('tipoUsuario');
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


let llenarContenido = () => {

    const filtros = FiltroCards.value;
    const cantFiltros = filtros.trim().length;

    //Limpiamos antes de añadir los cards:
    CardsCentros.innerHTML = '';

    elContenedor.forEach(obj => {

        if (cantFiltros < 1 || compararStrings(filtros, obj['nombre'], false)) {

            let card = document.createElement('div');

            let centro_nombre = document.createElement('h1');
            centro_nombre.innerHTML = 'Nombre: ' + obj['nombre'];

            let telefono = document.createElement('span');
            telefono.innerHTML = 'Teléfono: ' + obj['telefono'];

            let correo = document.createElement('span');
            correo.innerHTML = 'Correo: ' + obj['correo'];

            let provincia = document.createElement('span');
            provincia.innerHTML = 'Provincia: ' + obj['provincia'];

            let direccion = document.createElement('span');
            direccion.innerHTML = 'Dirección: ' + obj['direccion'];

            let fechaSolicitud = document.createElement('p');

            fechaSolicitud.innerHTML = 'Fecha de solicitud: ' + obj['solicitudFechaCorta'];


            // Obtenemos la cantidad de "días hábiles" que lleva pendiente de aprobación.
            let diasSolicitud = document.createElement('p');

            if (obj['solicitudDiasHabiles'] > 3) {
                diasSolicitud.innerHTML = 'Días hábiles pendientes: <span style="color:#ED4C67;">' + obj['solicitudDiasHabiles'] + '</span>';
            } else {
                diasSolicitud.innerHTML = 'Días pendientes: ' + obj['solicitudDiasHabiles'];
            }

            let verMas = document.createElement('a');
            verMas.addEventListener('click', () => {
                irAlPerfil(obj['_id']);
            }, false);
            verMas.innerHTML = '<i class="fas fa-id-card"></i>';

            card.appendChild(centro_nombre);
            card.appendChild(telefono);
            card.appendChild(correo);
            card.appendChild(provincia);
            card.appendChild(direccion);
            card.appendChild(fechaSolicitud);
            card.appendChild(diasSolicitud);
            card.appendChild(verMas);

            CardsCentros.appendChild(card);

        };
    });
};

let cargarCEdu = () => {
    listarCEdu_sin_aprobar((pSuccess, pMessage) => {
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

window.onload = () => {
    cargarCEdu();
};

