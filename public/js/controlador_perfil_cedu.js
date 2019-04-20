'use strict';

const TxtEditorComentario = document.querySelector('#txtEditorComentario');
const TblAddComentario = document.querySelector('#tblAddComentario');
const BtnComentar = document.querySelector('#btnComentar');
const bloqueCalificacionMep = document.querySelector('#bloque_calificarMEP');
const mostrarResennia = document.querySelector('#mostrarResennia');
const div_noticias = document.querySelector('#tabla__noticias');


let calificacionSeleccionada = 0;

let mostrar_resennia = (resennia) => {

  mostrarResennia.innerHTML = resennia;
  //bloque.classList.add('actividad');



}



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

  if (calificacionSeleccionada < 1) {
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
  } else {
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
        width: 680,
        padding: 100,
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
          let estrellasMep = Math.floor(prom / 2);
          Swal.fire({
            title: 'Calificación completada',
            html:
              'El centro ha recibido una calificación total de: ' + prom + ', para total de: ' + estrellasMep + ' estrellas',
            confirmButtonText: 'Aceptar'
          })
          registrar_calificacionMEP(idCentro, estrellasMep, rubros[0].rubro, values[0], rubros[1].rubro, values[1], rubros[2].rubro, values[2], rubros[3].rubro, values[3], rubros[4].rubro, values[4], rubros[5].rubro, values[5], rubros[6].rubro, values[6], rubros[7].rubro, values[7], rubros[8].rubro, values[8], rubros[9].rubro, values[9]);
        }
      })



    });
  }



};

//Marlon. Fin del calificar MEP

let mostrar_noticias = () => {
  const noticias = listar_todas_noticias();

  div_noticias.innerHTML = '';
  if (noticias) {
    if ('object' == typeof noticias && Object.keys(noticias).length > 0) {

      let bloques = '';
      noticias.forEach(function (objeto) {
        bloques += '<div class="noticia not">';
        bloques += ' <h3 class="titulo">' + objeto.tema + '</h3>';
        bloques += '<i class="far fa-newspaper"></i>';
        bloques += '<p class="informacion"> ' + objeto.informacion + '</p>';
        bloques += '<p class="hora__noticia">Fecha:' + objeto.fecha + '</p>';

        bloques += '</div>';
      });
      div_noticias.innerHTML = bloques;
    } else {
    }
  } else {
    console.error('Error al obtener las noticias');
  }

};

let crearActividades = () => {

  let id = localStorage.getItem('verPerfilCEdu');

  let actividades = listar_todas_actividades(id);

  if ('object' == typeof actividades && Object.keys(actividades).length > 0) {
    actividades.forEach(obj => {

      let actividad = document.createElement('div');
      actividad.classList.add('actividad');

      let strong = document.createElement('strong');
      strong.classList.add('nombre__actividad');

      let fecha = document.createElement('p');
      fecha.classList.add('fecha__actividad');

      let hora = document.createElement('p');
      hora.classList.add('hora__actividad');

      //Agregado por Marlon, para que muestre los datos faltantes
      let lugar = document.createElement('p');
      lugar.classList.add('lugar__actividad');

      let detalles = document.createElement('p');
      detalles.classList.add('detalles__actividad');

      lugar.innerHTML = 'Lugar: ' + obj.lugar;
      detalles.innerHTML = obj.detalles;
      //Termina lo agregado por Marlon

      strong.innerHTML = obj.actividad;
      fecha.innerHTML = obj.fecha;
      hora.innerHTML = `${obj.hora_inicio} - ${obj.finaliza}`;
      actividad.appendChild(strong);
      actividad.appendChild(fecha);
      actividad.appendChild(hora);

      //Agregado por Marlon
      actividad.appendChild(lugar);
      actividad.appendChild(detalles);
      //Termina lo agregado por Marlon


      document.querySelector('#tabla__actividades').appendChild(actividad);
    });
  } else {
    console.log(actividades);
  }


};

window.onload = () => {
  let id;

  switch (localStorage.getItem("tipoUsuario").toLowerCase()) {
    case 'superadmin':
      id = localStorage.getItem('verPerfilCEdu');
      if (TblAddComentario) {
        TblAddComentario.style = 'display:none;';
      }
      calificarMEP();
      break;

    case 'centroeducativo':
      id = localStorage.getItem('id');
      if (TblAddComentario) {
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

  mostrar_noticias();
  cargarCalificaciones(id)
  mostrar_resennia(perfil.referenciaHistorica);

};

