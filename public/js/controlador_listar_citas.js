'use strict';

const tabla_citas = document.querySelector('#tbl_citas tbody');

const input_inicio = document.querySelector('#txt_inicio');
const input_fin = document.querySelector('#txt_fin');
const botonBuscar = document.querySelector('#busqueda');
const input_filtrar = document.querySelector('#txt_filtrar');

let citas = listar_citas();


function imprimir_citas() {
    tabla_citas.innerHTML = '';
    let citas = listar_citas(localStorage.getItem('id'));

    // tabla_citas.innerHTML = '';

    for (let i = 0; i < citas.length; i++) {

        let fila = tabla_citas.insertRow();
        fila.insertCell().innerHTML = citas[i]['Nombre'];
        fila.insertCell().innerHTML = citas[i]['Apellidos'];
        fila.insertCell().innerHTML = citas[i]['Telefono'];
        fila.insertCell().innerHTML = citas[i]['Correo'];

        let cell = fila.insertCell();
        cell.setAttribute('data-fecha', citas[i].Fecha);
        cell.innerHTML = citas[i].Fecha;

        fila.insertCell().innerHTML = citas[i]['Hora'];
        fila.insertCell().innerHTML = citas[i]['Motivo'];
        fila.insertCell().innerHTML = citas[i]['Comentario'];

        if(localStorage.getItem('tipoUsuario').toLowerCase() == 'centroeducativo'){
            let celda_cancelar = fila.insertCell();

            let cancelar = document.createElement('a');
            cancelar.dataset.id_cita = citas[i]._id;
            cancelar.innerHTML = '<i class="far fa-trash-alt"></i>';
            cancelar.addEventListener('click', (e) => {
                Swal.fire({
                    title: '¿Está seguro que desea cancelar la cita?',
                    text: "Esta acción no se puede revertir",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: '¡Sí, estoy seguro!'
                  }).then((result) => {
                    if (result.value) {
                      eliminar_cita(e.target.parentElement.dataset.id_cita);
                      imprimir_citas();
                    }
                  })
            });
            celda_cancelar.appendChild(cancelar);
        }
    }
};





window.addEventListener('load', () => {
    $.datetimepicker.setDateFormatter({
        parseDate: function (date, format) {
            var d = moment(date, format);
            return d.isValid() ? d.toDate() : false;
        },
        
        formatDate: function (date, format) {
            return moment(date).format(format);
        },
    
        //Optional if using mask input
        formatMask: function(format){
            return format
                .replace(/Y{4}/g, '9999')
                .replace(/Y{2}/g, '99')
                .replace(/M{2}/g, '19')
                .replace(/D{2}/g, '39')
                .replace(/H{2}/g, '29')
                .replace(/m{2}/g, '59')
                .replace(/s{2}/g, '59');
        }
    });

    $.datetimepicker.setLocale('es');
    $('#txt_inicio').datetimepicker({
        timepicker: false, datepicker: true, mask: true, format: 'DD-MM-YYYY',
       
        minDate: '2017-01-01'
    });
    $('#txt_fin').datetimepicker({
        timepicker: false, datepicker: true, mask: true, format: 'DD-MM-YYYY',
       
        minDate: '2017-01-01'
    });


    if (tabla_citas) {
        imprimir_citas();
    }

    if (botonBuscar) {
        botonBuscar.addEventListener('click', function () {
    
            let inicio = moment(`${input_inicio.value}`, 'DD-MM-YYYY');
            let fin = moment(`${input_fin.value}`, 'DD-MM-YYYY');
            
            if(inicio.isAfter(fin)){
                swal.fire(
                    {
                        type: 'warning',
                        title: 'Rango de fecha incorrecto',
                        text: 'La fecha final de búsqueda no puede ser menor a la fecha inicial'
                    }
                );
            }
            else{
                let citas = tabla_citas.querySelectorAll('tr');

                citas.forEach((e,k)=>{
                    let cita = moment(`${e.children[4].innerText} ${e.children[5].innerText}`, 'DD-MM-YYYY hh:mm');
                    if(!cita.isBetween(inicio, fin))
                        e.classList.add('invisible');
                    else
                        e.classList.remove('invisible');
                });
            }

    
            //if ((inicio && fin) || (nombre_filtrar)) {
    
            //     $('#tbl_citas tbody tr').hide().each(function () {
    
            //         let fecha = $('td', this).eq(4).data('fecha'); //this cada uno de los tr, this se convierte en tr en cada iteracion
            //         let fecha_actual = new Date(fecha + ' 00:00:00 GMT-06:00');
            //         let calendario = start <= fecha_actual && fecha_actual <= end;
    
    
            //         if (calendario) {
            //             $(this).show();
            //         } //seleciona todo los tr luego los esconde y luego para cada uno agarra la fecha
            //     });
            // } else {
            //     $('#tbl_citas tbody tr').show();
    
            // }
        });
    }
});
