'use strict';

const TxtEditorComentario = document.querySelector('#txtEditorComentario');
const TblAddComentario = document.querySelector('#tblAddComentario');
const BtnComentar = document.querySelector('#btnComentar');
const BtnRegistrarCita = document.querySelector('#btnRegistrarCita');

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
            document.querySelector('#tabla__actividades').appendChild(actividad);
        });
	} else {
		console.log(actividades);
	}


};


let iniciarComentarios = () => {
	$('#txtEditorComentario').jqte({placeholder: "Agregar comentario...", status : true, color: false, source: false});
};

let cargarComentarios = (pId) => {
	
};

let agregarComentario = () => {
	const texto = $('#txtEditorComentario').val();
	console.log(texto);
	if(texto.length >0){
	const textoComentado = he.encode(texto); 
	alert(textoComentado);
	}else{
		TxtEditorComentario.focus();
	}
};


BtnRegistrarCita.addEventListener('click', () =>{
    location.replace("registrar_cita.html");
}, false);


window.onload = () => {
    let id;

    switch (localStorage.getItem("tipoUsuario").toLowerCase()) {
        case 'superadmin':
            id = localStorage.getItem('verPerfilCEdu');
			TblAddComentario.style = 'display:none;';
            break;
			
        case 'centroeducativo':
            id = localStorage.getItem('id');
			TblAddComentario.style = 'display:none;';
            break;
			
        case 'padrefamilia':
            id = localStorage.getItem('verPerfilCEdu');
			iniciarComentarios();
			if(BtnComentar){
			    BtnComentar.addEventListener('click', agregarComentario, false);
			}
            break;

        default:
            break;
    }
	
    if ('undefined' == typeof id || null === id) {
        throw new Error('Error al cargar el perfil: El identificador no puede estar vacio');
    }
	
    const perfil = get_obtenerPerfil(id);

	if('undefined' !== typeof perfil.nombre){
	    document.querySelector('.titulo_centro_educativo').innerHTML = perfil.nombre;
    }

    crearCalendario(id);
    crearActividades();


	cargarComentarios(id)
	
	
	
};

