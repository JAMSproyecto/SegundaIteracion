'use strict';

const CardsCentros = document.querySelector('#cards_centros');
const filtroCards = document.querySelector('#filtrar_cards');
//Agregado por Marlon. 4/22
const selectEtiquetas = document.querySelector('#select_etiquetas')
const tipoUsuario = localStorage.getItem('tipoUsuario');

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


//Agregado por Marlon. 4/22
let llenarSelectEtiquetas = () => {
    let listaEtiquetas = listar_etiquetas();
    listaEtiquetas.innerHTML = '';
    let opcionEtiqueta = document.createElement('option');
    opcionEtiqueta.innerHTML = '';
    selectEtiquetas.appendChild(opcionEtiqueta);
    for (let i = 0; i < listaEtiquetas.length; i++) {
        let opcionEtiqueta = document.createElement('option');
        opcionEtiqueta.innerHTML = listaEtiquetas[i]['nombre'];
        selectEtiquetas.appendChild(opcionEtiqueta);
    };
};
//Fin agregado por Marlon. 4/22

let cargarCEdu = () => {

    listarCEdu((pSuccess, pMessage) => {

        if (pSuccess) {
            if ('object' == typeof pMessage) {

                let filtros = filtroCards.value;
                //Limpiamos antes de añadir los cards:
                CardsCentros.innerHTML = '';

              

                pMessage.forEach(obj => {

                        if (obj['etiquetas'].includes(selectEtiquetas.value)) {
                            if (obj['nombre'].toLowerCase().includes(filtros.toLowerCase())) {

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
                                div_card.appendChild(verMas);
        
                                card.appendChild(div_card);
                                CardsCentros.appendChild(card);
        
        
                            };
                        };

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

    llenarSelectEtiquetas();

};

filtroCards.addEventListener('keyup', cargarCEdu);
selectEtiquetas.addEventListener('blur', cargarCEdu);
