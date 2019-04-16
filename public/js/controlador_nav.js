'use strict';

const botonCerrarSesion = document.querySelector('#boton_cerrar');
const lblNombreUsuario = document.querySelector('#lblNombreUsuario');
const BtnMenuPalanca = document.querySelector('#btnMenuPalanca');
const MenuOpciones = document.querySelector('#menuOpciones');
let MenuOpcionesActivo = false;

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

let fnBtnMenuPalanca = () => {
	if (MenuOpcionesActivo) {
		MenuOpciones.style = 'display: none;';
		MenuOpcionesActivo = false;
	} else {
		MenuOpciones.style = 'display: block;';
		MenuOpcionesActivo = true;
	}
};


let menuNavVisible = (abierto) => {
	if(true === abierto){
		document.getElementById("mySidenav").style.width = "350px";
   // document.getElementById("main").style.marginLeft = "350px";
	}else{
		 document.getElementById("mySidenav").style.width = "0";
    //document.getElementById("main").style.marginLeft= "0";
	}
};


controlar_navegacion();

if (botonCerrarSesion) {
    botonCerrarSesion.addEventListener('click', cerrar_sesion, false);
}

if (BtnMenuPalanca) {
	BtnMenuPalanca.addEventListener('click', fnBtnMenuPalanca, false);
}



