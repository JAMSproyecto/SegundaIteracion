'use strict';

const TxtEditorComentario = document.querySelector('#txtEditorComentario');
const TblAddComentario = document.querySelector('#tblAddComentario');
const BtnComentar = document.querySelector('#btnComentar');
const bloqueCalificacionMep = document.querySelector('#bloque_calificarMEP');


let calificacionSeleccionada = 0;

let crearActividades = () => {
    let actividades = listar_todas_actividades();

    if ('object' == typeof actividades) {
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

let marcarEstrella = (event) => {
    let grupoEstrellas = document.querySelectorAll(".estrellas__cuerpo input");
      let checkCount = 0, i = 0, j = 0;
      for (i; i < grupoEstrellas.length; i++) {
        if (grupoEstrellas[i] == event.target) {
          checkCount = i + 1;
        }
      }
      for (j; j < checkCount; j++) {
        grupoEstrellas[j].checked = true;
      }
      let k = checkCount;
      for (k; k < grupoEstrellas.length; k++) {
        grupoEstrellas[k].checked = false;
      }
      calificacionSeleccionada = checkCount;
    };

let cargarCalificaciones = (pId) => {

};

let agregarCalificacion = () => {
    const texto = TxtEditorComentario.value.trim();

if(calificacionSeleccionada < 1){
    Swal.fire({
        toast: false,
        title: 'La calificación no puede estar vacia',
        text: 'Para calificar, debe seleccionar una estrella',
        type: 'warning',
        position: 'center',
        //timer: 7000,
        animation: false,
        customClass: 'animated tada',
        showConfirmButton: true
    });
}else{
    if (texto.length > 0) {
        console.log(texto);
    }
    console.log(calificacionSeleccionada);
}
};
let calificarMEP = () => {

  const tipoUsuario = localStorage.getItem('tipoUsuario');
  console.log(tipoUsuario);

  if (tipoUsuario == 'SuperAdmin') {
let idCentro = localStorage.getItem('verPerfilCEdu');
  console.log(idCentro);

  let botonCalificarCentro = document.createElement('button');
  botonCalificarCentro.innerText = 'Calificar';

  bloqueCalificacionMep.appendChild(botonCalificarCentro);

  botonCalificarCentro.addEventListener('click', function () {

    let rubros = listar_rubros();
    let rubrosActivos = [];
    let y = 0;
    for (let i = 0; i < rubros.length; i++) {

      if (rubros[i]['estado'] == 'Activo') {
        rubrosActivos[y] = rubros[i];
        y++;
      }


    }
    Swal.mixin({
      input: 'select',
      inputOptions: {
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9,
        10: 10
      },
      confirmButtonText: 'Siguiente &rarr;',
      showCancelButton: true,
      progressSteps: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    }).queue([

      {
        title: rubrosActivos[0]['rubro']
      },
      {
        title: rubrosActivos[1]['rubro']
      },
      {
        title: rubrosActivos[2]['rubro']
      },
      {
        title: rubrosActivos[3]['rubro']
      },
      {
        title: rubrosActivos[4]['rubro']
      },
      {
        title: rubrosActivos[5]['rubro']
      },
      {
        title: rubrosActivos[6]['rubro']
      },
      {
        title: rubrosActivos[7]['rubro']
      },
      {
        title: rubrosActivos[8]['rubro']
      },
      {
        title: rubrosActivos[9]['rubro']
      },

    ]).then((result) => {
      if (result.value) {
        let values = [];
        values = (result.value);
        let sumValues = 0;
        for (let i = 0; i < values.length; i++) {
          values[i] = parseInt(values[i]);
          sumValues += values[i];
        }
        let prom = (sumValues / values.length);
        let estrellasMep = (prom/2);
        Swal.fire({
          title: 'Calificación completada',
          html:
            'El centro ha recibido una calificación total de: ' + prom +', para total de: ' +estrellasMep+ ' estrellas',
          confirmButtonText: 'Aceptar'
        })
        registrar_calificacionMEP(idCentro, estrellasMep);
      }
    })

   

  });
  }

  

};

//Marlon. Fin del calificar MEP









window.onload = () => {
    let id;

    switch (localStorage.getItem("tipoUsuario").toLowerCase()) {
        case 'superadmin':
            id = localStorage.getItem('verPerfilCEdu');
            if(TblAddComentario){
                TblAddComentario.style = 'display:none;';
            }
			calificarMEP();
            break;

        case 'centroeducativo':
            id = localStorage.getItem('id');
            if(TblAddComentario){
                TblAddComentario.style = 'display:none;';
            }
            break;

        case 'padrefamilia':
            id = localStorage.getItem('verPerfilCEdu');
            if (BtnComentar) {
                BtnComentar.addEventListener('click', agregarCalificacion, false);
            }
            break;

        default:
            break;
    }

    if ('undefined' == typeof id || null === id) {
        throw new Error('Error al cargar el perfil: El identificador no puede estar vacio');
    }

    const perfil = get_obtenerPerfil(id);

    if ('undefined' !== typeof perfil.nombre) {
        document.querySelector('.titulo_centro_educativo').innerHTML = perfil.nombre;
    }

    crearCalendario(id);
    crearActividades();


    cargarCalificaciones(id)



};

