'use strict';

const listaPrivados = document.querySelector('#lista_privados');
const listaPublicos = document.querySelector('#lista_publicos');
const tipoUsuario = localStorage.getItem('tipoUsuario');

let elContenedor = [];


let llenarContenido = () => {

    //Limpiamos antes de añadir los cards:
    listaPrivados.innerHTML = '';
    listaPublicos.innerHTML = '';

    elContenedor.forEach(obj => {
        if (obj['tipoInstitucion'] == 'Pública') {

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
    
            card.appendChild(centro_nombre);
            div_card.appendChild(telefono);
            div_card.appendChild(correo);
            div_card.appendChild(provincia);
            div_card.appendChild(direccion);
    
            div_card.appendChild(calificacionMEP);
            div_card.appendChild(calificacionPadres);
    
            card.appendChild(div_card);
            listaPublicos.appendChild(card);

        } else {
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
    
            card.appendChild(centro_nombre);
            div_card.appendChild(telefono);
            div_card.appendChild(correo);
            div_card.appendChild(provincia);
            div_card.appendChild(direccion);
    
            div_card.appendChild(calificacionMEP);
            div_card.appendChild(calificacionPadres);
    
            card.appendChild(div_card);
            listaPrivados.appendChild(card);
        }
    });
};

let cargarCEdu = () => {

    listarCEdu((pSuccess, pMessage) => {

        if (pSuccess) {
            if ('object' == typeof pMessage) {
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

