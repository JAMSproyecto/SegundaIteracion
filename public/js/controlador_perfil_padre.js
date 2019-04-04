'use strict';

const nombre_padre = document.querySelector('#nombre_completo_padre');
const correo_electronico_padre = document.querySelector('#correo_padre');
const telefono_padre = document.querySelector('#telefono_padre');
const identificacion_padre = document.querySelector('#identificacion_padre');
const provincia_padre = document.querySelector('#provincia_padre');
const canton_padre = document.querySelector('#canton_padre');
const distrito_padre = document.querySelector('#distrito_padre');

let id_padre = sessionStorage.getItem('idBuscarPadre');

let infoPadre = buscar_padre(id_padre);
if(infoPadre && Object.keys(infoPadre).length > 0){


        nombre_padre.innerHTML = infoPadre['nombre'];
        correo_electronico_padre.innerHTML = infoPadre['correo'];
        telefono_padre.innerHTML = infoPadre['numCel'];
        identificacion_padre.innerHTML = infoPadre['numIdentificacion'];
        provincia_padre.innerHTML = infoPadre['provincia'];
        canton_padre.innerHTML = infoPadre['canton'];
        distrito_padre.innerHTML = infoPadre['distrito']; 
        } else {
            console.log(infoPadre[0]);
        }
        
        