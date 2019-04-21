'use strict';

const CardsCentros = document.querySelector('#cards_centros');

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

let cargarCEdu = () => {

    listarCEdu((pSuccess, pMessage) => {

        if (pSuccess) {
            if ('object' == typeof pMessage) {

                //Limpiamos antes de añadir los cards:
                CardsCentros.innerHTML = '';

                pMessage.forEach(obj => {
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

                    let calificacionMEP = document.createElement('p');

                    if ('string' == typeof obj['calificacionMEP'] && obj['calificacionMEP'].length > 0) {
                        calificacionMEP.innerHTML = 'Calificación MEP: ' + obj['calificacionMEP'];
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
                    card.appendChild(calificacionMEP);
                    card.appendChild(verMas);


                    CardsCentros.appendChild(card);
                });

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
