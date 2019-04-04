let crearCalendario = (id) => {
    let arregloCitas = listar_citas(id);
    let eventos = [];
    for (let i = 0; i < arregloCitas.length; i++) {
        let evento = {
            title: arregloCitas[i].Motivo,
            start: `${arregloCitas[i].Fecha}T${arregloCitas[i].Hora}`
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
