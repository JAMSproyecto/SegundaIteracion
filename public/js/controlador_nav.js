'use strict';

const botonCerrarSesion = document.querySelector('#boton_cerrar');
const lblNombreUsuario = document.querySelector('#lblNombreUsuario');

let controlar_navegacion = () => {
    let tipoUsuario = localStorage.getItem('tipoUsuario') || '';

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

                break;

            default:
                console.log('Usuario desconocido. Cerrando sesión');
                cerrar_sesion(true);
                break;
        }
};

controlar_navegacion();

if (botonCerrarSesion) {
    botonCerrarSesion.addEventListener('click', cerrar_sesion, false);
}

