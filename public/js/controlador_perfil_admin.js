'use strict';

const CardsAdmin = document.querySelector('#cards_admin');
const FiltroCards = document.querySelector('#filtrar_cards');
const has = Object.prototype.hasOwnProperty;

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
    CardsAdmin.innerHTML = '';

    let encontroResultados = false;

    elContenedor.forEach(obj => {

        if (cantFiltros < 1 || combux.contiene(filtros, obj['nombre'])) {

            encontroResultados = true;

            let card = document.createElement('div');
            card.classList.add('contenedor_cards_principal');

            let contenedor_card = document.createElement('div');
            contenedor_card.classList.add('contenedor_dato');


            let centro_nombre = document.createElement('h1');
            centro_nombre.innerHTML = '<span>' + obj['nombre'] + '</span>';


            let diasSolicitud = '';
            if (parseInt(obj['solicitudDiasHabiles'], 10) > 3) {
                diasSolicitud = '<span style="color:#ED4C67; font-weight:600;">' + obj['solicitudDiasHabiles'] + '</span>';
            } else {
                diasSolicitud = '<span>' + obj['solicitudDiasHabiles'] + '</span>';
            }

            let listaDetallada = document.createElement('table');
            listaDetallada.style = 'border: none;';
            const objListaDetallada = [
                { "dt": "Teléfono:", "dd": obj['telefono'] },
                { "dt": "Correo electrónico:", "dd": obj['correo'] },
                { "dt": "Provincia:", "dd": obj['provincia'] },
                { "dt": "Dirección:", "dd": obj['direccion'] },
                { "dt": "Fecha de solicitud:", "dd": obj['solicitudFechaCorta'] },
                { "dt": "Días hábiles pendientes:", "dd": diasSolicitud }
            ];

            const cantListaDetallada = Object.keys(objListaDetallada).length;
            if (cantListaDetallada > 0) {
                let elBody = document.createElement('tbody');
                let key;
                for (key in objListaDetallada) {
                    if (!has.call(objListaDetallada, key)) continue;
                    const obj2 = objListaDetallada[key];

                    let elTr = document.createElement('tr');
                    elTr.innerHTML = '<td style="text-align: right; font-weight:600;vertical-align: top;">' + obj2.dt + '</td>' +
                        '<td style="padding-left:15px;vertical-align: bottom;">' + obj2.dd + '</td>';
                    elBody.appendChild(elTr);
                }

                listaDetallada.appendChild(elBody);
            }


            let verMas = document.createElement('p');
            verMas.style = 'text-align:right; width:100%;';
            let verMas_a = document.createElement('a');
            verMas_a.addEventListener('click', () => {
                irAlPerfil(obj['_id']);
            }, false);
            verMas_a.innerHTML = 'Ver más...';
            verMas.appendChild(verMas_a);


            let contenedorBotones = document.createElement('div');
            contenedorBotones.classList.add('contenedor_btn_cards');

            let btn_aprobar = document.createElement('button');
            btn_aprobar.classList.add('btn_cards');
            btn_aprobar.classList.add('btn_cards--celeste');
            btn_aprobar.type = 'button';
            btn_aprobar.innerHTML = '<i class="fas fa-plus-circle"></i> Aprobar';
            btn_aprobar.dataset.idCEdu = obj['_id'];

            btn_aprobar.addEventListener('click', function () {
                const elId = this.dataset.idCEdu;
                Swal.fire({
                    title: '¿Está seguro que desea aprobar el centro educativo?',
                    text: 'Esta acción no se puede revertir',
                    type: 'question',
                    showCancelButton: true,
                    confirmButtonText: '¡Sí, estoy seguro!',
                    cancelButtonText: 'Cancelar'
                }).then(async res => {
                    if (res.value) {
                        const fueAprobado = await aprobar_cedu(elId, true);
                        if (fueAprobado === true) {
                            cargarPagina();
                        }
                    } else {
                        return false;
                    }
                });
            });


            let btn_rechazar = document.createElement('button');
            btn_rechazar.classList.add('btn_cards');
            btn_rechazar.type = 'button';
            btn_rechazar.innerHTML = '<i class="fas fa-minus-circle"></i> Rechazar';
            btn_rechazar.dataset.idCEdu = obj['_id'];

            btn_rechazar.addEventListener('click', function () {
                const elId = this.dataset.idCEdu;
                Swal.fire({
                    title: '¿Está seguro que desea rechazar el centro educativo?',
                    text: 'Esta acción no se puede revertir',
                    type: 'question',
                    showCancelButton: true,
                    confirmButtonText: '¡Sí, estoy seguro!',
                    cancelButtonText: 'Cancelar'
                }).then(async res => {
                    if (res.value) {
                        const fueRechazado = await aprobar_cedu(elId, false);
                        if (fueRechazado === true) {
                            cargarPagina();
                        }
                    } else {
                        return false;
                    }
                });
            });



            let espacioVacio = document.createElement('span');
            espacioVacio.innerHTML = '&nbsp;&nbsp;';

            contenedorBotones.appendChild(btn_aprobar);
            contenedorBotones.appendChild(espacioVacio);
            contenedorBotones.appendChild(btn_rechazar);

            contenedor_card.appendChild(listaDetallada);
            contenedor_card.appendChild(contenedorBotones);
            contenedor_card.appendChild(verMas);

            card.appendChild(centro_nombre);
            card.appendChild(contenedor_card);
            CardsAdmin.appendChild(card);

        }
    });

    if (encontroResultados === false) {
        CardsAdmin.innerHTML = '<a style="margin:0 auto; text-align:center;text-decoration: none;" href="javascript:void(0);"><h2 style="color: #cdcdcd;">¡No se encontraron resultados!</h2></a>';
    }
};

let cargarPagina = () => {

    CardsAdmin.innerHTML = '<a style="margin:0 auto; text-align:center;text-decoration: none;" href="javascript:void(0);"><h2 style="color: #007bff;">Cargando...</h2></a>';

    listarCEdu_sin_aprobar((pSuccess, pMessage) => {
        if (pSuccess) {
            if ('object' == typeof pMessage) {

                FiltroCards.value = '';
                FiltroCards.addEventListener('keyup', llenarContenido);
                elContenedor = pMessage;
                llenarContenido();

            } else {
                CardsAdmin.innerHTML = '';
                console.error(pMessage);
            }
        } else {
            CardsAdmin.innerHTML = '<h4>' + pMessage + '</h4>';
            console.error(pMessage);
        }
    });
};



window.onload = () => {
    cargarPagina();
    if (FiltroCards) {
        FiltroCards.select();
        FiltroCards.focus();
    }
};

