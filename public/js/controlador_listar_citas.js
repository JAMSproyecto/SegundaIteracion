'use strict';

const tabla_citas = document.querySelector('#tbl_citas tbody');

const input_inicio = document.querySelector('#txt_inicio');
const input_fin = document.querySelector('#txt_fin');
const botonBuscar = document.querySelector('#busqueda');
const input_filtrar = document.querySelector('#txt_filtrar');

let citas = listar_citas();


window.onload = () => { 

    $.datetimepicker.setLocale('es');
    $('#fecha').datetimepicker({
        timepicker: false, datepicker: true, mask: true, format: 'Y-m-d', /*yearStart: ,*/
       
        minDate: '2017-01-01'
    });
};

let getInicio = () => {
    const InputDatepicker = document.querySelector('#txt_inicio');
    alert(InputDatepicker.value);

};




window.onload = () => {

    $.datetimepicker.setLocale('es');
    $('#fecha').datetimepicker({
        timepicker: false, datepicker: true, mask: true, format: 'Y-m-d', /*yearStart: ,*/
       
        minDate: '2017-01-01'
    });
};

let getFin = () => {
    const InputDatepicker = document.querySelector('#txt_fin');
    alert(InputDatepicker.value);

};

function imprimir_citas() {
    tabla_citas.innerHTML = '';
    let inicio = input_inicio.value;
    let fin = input_fin.value;

    for (let i = 0; i < citas.length; i++) {

        let fecha = new Date(citas[i]['Fecha'] + ' 00:00:00 GMT-06:00');
        

        let fila = tabla_citas.insertRow();
        let fecha_cita = citas[i]['Fecha'];
        fila.insertCell().innerHTML = citas[i]['Nombre'];
        fila.insertCell().innerHTML = citas[i]['Apellidos'];
        fila.insertCell().innerHTML = citas[i]['Telefono'];
        fila.insertCell().innerHTML = citas[i]['Correo'];

        let cell = fila.insertCell();
        try {
            cell.setAttribute('data-fecha', fecha_cita);
            cell.innerHTML = fecha.format('dd/mm/yyyy');

        } catch{

        }

        fila.insertCell().innerHTML = citas[i]['Hora'];
        fila.insertCell().innerHTML = citas[i]['Motivo'];
        fila.insertCell().innerHTML = citas[i]['Comentario'];
    }
};


botonBuscar.addEventListener('click', function () {
  
    let inicio = input_inicio.value;
    let fin = input_fin.value;
    let nombre_filtrar = input_filtrar.value;

    let start = new Date(inicio + ' 00:00:00 GMT-06:00');/*llamar a la funcion y pasar como parametro lo que uqier convertir en date*/
    let end = new Date(fin + ' 00:00:00 GMT-06:00');

    if ((inicio && fin) || (nombre_filtrar) ) {

        $('#tbl_citas tbody tr').hide().each(function () {
           
            let fecha = $('td', this).eq(4).data('fecha');/*this cada uno de los tr, this se convierte en tr en cada iteracion*/
            let fecha_actual = new Date(fecha + ' 00:00:00 GMT-06:00');
            let calendario = start <= fecha_actual && fecha_actual <= end;
           
           
                if (calendario ) {
                $(this).show();
            }/*seleciona todo los tr luego los esconde y luego para cada uno agarra la fecha*/
        }
        );
    } else {
        $('#tbl_citas tbody tr').show();

    }
});
imprimir_citas();