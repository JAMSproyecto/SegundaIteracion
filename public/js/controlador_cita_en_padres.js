'use strict';

const boton_registrar = document.querySelector('#btn_registrar');


let registrar_citas = (pId) =>{
    localStorage.getItem('verPerfilCEdu', pId);
    window.location.replace("registrar_cita.html");

};

boton_registrar.addEventListener('click', registrar_citas);