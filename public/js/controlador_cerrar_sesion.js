'use strict';

const Boton_Cerrar = document.querySelector('#boton_cerrar');

let cerrar_Sesion = () => {
    localStorage.clear();
    window.location.replace("inicio_sesion.html");
};

Boton_Cerrar.addEventListener('click', cerrar_Sesion);
