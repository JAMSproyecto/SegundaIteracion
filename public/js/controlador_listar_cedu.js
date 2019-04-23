'use strict';

const CardsCentros = document.querySelector('#cards_centros');
<<<<<<< HEAD
<<<<<<< HEAD
const filtroCards = document.querySelector('#filtrar_cards');
//Agregado por Marlon. 4/22
const selectEtiquetas = document.querySelector('#select_etiquetas')
const tipoUsuario = localStorage.getItem('tipoUsuario');
=======
>>>>>>> parent of 4477e80... Merge branch 'master' of https://github.com/JAMSproyecto/SegundaIteracion
=======
>>>>>>> parent of 4477e80... Merge branch 'master' of https://github.com/JAMSproyecto/SegundaIteracion

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
    for (let i = 0; i < listaEtiquetas.length; i++) {
        let opcionEtiqueta = document.createElement('option');
        opcionEtiqueta.innerHTML = listaEtiquetas[i]['nombre'];
        selectEtiquetas.appendChild(opcionEtiqueta);
    };   
};

let filtrarPorEtiqueta = () => {


};

//Fin agregado por Marlon. 4/22




let cargarCEdu = () => {

    listarCEdu((pSuccess, pMessage) => {

        if (pSuccess) {
            if ('object' == typeof pMessage) {

                //Limpiamos antes de añadir los cards:
                CardsCentros.innerHTML = '';

                pMessage.forEach(obj => {
                    let card = document.createElement('div');

<<<<<<< HEAD
<<<<<<< HEAD
    
                    if (obj['nombre'].toLowerCase().includes(filtros.toLowerCase())) {

                        let card = document.createElement('div');



                        let centro_nombre = document.createElement('h1');
<<<<<<< HEAD
                        centro_nombre.innerHTML = obj['nombre'];


                        let telefono = document.createElement('p');
=======
                        centro_nombre.innerHTML = 'Nombre: ' + obj['nombre'];
    
                        let telefono = document.createElement('span');
<<<<<<< HEAD
>>>>>>> parent of 16d022a... Merge branch 'master' of https://github.com/JAMSproyecto/SegundaIteracion
=======
>>>>>>> parent of 16d022a... Merge branch 'master' of https://github.com/JAMSproyecto/SegundaIteracion
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


                    };

                    
=======
=======
>>>>>>> parent of 4477e80... Merge branch 'master' of https://github.com/JAMSproyecto/SegundaIteracion


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
<<<<<<< HEAD
>>>>>>> parent of 4477e80... Merge branch 'master' of https://github.com/JAMSproyecto/SegundaIteracion
=======
>>>>>>> parent of 4477e80... Merge branch 'master' of https://github.com/JAMSproyecto/SegundaIteracion
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
<<<<<<< HEAD
<<<<<<< HEAD

filtroCards.addEventListener('keyup', cargarCEdu);
selectEtiquetas.addEventListener('blur', filtrarPorEtiqueta);//Me falta hacer la función que filtra
=======
>>>>>>> parent of 4477e80... Merge branch 'master' of https://github.com/JAMSproyecto/SegundaIteracion
=======
>>>>>>> parent of 4477e80... Merge branch 'master' of https://github.com/JAMSproyecto/SegundaIteracion
