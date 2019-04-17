'use strict';

const TxtEditorComentario = document.querySelector('#txtEditorComentario');
const TblAddComentario = document.querySelector('#tblAddComentario');
const BtnComentar = document.querySelector('#btnComentar');

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

