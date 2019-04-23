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
	const conectado = localStorage.getItem('conectado');
	if (null === conectado || 'false' === conectado || false === conectado) {
        console.log('Acceso restringido, no está conectado');
        cerrar_sesion(false);
    }else{
		const tiempoConexion = localStorage.getItem('tiempoConexion');
		if(null === tiempoConexion){
			cerrar_sesion(false);
		}else{
			
			const msAhora = (new Date()).getTime();
			const diferencia = msAhora - tiempoConexion;
			
			//1 hora = 3600000 milisegundos
			//1 MINUTO = 60000 milisegundos
			
			//Validamos que el usuario no tenga más de una hora de inactividad
			if(diferencia >=  3600000){
			    cerrar_sesion(false);
			}else{
			
				//Refrescamos la hora de acceso:
				localStorage.setItem('tiempoConexion', msAhora);
			}
		}
		
		
	}
})();
