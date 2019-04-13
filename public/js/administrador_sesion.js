'use strict';

let cerrar_sesion = (esAuto) => {
    localStorage.clear();
    if ('boolean' == typeof esAuto && esAuto === true) {
        localStorage.setItem('quienIniciaSesion', encodeURIComponent(window.location.href));
    }
    console.log('Redireccionando al inicio de sesión');
    location.replace('inicio_sesion.html');
};

//Función que se ejecuta de inmediato y comprueba el estado de la sesión:
(() => {
	let conectado = localStorage.getItem('conectado');
	if (null === conectado || 'false' === conectado || false === conectado) {
        console.log('Acceso restringido, no está conectado');
        cerrar_sesion(true);
    }
})();
