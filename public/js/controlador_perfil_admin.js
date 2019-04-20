'use strict';

const cards_centros = 

let cargarCEdu = () => {

    listarCEdu((pSuccess, pMessage) => {
        if (pSuccess) {
            if ('object' == typeof (pMessage)) {
                    pMessage.forEach(obj => {
                            let card = document.createElement('div');
                            
                            let centro_nombre = document.createElement('h1');
                            centro_nombre.innerHTML = 'Nombre:' + obj['nombre'];

                            let telefono = document.createElement('span');
                            telefono.innerHTML = 'Teléfono: ' + obj['telefono'];

                            let correo = document.createElement('span');
                            correo.innerHTML = 'Correo: ' + obj['correo'];

                            let provincia = document.createElement('span');
                            let direccion = document.createElement('span');
                            obj['direccion'].forEach(obj2 => {
                                    provincia.innerHTML = 'Provincia: ' + obtenerProvinciaPorID(obj2['idProvincia']);
                                    direccion.innerHTML = 'Dirección: ' + obj2['sennas'];
                            });

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
                                card.appendChild(verMas);
                                

                            cards_centros.appendChild(card);
                    });

            }
    }
});
};

window.onload = () => {
    cargarCEdu();
};