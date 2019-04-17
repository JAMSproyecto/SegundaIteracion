'use strict';

const TxtEditorComentario = document.querySelector('#txtEditorComentario');
const TblAddComentario = document.querySelector('#tblAddComentario');
const BtnComentar = document.querySelector('#btnComentar');

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


//Marlon. Agrego el calificar que funciona unicamente para las evaluaciones del MEP

const bloqueCalificacionMep = document.querySelector('#bloque_calificarMEP');


let listaRubrosMep = () => {


};

let calificarMEP = () => {

    let botonCalificarCentro = document.createElement('button');
    botonCalificarCentro.innerText = 'Calificar';
 
bloqueCalificacionMep.appendChild(botonCalificarCentro);

    botonCalificarCentro.addEventListener('click', function () {

        let rubros = listar_rubros();
        let rubrosActivos = [];
           for (let i = 0; i < rubros.length; i++){
            if (rubros[i]['estado'] == 'Activo'){
                rubrosActivos [i] = rubros[i];
            }
        }

        Swal.mixin({
            input: 'select',
            inputOptions: {
                1:1,
                2:2,
                3:3,
                4:4,
                5:5,
                6:6,
                7:7,
                8:8,
                9:9,
                10:10
            },
            confirmButtonText: 'Siguiente &rarr;',
            showCancelButton: true,
            progressSteps: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
          }).queue([  
        
            {
              title: rubrosActivos [0]['rubro']
            },
            {
                title: rubrosActivos [1]['rubro']
              },
              {
                title: rubrosActivos [2]['rubro']
              },
              {
                title: rubrosActivos [3]['rubro']
              },
              {
                title: rubrosActivos [4]['rubro']
              },
              {
                title: rubrosActivos [5]['rubro']
              },
              {
                title: rubrosActivos [6]['rubro']
              },
              {
                title: rubrosActivos [7]['rubro']
              },
              {
                title: rubrosActivos [8]['rubro']
              },
              {
                title: rubrosActivos [9]['rubro']
              },
   


          ]).then((result) => {
            if (result.value) {
let values = [];
values = result.value;
console.log(values);
                let sum = values.reduce((previous, current) => current += previous);
let avg = sum / values.length;
              Swal.fire({
                title: 'Calificación completada',
                html:
                  'El centro ha recibido una calificación total de:' + avg,
                confirmButtonText: 'Aceptar'
              })
            }
          })




      //  agregar_calificacion(this.dataset.id_calificacion);

       
      });

};

//Marlon. Fin del calificar MEP







window.onload = () => {
    let id;

    switch (localStorage.getItem("tipoUsuario").toLowerCase()) {
        case 'superadmin':
            id = localStorage.getItem('verPerfilCEdu');

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
    
    calificarMEP();
	
	
};

