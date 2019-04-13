'use strict';

const botonCerrarSesion = document.querySelector('#boton_cerrar');
const lblNombreUsuario = document.querySelector('#lblNombreUsuario');
const enlaces = document.querySelectorAll('#menu-derecho a');

let conectado = localStorage.getItem('conectado');

let cerrar_sesion = (esAuto) => {
    localStorage.clear();
    if ('boolean' == typeof esAuto && esAuto === true) {
        localStorage.setItem('quienIniciaSesion', encodeURIComponent(window.location.href));
    }
    console.log('Redireccionando al inicio de sesión');
    location.replace('inicio_sesion.html');
};

let controlar_sesion = () => {
    if (null !== conectado && ('true' === conectado || true === conectado)) {

        let tipoUsuario = localStorage.getItem('tipoUsuario');

        if (lblNombreUsuario) {
            lblNombreUsuario.innerHTML = localStorage.getItem('nombreUsuario') || '';
        }

        switch (tipoUsuario.toLowerCase()) {
            case 'superadmin':

                localStorage.setItem('padreDesdeAdmin', true);

                break;
            case 'centroeducativo':
                if (lblNombreUsuario) {
                    lblNombreUsuario.innerHTML = localStorage.getItem('nombreInstitucion') || '';
                }

                break;
            case 'padrefamilia':


                localStorage.setItem('padreDesdeAdmin', false);

                if (enlaces) {
                    enlaces[0].classList.add('ocultar');
                    enlaces[1].classList.add('ocultar');
                    enlaces[2].classList.add('ocultar');
                }

                break;

            default:
                console.log('Usuario desconocido. Cerrando sesión');
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

