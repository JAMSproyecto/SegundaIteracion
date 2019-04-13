
let crearCalendario = (id) => {
    let arregloCitas = listar_citas(id);
    let eventos = [];
    for (let i = 0; i < arregloCitas.length; i++) {
        let fechaParse = moment(`${arregloCitas[i].Fecha} ${arregloCitas[i].Hora}`, 'DD-MM-YYYY hh:mm');

        let evento = {
            title: arregloCitas[i].Motivo,
            start: fechaParse.toISOString()
        }
        eventos.push(evento);
    }
    let calendarioEl = document.querySelector('#calendario');
    let calendario = new FullCalendar.Calendar(calendarioEl, {
        plugins: ['dayGrid'],
        timeZone: 'local',
        defaultView: 'dayGridWeek',
        left: 'prev,next',
        center: 'title',
        buttonText: {
            today: 'Hoy',
            month: 'Mes',
            week: 'Semana',
            day: 'Día',
            list: 'Lista'
        },
        height: 400,
        locale: 'es',
        events: eventos
    });
    calendario.render();
}
