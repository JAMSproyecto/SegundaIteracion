'use strict';

const botonCerrarSesion = document.querySelector('#boton_cerrar');
const lblNombreUsuario = document.querySelector('#lblNombreUsuario');
const enlaces = document.querySelectorAll('#menu-derecho a');

let conectado = sessionStorage.getItem('conectado');

let cerrar_sesion = (esAuto) => {
    sessionStorage.clear();
    if ('boolean' == typeof esAuto && esAuto === true) {
        sessionStorage.setItem('quienIniciaSesion', encodeURIComponent(window.location.href));
    }
    console.log('Redireccionando al inicio de sesión');
    location.replace('inicio_sesion.html');
};

let controlar_sesion = () => {
    if (null !== conectado && ('true' === conectado || true === conectado)) {

        let tipoUsuario = sessionStorage.getItem('tipoUsuario');

        if (lblNombreUsuario) {
            lblNombreUsuario.innerHTML = sessionStorage.getItem('nombreUsuario') || '';
        }

        switch (tipoUsuario.toLowerCase()) {
            case 'superadmin':

                sessionStorage.setItem('padreDesdeAdmin', true);

                break;
            case 'centroeducativo':

                break;
            case 'padrefamilia':


                sessionStorage.setItem('padreDesdeAdmin', false);

                if (enlaces) {
                    enlaces[0].classList.add('ocultar');
                    enlaces[1].classList.add('ocultar');
                    enlaces[2].classList.add('ocultar');
                }

                break;

            default:
                console.log('Cerrando sesión porque el tipo de usuario es desconocido');
                cerrar_sesion(true);
                break;
        }

    } else {
        console.log('Acceso restringido, no está conectado');
        cerrar_sesion(true);
    }
};

controlar_sesion();

if (botonCerrarSesion) {
    botonCerrarSesion.addEventListener('click', cerrar_sesion, false);
}

