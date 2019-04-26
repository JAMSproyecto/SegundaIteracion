'use strict';

const TxtEditorComentario = document.querySelector('#txtEditorComentario');
const TblAddComentario = document.querySelector('#tblAddComentario');
const BtnCalificar = document.querySelector('#btnCalificarPadre');
const bloqueCalificacionMep = document.querySelector('#bloque_calificarMEP');
const mostrarResennia = document.querySelector('#mostrarResennia');
const mostrarActividad = document.querySelector('#tabla__actividades');
const div_noticias = document.querySelector('#tabla__noticias');
const Lnk_Cita = document.querySelector('#lnk_calendario');
const tablaServicios = document.querySelector('#tabla__servicios');



const noticias = listar_todas_noticias();

let calificacionSeleccionada = 0;

let mostrar_resennia = (resennia) => {
  if (mostrarResennia) {
    if ('undefined' !== typeof resennia && null !== resennia) {
      mostrarResennia.innerHTML = resennia;
    } else {
      console.log(resennia);
      mostrarResennia.innerHTML = '';
    }
  } else {
    console.log('No existe el campo para imprimir la reseña');
  }
}


let crearActividades = () => {


  let actividades = listar_todas_actividades();



  if ('object' == typeof actividades && Object.keys(actividades).length > 0) {
    actividades.forEach(obj => {

      let actividad = document.createElement('div');
      actividad.classList.add('actividad');

      let iconoActividad = document.createElement('p');
      iconoActividad.innerHTML = '<i class="far fa-calendar-check"></i>';


      let div_datos = document.createElement('div');
      div_datos.classList.add('actividad_izq');

      let strong = document.createElement('strong');
      strong.classList.add('tituloActividad');

  
      let lugar = document.createElement('p');
      lugar.classList.add('lugar');
      lugar.classList.add('dato_card');

      let fecha = document.createElement('p');
      fecha.classList.add('dato_card');

      let hora = document.createElement('p');
      hora.classList.add('hora');
      hora.classList.add('dato_card');

      //Agregado por Marlon, para que muestre los datos faltantes


      let detalles = document.createElement('p');
      detalles.classList.add('detalles__actividad');

      lugar.innerHTML = '<strong>Lugar: </strong>' + obj.lugar;
      detalles.innerHTML = obj.detalles;
      //Termina lo agregado por Marlon

      strong.innerHTML = obj.actividad;
      fecha.innerHTML = obj.fecha;
      hora.innerHTML = `<strong>Hora: </strong> ${obj.hora_inicio} - ${obj.finaliza}`;


      actividad.appendChild(strong);
      actividad.appendChild(iconoActividad);
      div_datos.appendChild(lugar);
      div_datos.appendChild(fecha);
      div_datos.appendChild(hora);

      //Agregado por Marlon

      div_datos.appendChild(detalles);
      //Termina lo agregado por Marlon


      actividad.appendChild(div_datos);
      mostrarActividad.appendChild(actividad);
    })

  } else {
    let actividad = document.createElement('div');
    actividad.classList.add('actividad');
    actividad.innerHTML = "No hay actividades registradas";
    mostrarActividad.appendChild(actividad);
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
  const elComentario = TxtEditorComentario.value.trim();

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

    asignar_calificacion_padre(calificacionSeleccionada, elComentario,
      (pSuccess, pMessage, pIdPadre, pIdCentro) => {
        if (pSuccess) {
          console.log(pMessage);
          console.log("pIdPadre: " + pIdPadre);
          console.log("pIdCentro: " + pIdCentro);
          alert(pMessage);

          // TODO: Listar las calificaciones (buscar_calificaciones_padre_por_idCentro).


        } else {
          Swal.fire({
            type: 'error',
            title: pMessage
          });
          console.error(pMessage);
        }
      });
  }
};

let calificarMEP = () => {

  const tipoUsuario = localStorage.getItem('tipoUsuario');
  console.log(tipoUsuario);

  if (tipoUsuario === 'SuperAdmin') {
    let idCentro = localStorage.getItem('verPerfilCEdu');
    console.log(idCentro);

    let botonCalificarCentro = document.createElement('button');
    botonCalificarCentro.innerText = 'Calificar';
    botonCalificarCentro.classList.add('btn');
    botonCalificarCentro.classList.add('btn--amarillo');


    bloqueCalificacionMep.appendChild(botonCalificarCentro);

    botonCalificarCentro.addEventListener('click', function () {

      let rubros = listar_rubros();
      const cantRubros = rubros.length;

      let rubrosActivos = [];
      let arrSteps = [];
      let iSteps = 1;
      let arrQueue = [];

      for (let i = 0; i < cantRubros; i++) {
        if (rubros[i]['estado'] === 'Activo') {
          rubrosActivos.push(rubros[i]['rubro']);
          arrSteps.push('' + iSteps);
          ++iSteps;
          arrQueue.push({ title: rubros[i]['rubro'] });
        }
      }

      Swal.mixin({
        input: 'select',
        inputOptions: {
          10: 10,
          9: 9,
          8: 8,
          7: 7,
          6: 6,
          5: 5,
          4: 4,
          3: 3,
          2: 2,
          1: 1
        },
        width: 700,
        padding: 100,
        confirmButtonText: 'Siguiente &rarr;',
        showCancelButton: true,
        progressSteps: arrSteps
      }).queue(arrQueue).then((result) => {
        if (result.value) {
          let values = [];
          values = (result.value);

          const cantValores = values.length;
          let sumValues = 0;

          for (let i = 0; i < 10; i++) {
            if ((i + 1) > cantValores) {
              values.push(0);
            } else {
              values[i] = parseInt(values[i], 10);
            }
            sumValues += values[i];
          }
          let prom = (sumValues / cantValores);

          //Redondea hacia arriba:
          let estrellasMep = Math.round(prom / 2);

          //Al redondear puede que el resultado sea mayor a 5, entonces se iguala a 5:
          if (estrellasMep > 5) {
            estrellasMep = 5;
          }

          const cantRubrosActivos = rubrosActivos.length;

          for (let w = 1; w < 11; ++w) {
            if (w > cantRubrosActivos) {
              rubrosActivos.push('_');
            }
          }

          Swal.fire({
            title: 'Calificación completada',
            html:
              'El centro ha recibido una calificación total de: ' + prom + ', para total de: ' + estrellasMep + ' estrellas',
            confirmButtonText: 'Aceptar'
          });

          registrar_calificacionMEP(idCentro, estrellasMep, rubrosActivos[0], values[0], rubrosActivos[1], values[1], rubrosActivos[2], values[2], rubrosActivos[3], values[3], rubrosActivos[4], values[4], rubrosActivos[5], values[5], rubrosActivos[6], values[6], rubrosActivos[7], values[7], rubrosActivos[8], values[8], rubrosActivos[9], values[9]);
        }
      });
    });
  }



};

//Marlon. Fin del calificar MEP



let mostrar_noticias = () => {
  div_noticias.innerHTML = '';
  if (noticias) {
    if ('object' == typeof noticias && Object.keys(noticias).length > 0) {

      // let bloques = '';
      noticias.forEach(function (objeto) {

        let bloque_noticia = document.createElement('div');
        bloque_noticia.classList.add('noticia');

        let titulo_noticia = document.createElement('h3');
        titulo_noticia.innerHTML = objeto.tema;
        titulo_noticia.classList.add('titulo');

        let iconoNoticia = document.createElement('div');
        iconoNoticia.innerHTML = '<i class="far fa-newspaper"></i>';

        let contenedor_noticias = document.createElement('div');
        contenedor_noticias.classList.add('noticia_izq');

        let fecha_noticia = document.createElement('p');
        fecha_noticia.innerHTML = objeto.fecha;
        fecha_noticia.classList.add('dato_card');

        let info_noticia = document.createElement('p');
        info_noticia.innerHTML = objeto.informacion;
        info_noticia.classList.add('dato_informacion');
        // bloques += '<div class="noticia">';
        // bloques += ' <h3 class="titulo">' + objeto.tema + '</h3>';
        // bloques += '<i class="far fa-newspaper"></i>';
        //bloques += '<p class="dato_card">Fecha: ' + objeto.fecha + '</p>';

        //   bloques += '<p class="dato_card"> ' + objeto.informacion + '</p>';


        //  bloques += '</div>';
        contenedor_noticias.appendChild(fecha_noticia);
        contenedor_noticias.appendChild(info_noticia);



        bloque_noticia.appendChild(titulo_noticia);
        bloque_noticia.appendChild(iconoNoticia);
        bloque_noticia.appendChild(contenedor_noticias);
        div_noticias.appendChild(bloque_noticia);

      });
      // div_noticias.innerHTML = bloques;
    } else {
      let bloques = '';
      bloques += '<div class="noticia">';
      bloques += 'No hay noticias registradas';
      bloques += '</div>';
      div_noticias.innerHTML = bloques;
    }
  } else {
    console.error('Error al obtener las noticias');

  }

};

//creado por Johan para las crads servicios 
let cards_servicios = (id) => {
  let servicio = obtener_servicios_por_id(id);

  const cantidadServicios = Object.keys(servicio).length || servicio.length;

  if (cantidadServicios > 0) {
    servicio.forEach(function (object) {
      let div_contenedor = document.createElement('div');
      div_contenedor.classList.add('contenedor_servicios', 'servicio');
      let div_contenedor_btn = document.createElement('div');
      div_contenedor_btn.classList.add('contenedor_btn');
      let div_servicio = document.createElement('div');
      let nombre = document.createElement('span');
      let logo = document.createElement('i');
      let descripcion = object.descripcion;
      let btn_descripcion = document.createElement('button');
      btn_descripcion.textContent = 'ver más';
      btn_descripcion.classList.add('btn_servico');
      //funcion para msotrar la descripción del servicio 
      btn_descripcion.addEventListener('click', function () {
        Swal.fire({
          title: '<strong>Descripción de la noticia:</strong>',
          type: 'info',
          html:
            '<b>' + descripcion + '</b>',
          showCloseButton: true,
          showCancelButton: false,
          focusConfirm: false,
          confirmButtonText:
            '<i class="fas fa-reply-all"></i> Regresar ',
          confirmButtonAriaLabel: 'Thumbs up, great!',
          cancelButtonText:
            '<i class="fa fa-thumbs-down"></i>',
          cancelButtonAriaLabel: 'Thumbs down',
        })
      });


      switch (object.tipo) {
        case 'actividades':
          div_servicio.classList.add('ser__actividad');
          logo.classList.add('fas', 'faq', 'fa-user-friends');

          nombre.innerHTML = object.nombre;
          div_servicio.appendChild(nombre);
          div_servicio.appendChild(logo);
          div_contenedor.appendChild(div_servicio);
          break;

        case 'alimentacion':
          div_servicio.classList.add('ser__alimentacion');
          logo.classList.add('fas', 'faq', 'fa-mug-hot');

          nombre.innerHTML = object.nombre;
          div_servicio.appendChild(nombre);
          div_servicio.appendChild(logo);
          div_contenedor.appendChild(div_servicio);
          break;

        case 'artes':
          div_servicio.classList.add('ser__arte');
          logo.classList.add('fas', 'faq', 'fa-palette');

          nombre.innerHTML = object.nombre;
          div_servicio.appendChild(nombre);
          div_servicio.appendChild(logo);
          div_contenedor.appendChild(div_servicio);
          break;

        case 'cientifico':
          div_servicio.classList.add('ser__cientifico');
          logo.classList.add('fas', 'faq', 'fa-flask');

          nombre.innerHTML = object.nombre;
          div_servicio.appendChild(nombre);
          div_servicio.appendChild(logo);
          div_contenedor.appendChild(div_servicio);
          break;


        case 'deporte':
          div_servicio.classList.add('ser__deporte');
          logo.classList.add('fas', 'faq', 'fa-futbol');

          nombre.innerHTML = object.nombre;
          div_servicio.appendChild(nombre);
          div_servicio.appendChild(logo);
          div_contenedor.appendChild(div_servicio);
          break;

        case 'musica':
          div_servicio.classList.add('ser__musica');
          logo.classList.add('fas', 'faq', 'fa-guitar');

          nombre.innerHTML = object.nombre;
          div_servicio.appendChild(nombre);
          div_servicio.appendChild(logo);
          div_contenedor.appendChild(div_servicio);
          break;

        case 'religion':
          div_servicio.classList.add('ser__religion');
          logo.classList.add('fas', 'faq', 'fa-bible');

          nombre.innerHTML = object.nombre;
          div_servicio.appendChild(nombre);
          div_servicio.appendChild(logo);
          div_contenedor.appendChild(div_servicio);
          break;

        case 'salud':
          div_servicio.classList.add('ser__salud');
          logo.classList.add('fas', 'faq', 'fa-user-nurse');

          nombre.innerHTML = object.nombre;
          div_servicio.appendChild(nombre);
          div_servicio.appendChild(logo);
          div_contenedor.appendChild(div_servicio);
          break;

        case 'transporte':
          div_servicio.classList.add('ser__transporte');
          logo.classList.add('fas', 'faq', 'fa-bus');

          nombre.innerHTML = object.nombre;
          div_servicio.appendChild(nombre);
          div_servicio.appendChild(logo);
          div_contenedor.appendChild(div_servicio);
          break;

        case 'estudio':
          div_servicio.classList.add('ser__estudio');
          logo.classList.add('fas', 'faq', 'fa-book');

          nombre.innerHTML = object.nombre;
          div_servicio.appendChild(nombre);
          div_servicio.appendChild(logo);
          div_contenedor.appendChild(div_servicio);
          break;
      }
      div_contenedor_btn.appendChild(btn_descripcion);
      div_contenedor.appendChild(div_contenedor_btn);
      tablaServicios.appendChild(div_contenedor);
    });
  } else {
    let div_contenedor = document.createElement('div');
    div_contenedor.classList.add('contenedor_servicios', 'servicio');
    let div_servicio = document.createElement('span');
    div_servicio.innerHTML = 'No hay servicios registrados';

    div_contenedor.appendChild(div_servicio);
    tablaServicios.appendChild(div_contenedor);
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
      if (BtnCalificar) {
        BtnCalificar.addEventListener('click', agregarCalificacion, false);
      }
      if (Lnk_Cita) {
        Lnk_Cita.setAttribute('href', 'registrar_cita.html');
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

  let tipoUsuario = localStorage.getItem("tipoUsuario");

  if (tipoUsuario == 'CentroEducativo') {
    crearCalendario(id);
  };


  crearActividades();

  mostrar_noticias();
  cards_servicios(id);
  cargarCalificaciones(id);
  mostrar_resennia(perfil.referenciaHistorica);

};

