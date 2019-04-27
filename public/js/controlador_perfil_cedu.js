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
const bloqueCalificacion = document.querySelector('#bloqueCalificacion');
const tblComentarios = document.querySelector('#tblComentarios tbody');
const tblRankings = document.querySelector('#tblRankings tbody');
const tituloAddComentario = document.querySelector('#tituloAddComentario');

const tipoUsuario = localStorage.getItem('tipoUsuario');
const miId = localStorage.getItem('id');

const HtmlEstrellaAmarilla = '<i class="fas fa-star" style="color: rgb(255, 203, 49);"></i>';
const HtmlEstrellaGris = '<i class="far fa-star" style="color: rgb(50, 50, 50);"></i>';

const cssCal_contenedor = `-webkit-box-shadow: 0 3px 12px rgba(27, 31, 35, .15); -moz-box-shadow: 0 3px 12px rgba(27, 31, 35, .15); -khtml-box-shadow: 0 3px 12px rgba(27, 31, 35, .15); -o-box-shadow: 0 3px 12px rgba(27, 31, 35, .15); -ms-box-shadow: 0 3px 12px rgba(27, 31, 35, .15); box-shadow: 0 3px 12px rgba(27, 31, 35, .15); border: 1px solid rgba(27, 31, 35, .15); -webkit-border-radius: 4px; -moz-border-radius: 4px; -khtml-border-radius: 4px; -o-border-radius: 4px; -ms-border-radius: 4px; border-radius: 4px; margin-top: 0px; margin-bottom: 10px;padding: 10px 15px;`;


let id;
let perfil = {};

const noticias = listar_todas_noticias();

let calificacionSeleccionada = 0;



let obtenerHtmlEstrellas = (pCantidad) => {
  let TOP = 5, i = 0, resultado = '', laCantidad = parseInt('' + pCantidad, 10);
  for (; i < TOP; ++i) {
    if (i < laCantidad) {
      resultado += HtmlEstrellaAmarilla;
    } else {
      resultado += HtmlEstrellaGris;
    }
  }
  return resultado;
};

let ordenarPor = (path, reverse, primer, then) => {
  let get = function (obj, path) {
    if (path) {
      path = path.split('.');
      let i = 0;
      let len = path.length - 1;
      for (; i < len; i++) {
        obj = obj[path[i]];
      }
      return obj[path[len]];
    }
    return obj;
  },
    prime = function (obj) {
      return primer ? primer(get(obj, path)) : get(obj, path);
    };

  return function (a, b) {
    let A = prime(a),
      B = prime(b);

    return (
      (A < B) ? -1 :
        (A > B) ? 1 :
          (typeof then === 'function') ? then(a, b) : 0
    ) * [1, -1][+!!reverse];
  };
};


let mostrar_resennia = (resennia) => {
  if (mostrarResennia) {
    if ('undefined' !== typeof resennia && null !== resennia) {
      mostrarResennia.innerHTML = resennia;
    } else {
      console.log('No se encontró ninguna reseña');
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
      async (pSuccess, pMessage, pIdPadre, pIdCentro) => {
        if (pSuccess) {
          console.log(pMessage);
          console.log("pIdPadre: " + pIdPadre);
          console.log("pIdCentro: " + pIdCentro);

          const noUsar = await cargarPerfil();


          TblAddComentario.innerHTML = '';
          cargarCalificacionesPadres(true);

          Swal.fire({
            type: 'success',
            title: pMessage
          });


          // TODO: Listar las calificaciones


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
        fecha_noticia.classList.add('dato_fecha');

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
let cards_servicios = (pId) => {
  let servicio = obtener_servicios_por_id(pId);

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
      btn_descripcion.style = 'cursor:pointer;';

      //funcion para msotrar la descripción del servicio 
      btn_descripcion.addEventListener('click', function () {
        Swal.fire({
          title: '<strong>Descripción del servicio:</strong>',
          type: 'info',
          html: '<b>' + descripcion + '</b>',
          showCloseButton: false,
          showCancelButton: false,
          focusConfirm: false,
          confirmButtonText: 'Regresar'
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


let cargarCalificacionesPadres = async (esPadre) => {

  const existenDatos = Object.keys(perfil).length;


  if (bloqueCalificacionMep) {
    if (existenDatos > 0 && 'undefined' != typeof perfil.calificacionMEP) {
      if (perfil.calificacionMEP > 0) {
        bloqueCalificacionMep.innerHTML = `<p style="color: #9f9f9f;text-align: center;font-size: 15px;">¡Ya has calificado a esta institución!</p><p style="text-align:center;margin:15px auto 0;">${obtenerHtmlEstrellas(perfil.calificacionMEP)}</p>`;
      }
    }
  }


  if (tblComentarios) {


    let esteUsuarioYaComento = false;
    let calificacionHecha = '';

    let tr = document.createElement('tr');
    let td = document.createElement('td');

    if (existenDatos > 0) {

      let listado = perfil.listaCalificacionPadres;

      if (Object.keys(listado).length > 0) {
        listado.sort(ordenarPor('fecha', true, null));

        listado.forEach(obj4 => {

          let tdConjunto = document.createElement('div');
          tdConjunto.style = cssCal_contenedor;
          tdConjunto.id = obj4.idPadre;

          tdConjunto.innerHTML = `<p><span style="font-weight: 600;color: #333;">${obj4.nombrePadre}</span>&nbsp;&nbsp;<span style="font-weight: 400;font-style: italic;color: #9f9f9f;">${obj4.fechaEs}</span></p><p style="padding:5px 0;"><span>${obtenerHtmlEstrellas(obj4.calificacion)}</span></p><p style="font-weight: 400;color: #444;padding-left:20px;">${obj4.comentario}</p>`;


          td.appendChild(tdConjunto);

          if (esPadre) {
            if (obj4.idPadre == miId) {
              esteUsuarioYaComento = true;
              calificacionHecha = `<p style="text-align:center;margin:0 auto;padding:5px 0;"><span>${obtenerHtmlEstrellas(obj4.calificacion)}</span></p><p style="font-weight: 400;color: #444;padding-left:20px;text-align:center;margin:0 auto;">${obj4.comentario}</p>`;
            }
          }

        });

        tr.appendChild(td);




      } else {
        tr.innerHTML = '<p style="color: #9f9f9f;text-align: center;font-size: 15px;">¡Aún no hay calificaciones!</p>';
      }

      //rankings
      if (tblRankings) {
        tblRankings.innerHTML = `<tr><td><p style="text-align:center;margin:0 auto;font-weight: 600;color: #333;">MEP</p></td><td><p style="text-align:center;margin:0 auto;font-weight: 600;color: #333;">Padres de familia</p></td></tr> <tr><td><p style="text-align:center;margin:0 auto;">${obtenerHtmlEstrellas(perfil.calificacionMEP)}</p></td><td><p style="text-align:center;margin:0 auto;">${obtenerHtmlEstrellas(perfil.calificacionPadres)}</p></td></tr>`;
      }

      tblComentarios.appendChild(tr);
    }


    if (esteUsuarioYaComento) {
      tituloAddComentario.innerText = 'Calificación';
      TblAddComentario.innerHTML = '<div style="' + cssCal_contenedor + '"><p style="color: #9f9f9f;text-align: center;font-size: 15px;margin-top:15px;">Ya has calificado a esta institución:</p><p style="padding-top:6px;">' + calificacionHecha + '</p><p style="padding:6px;float: none;text-align: right;"><button style="float: none;background: #179bd7;color: #fff;border: 2px solid #179bd7;border-radius: 5px;cursor: pointer;">Editar</button></p></div>';
    }

  }
};

let cargarPerfil = async () => {
  if ('undefined' == typeof id || null === id) {
    throw new Error('Error al cargar el perfil: El identificador no puede estar vacio');
  }

  perfil = await get_obtenerPerfil(id);
};


window.onload = async () => {

  if (bloqueCalificacion) {
    switch (localStorage.getItem('centroEstaPendiente')) {
      case 'false': bloqueCalificacion.style = 'display:block;';
        break;
      default: bloqueCalificacion.style = 'display:none;';
        break;
    }
  }

  switch (tipoUsuario.toLowerCase()) {
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

  const noUsar = await cargarPerfil();

  //console.log('perfil: ', perfil);

  if ('undefined' !== typeof perfil.nombre) {
    document.querySelector('.titulo_centro_educativo').innerHTML = perfil.nombre;
  }




  switch (tipoUsuario.toLowerCase()) {
    case 'superadmin':
      cargarCalificacionesPadres(false);
      break;
    case 'centroeducativo':
      cargarCalificacionesPadres(false);
      break;
    case 'padrefamilia':
      cargarCalificacionesPadres(true);
      break;
    default:
      break;
  }



  if (tipoUsuario == 'CentroEducativo') {
    crearCalendario(id);
  };


  crearActividades();

  mostrar_noticias();
  cards_servicios(id);


  if ('undefined' !== typeof perfil.referenciaHistorica) {
    mostrar_resennia(perfil.referenciaHistorica);
  }


};

