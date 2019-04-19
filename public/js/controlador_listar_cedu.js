'use strict';

const tablaCuerpo = document.querySelector('#tblCentrosEducativos tbody');

let cargarDataTable = () => {

    //Nota: en esta función (cargarDataTable) no se utilizan funciones de flecha al propio para poder usar this.

    $('#tblCentrosEducativos thead tr:eq(1) th:not(.sinFiltro)').each(function () {
        let titulo = $(this).text();
        $(this).html('<input type="text" class="icon-buscar" placeholder="" value="" >');
    });

    let tablaDatos = $('#tblCentrosEducativos').DataTable({
        language: {
            sSearch: 'Filtrar',
            sZeroRecords: 'No se encontraron centros educativos filtrados',
            sEmptyTable: 'No se encontraron centros educativos'
        },
        paging: false,
        orderCellsTop: true,
        pagingType: 'full_numbers',
        ordering: true,
        iDisplayLength: -1,
        bDestroy: false,
        bFilter: true,
        searching: true,
        bSort: true,
        order: [[4, 'desc'], [3, 'desc']],
        dom: '<f><t>'
    });

    $('#tblCentrosEducativos thead').on('keyup', '.icon-buscar', function () {
        tablaDatos
            .column($(this).parent().index())
            .search(this.value)
            .draw();
    });



};

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
            if ('object' == typeof (pMessage)) {
                pMessage.forEach(obj => {
                    
                    let card = document.createElement('div');
                    let card_contenedor = document.createElement('div');


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


                    //Estoy trabajando en mostrar la calificacion del MEP en el card. Marlon 4/18
                    let calificacionMep = document.createElement('span');
                    let idCentro = obj['_id'];
                    let obtenerCalificacion = listar_calificacion_CEdu(idCentro);
                    console.log(obtenerCalificacion);


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
                    card_contenedor.appendChild(card);

                    cards_centros.appendChild(card_contenedor);
                });

            }
        }
    });
};

window.onload = () => {
    cargarCEdu();
};
