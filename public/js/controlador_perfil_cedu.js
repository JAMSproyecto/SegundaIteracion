'use strict';

const TxtEditorComentario = document.querySelector('#txtEditorComentario');
const TblAddComentario = document.querySelector('#tblAddComentario');
const BtnComentar = document.querySelector('#btnComentar');
const bloqueCalificacionMep = document.querySelector('#bloque_calificarMEP');
const mostrarResennia = document.querySelector('#mostrarResennia');
const div_noticias = document.querySelector('#tabla__noticias');


const noticias = listar_todas_noticias();

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

//creado por Johan para las crads servicios 
let cards_servicios = () =>{
  let servicio = obtener_por_id();

    if (Object.keys(servicio).length > 0) {
      servicio.forEach(function(object) {

        let div_servicio = document.createElement('div');
        let nombre = document.createElement('span');
        let logo = document.createElement('i');

        switch(object.tipo){
          case 'actividades' :
          div_servicio.classList.add('ser__actividad','servicio');
          logo.classList.add('fas','faq','fa-user-friends');

          nombre.innerHTML = object.nombre;
          div_servicio.appendChild(nombre);
          div_servicio.appendChild(logo);
          break;

          case 'alimentacion' : 
          div_servicio.classList.add('ser__alimentacion','servicio');
          logo.classList.add('fas','faq','fa-mug-hot');
          
          nombre.innerHTML = object.nombre;
          div_servicio.appendChild(nombre);
          div_servicio.appendChild(logo);
          break;

          case 'artes' : 
          div_servicio.classList.add('ser__arte','servicio');
          logo.classList.add('fas','faq','fa-palette');
          
          nombre.innerHTML = object.nombre;
          div_servicio.appendChild(nombre);
          div_servicio.appendChild(logo);
          break;

          case 'cientifico' : 
          div_servicio.classList.add('ser__cientifico','servicio');
          logo.classList.add('fas','faq','fa-flask');
          
          nombre.innerHTML = object.nombre;
          div_servicio.appendChild(nombre);
          div_servicio.appendChild(logo);
          break;

          
          case 'deporte' : 
          div_servicio.classList.add('ser__deporte','servicio');
          logo.classList.add('fas','faq','fa-futbol');
          
          nombre.innerHTML = object.nombre;
          div_servicio.appendChild(nombre);
          div_servicio.appendChild(logo);
          break;

          case 'musica' : 
          div_servicio.classList.add('ser__musica','servicio');
          logo.classList.add('fas','faq','fa-guita');
         
          nombre.innerHTML = object.nombre;
          div_servicio.appendChild(nombre);
          div_servicio.appendChild(logo);
          break;

          case 'religion' : 
          div_servicio.classList.add('ser__religion','servicio');
          logo.classList.add('fas','faq','fa-bible');
          
          nombre.innerHTML = object.nombre;
          div_servicio.appendChild(nombre);
          div_servicio.appendChild(logo);
          break;

          case 'salud' : 
          div_servicio.classList.add('ser__salud','servicio');
          logo.classList.add('fas','faq','fa-user-nurse');
          
          nombre.innerHTML = object.nombre;
          div_servicio.appendChild(nombre);
          div_servicio.appendChild(logo);
          break;

          case 'transporte' : 
          div_servicio.classList.add('ser__transporte','servicio');
          logo.classList.add('fas','faq','fa-bus');
          
          nombre.innerHTML = object.nombre;
          div_servicio.appendChild(nombre);
          div_servicio.appendChild(logo);
          break;

          case 'estudio' : 
          div_servicio.classList.add('ser__estudio','servicio');
          logo.classList.add('fas','faq','fa-book');
          
          nombre.innerHTML = object.nombre;
          div_servicio.appendChild(nombre);
          div_servicio.appendChild(logo);
          break;
        }

        document.querySelector('#tabla__servicios').appendChild(div_servicio);
      });
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
  cards_servicios();
  cargarCalificaciones(id)
  mostrar_resennia(perfil.referenciaHistorica);

};

