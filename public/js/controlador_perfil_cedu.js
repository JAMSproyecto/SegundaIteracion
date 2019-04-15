'use strict';

let crearActividades = () => {
    let actividades = listar_todas_actividades();

    if('object' == typeof actividades){
        actividades.forEach((e, index) => {
            let actividad = document.createElement('div');
            actividad.classList.add('actividad');
        
            let strong = document.createElement('strong');
            strong.classList.add('nombre__actividad');
        
            let fecha = document.createElement('p');
            fecha.classList.add('fecha__actividad');
        
            let hora = document.createElement('p');
            hora.classList.add('hora__actividad');
        
            strong.innerHTML = e.actividad;
            fecha.innerHTML = e.fecha;
            hora.innerHTML = `${e.hora_inicio} - ${e.finaliza}`;
            actividad.appendChild(strong);
            actividad.appendChild(fecha);
            actividad.appendChild(hora);
            document.querySelector('.contenedor__actividad').appendChild(actividad);
        });
	} else {
		console.log(actividades);
	}


};


let iniciarComentarios = () => {
	
};

let cargarComentarios = (pId) => {
	
};



window.onload = () => {
    let id;

    switch (localStorage.getItem("tipoUsuario").toLowerCase()) {
        case 'superadmin':
            id = localStorage.getItem('verPerfilCEdu');
            break;
			
        case 'centroeducativo':
            id = localStorage.getItem('id');
            break;
			
        case 'padrefamilia':
            id = localStorage.getItem('verPerfilCEdu');
            break;

        default:
            break;
    }
	
    if ('undefined' == typeof id || null === id) {
        throw new Error('Error al cargar el perfil: El identificador no puede estar vacio');
    }
	
    const perfil = get_obtenerPerfil(id);

	if(null !== perfil){
	    document.querySelector('.titulo_centro_educativo').innerHTML = perfil.nombre;
    }
    crearCalendario(id);
    crearActividades();

	iniciarComentarios();
	cargarComentarios(id)
	
	
	
};

