'use strict';

const contenedor_lista_centros = document.querySelector('#contenedor_lista_centros');
const FiltroCards = document.querySelector('#filtrar_cards');
const has = Object.prototype.hasOwnProperty;

const HtmlEstrellaAmarilla = '<i class="fas fa-star" style="color: rgb(255, 203, 49);"></i>';
const HtmlEstrellaGris = '<i class="far fa-star" style="color: rgb(50, 50, 50);"></i>';


let contenidoContenedor = '';
let elContenedor = [];


let obtenerHtmlEstrellas = (pCantidad) => {
    let TOP = 5, i = 0, resultado = '', laCantidad = parseInt('' + pCantidad, 10);
    for (; i < TOP; ++i) {
        if (i < laCantidad) {
            resultado += HtmlEstrellaAmarilla;
        } else {
            resultado += HtmlEstrellaGris;
        }
    }
    return resultado;
};


let ordenarPor = (path, reverse, primer, then) => {
    let get = function (obj, path) {
        if (path) {
            path = path.split('.');
            let i = 0;
            let len = path.length - 1;
            for (; i < len; i++) {
                obj = obj[path[i]];
            }
            return obj[path[len]];
        }
        return obj;
    },
        prime = function (obj) {
            return primer ? primer(get(obj, path)) : get(obj, path);
        };

    return function (a, b) {
        let A = prime(a),
            B = prime(b);

        return (
            (A < B) ? -1 :
                (A > B) ? 1 :
                    (typeof then === 'function') ? then(a, b) : 0
        ) * [1, -1][+!!reverse];
    };
};

let llenarContenido = () => {

    contenedor_lista_centros.innerHTML = contenidoContenedor;
    const listaPrivados = document.querySelector('#lista_privados');
    const listaPublicos = document.querySelector('#lista_publicos');

    const filtros = FiltroCards.value;
    const cantFiltros = filtros.trim().length;
    let encontroResultados = false;

    const elTop = 10;
    let i_pub = 0;
    let i_pri = 0;

    elContenedor.forEach(obj => {
        if (cantFiltros < 1 || combux.contiene(filtros, obj['nombre'])) {

            encontroResultados = true;

            let card = document.createElement('div');
            card.classList.add('contenedor_cards_principal');

            let contenedor_card = document.createElement('div');

            let centro_nombre = document.createElement('h1');
            centro_nombre.innerHTML = '<span>' + obj['nombre'] + '</span>';



            let contenedorListaDetallada = document.createElement('div');
            //contenedorListaDetallada.style = 'box-sizing: border-box; display: block; overflow-x: auto; -webkit-overflow-scrolling: touch; -ms-overflow-style: -ms-autohiding-scrollbar; padding: 0 0px;';

            let listaDetallada = document.createElement('table');
            listaDetallada.style = 'border: 0px solid transparent;overflow-x: hidden;width: 100%;';
            const objListaDetallada = [
                { "dt": "Teléfono:", "dd": obj['telefono'] },
                { "dt": "Correo electrónico:", "dd": obj['correo'] },
                { "dt": "Provincia:", "dd": obj['provincia'] },
                { "dt": "Dirección:", "dd": obj['direccion'] },
                { "dt": "Calificación:", "dd": '<span class="plataformaEstrella">' + obtenerHtmlEstrellas(obj['calificacionMEP']) + '</span>' }
            ];


            const cantListaDetallada = Object.keys(objListaDetallada).length;
            if (cantListaDetallada > 0) {
                let elBody = document.createElement('tbody');
                let key;
                for (key in objListaDetallada) {
                    if (!has.call(objListaDetallada, key)) continue;
                    const obj2 = objListaDetallada[key];

                    let elTr = document.createElement('tr');
                    elTr.innerHTML = '<td style="text-align: right; font-weight:600;vertical-align: top;margin:auto;width:auto;"><p>' + obj2.dt + '</p></td>' +
                        '<td style="padding-left:5px;vertical-align: bottom;"><p>' + obj2.dd + '</p></td>';
                    elBody.appendChild(elTr);
                }

                listaDetallada.appendChild(elBody);
            }

            contenedorListaDetallada.appendChild(listaDetallada);

            contenedor_card.appendChild(contenedorListaDetallada);

            card.appendChild(centro_nombre);
            card.appendChild(contenedor_card);
            //--------------------------------------------------------------------

            if (combux.contiene('Publica', obj['tipoInstitucion'])) {
                if (i_pub < elTop) {
                    listaPublicos.appendChild(card);
                    ++i_pub;
                }
            } else {
                if (i_pri < elTop) {
                    listaPrivados.appendChild(card);
                    ++i_pri;
                }
            }

        }
    });

    if (encontroResultados === false) {
        contenedor_lista_centros.innerHTML = '<a style="margin:0 auto; text-align:center;text-decoration: none;" href="javascript:void(0);"><h2 style="color: #cdcdcd;">¡No se encontraron resultados!</h2></a>';
    }

};

let cargarPagina = () => {

    contenidoContenedor = contenedor_lista_centros.innerHTML;
    contenedor_lista_centros.innerHTML = '<a style="margin:0 auto; text-align:center;text-decoration: none;" href="javascript:void(0);"><h2 style="color: #007bff;">Cargando...</h2></a>';


    listarCEdu((pSuccess, pMessage) => {

        if (pSuccess) {
            if ('object' == typeof pMessage) {

                FiltroCards.value = '';
                FiltroCards.addEventListener('keyup', llenarContenido);
                elContenedor = pMessage;

                elContenedor.sort(ordenarPor('calificacionMEP', true, null));

                llenarContenido();

            } else {
                contenedor_lista_centros.innerHTML = '';
                console.error(pMessage);
            }
        } else {
            contenedor_lista_centros.innerHTML = '<h4>' + pMessage + '</h4>';
            console.error(pMessage);
        }
    });
};


window.onload = () => {
    cargarPagina();
};

