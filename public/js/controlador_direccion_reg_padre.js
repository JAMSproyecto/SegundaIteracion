'use strict';

const select_provincias = document.querySelector('#slt_provincias');
const select_cantones = document.querySelector('#slt_cantones');
const select_distritos = document.querySelector('#slt_distritos');

let llenar_provincias = () =>{
	select_provincias.innerHTML = '<option disabled selected value="">Seleccione una provincia...</option>';
	select_cantones.innerHTML = '<option disabled selected value="">Seleccione un cant&oacute;n...</option>';
	select_distritos.innerHTML = '<option disabled selected value="">Seleccione un distrito...</option>';
	
    for(let i = 0; i < provincias.length; i++){
        let nuevaOpcion = new Option(provincias[i]['nombre']);
        nuevaOpcion.value = provincias[i]['idProvincia'];
        select_provincias.appendChild(nuevaOpcion);
    }
};
let llenar_cantones = () =>{
    let provincia = select_provincias.value;
    select_cantones.innerHTML = '<option disabled selected value="">Seleccione un cant&oacute;n...</option>';
	select_distritos.innerHTML = '<option disabled selected value="">Seleccione un distrito...</option>';
    for(let i = 0; i < cantones.length; i++){
        if(provincia == cantones[i]['Provincia_idProvincia']){
            let nuevaOpcion = new Option(cantones[i]['nombre']);
            nuevaOpcion.value = cantones[i]['idCanton'];
            select_cantones.appendChild(nuevaOpcion);
        }
        
    }
};

let llenar_distritos = () =>{
    let cantones = select_cantones.value;
    select_distritos.innerHTML = '<option disabled selected value="">Seleccione un distrito...</option>';
    
    for(let i = 0; i < distritos.length; i++){
        if(cantones == distritos[i]['Canton_idCanton']){
            let nuevaOpcion = new Option(distritos[i]['nombre']);
            nuevaOpcion.value = distritos[i]['idDistrito'];
            select_distritos.appendChild(nuevaOpcion);
        }
        
    }
};

select_provincias.addEventListener('change', llenar_cantones);
select_cantones.addEventListener('change', llenar_distritos);

llenar_provincias();
