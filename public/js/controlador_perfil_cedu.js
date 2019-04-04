'use strict';
/**
 * <div class="actividad">
                    <strong class="nombre__actividad"></strong>
                    <p class="fecha__actividad"></p>
                    <p class="hora__actividad"></p>
                </div>
 */
let crearActividades = (perfil) => {
    let actividades = listar_todas_actividades();

    document.querySelector('.titulo_centro_educativo').innerHTML = perfil.nombre;

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


};

window.addEventListener('load', () => {
    let id;

    switch (sessionStorage.getItem("tipoUsuario").toLowerCase()) {
        case 'padrefamilia':
            id = sessionStorage.getItem('padreVerPerfilCEdu')
            break;

        case 'centroeducativo':
            id = sessionStorage.getItem('id');
            break;

        default:
            break;
    }
    let perfil = get_obtenerPerfil(id);
    crearCalendario(id);
    crearActividades(perfil);

});