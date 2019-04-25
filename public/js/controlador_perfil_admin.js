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

        if (cantFiltros < 1 || combux.contiene(filtros, obj['nombre'])) {

            let card = document.createElement('div');
            card.classList.add('contendedor_card_principal');

            let contenedor_card = document.createElement('div');
            contenedor_card.classList.add('contendedor_cards');

            let div_dato = document.createElement('div');
            div_dato.classList.add('contenedor_dato');

            let centro_nombre = document.createElement('h1');
            centro_nombre.innerHTML = obj['nombre'];

            let telefono = document.createElement('p');
    telefono.innerHTML = '<strong class="descripcion">Teléfono: </strong>' + obj['telefono'];

            let correo = document.createElement('p');
            correo.innerHTML = '<strong class="descripcion">Correo electrónico: </strong>' + '<p>' + obj['correo'] + '</p>';

            let provincia = document.createElement('p');
            provincia.innerHTML = '<strong class="descripcion">Provincia: </strong>' + '<p>' + obj['provincia'] + '</p>';

            let direccion = document.createElement('p');
            direccion.innerHTML = '<strong class="descripcion">Dirección: </strong>' + '<p>' + obj['direccion'] + '</p>';

            let fechaSolicitud = document.createElement('p');

            fechaSolicitud.innerHTML = '<strong class="descripcion">Fecha de solicitud: </strong>' + '<p>' + obj['solicitudFechaCorta'] + '</p>';


            // Obtenemos la cantidad de "días hábiles" que lleva pendiente de aprobación.
            let diasSolicitud = document.createElement('p');

            if (obj['solicitudDiasHabiles'] > 3) {
                diasSolicitud.innerHTML = '<strong class="descripcion">Días hábiles pendientes: </strong>' + '<p style="color:#ED4C67;">' + obj['solicitudDiasHabiles'] + '</p>';
            } else {
                diasSolicitud.innerHTML = '<strong class="descripcion">Días hábiles pendientes: </strong>' + '<p>' + obj['solicitudDiasHabiles'] + '</p>';
            }

            let verMas = document.createElement('a');
            verMas.addEventListener('click', () => {
                irAlPerfil(obj['_id']);
            }, false);
            verMas.innerHTML = '<i class="fas fa-id-card"></i>';

            let contenedorBtnAprobar = document.createElement('p');

            //se crea el boton para aprobar el centro educativo Creado por Johan 
            let btn_aprobar = document.createElement('button');
            btn_aprobar.classList.add('btn');
            btn_aprobar.classList.add('btn--celeste');
            btn_aprobar.type = 'button';
            btn_aprobar.textContent = 'Aprobar';
            btn_aprobar.dataset.idCEdu = obj['_id'];

            //se llama la función para aprobar el centro educativo 
            //con un seewtAlert para confimar si quiere aprobarlo 
            btn_aprobar.addEventListener('click', function () {
                const elId = this.dataset.idCEdu;
                Swal.fire({
                    title: '¿Está seguro que desea aprobar el centro educativo?',
                    text: "Ésta acción no se puede revertir",
                    type: 'question',
                    showCancelButton: true,
                    confirmButtonText: '¡Sí, estoy seguro!',
                    cancelButtonText: 'Cancelar'
                }).then(async res => {
                    if (res.value) {
                        const fueAprobado = await aprobar_cedu(elId);
                        if (fueAprobado === true) {
                            cargarCEdu();
                        }
                    } else {
                        return false;
                    }
                });
            });

            contenedorBtnAprobar.appendChild(btn_aprobar);
            contenedor_card.appendChild(div_dato);
            card.appendChild(centro_nombre);
            contenedor_card.appendChild(telefono);
            contenedor_card.appendChild(correo);
            contenedor_card.appendChild(provincia);
            contenedor_card.appendChild(direccion);
            contenedor_card.appendChild(fechaSolicitud);
            contenedor_card.appendChild(diasSolicitud);
            contenedor_card.appendChild(contenedorBtnAprobar);
            contenedor_card.appendChild(verMas);


            card.appendChild(contenedor_card);
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

