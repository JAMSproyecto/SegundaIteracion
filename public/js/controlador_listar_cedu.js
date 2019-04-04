'use strict';

const tablaCuerpo = document.querySelector('#tblCentrosEducativos tbody');

let cargarDataTable = () => {
	
	//Nota: en esta función (cargarDataTable) no se utilizan funciones de flecha al propio para poder usar this.
	
	$('#tblCentrosEducativos thead tr:eq(1) th').each(function() {
		let titulo = $(this).text();
        $(this).html('<input type="text" class="icon-buscar" placeholder="&#xf0b0;__" value="" >');
    });
	
	let tablaDatos = $('#tblCentrosEducativos').DataTable({
		language: {
			sSearch: 'Filtrar'
		},
        paging: false,
		orderCellsTop: true,
        pagingType: 'full_numbers',
        ordering: true,
        iDisplayLength: -1,
        bDestroy: false,
        bFilter: true,
        searching: true,
        bSort: true,
        order: [[7, 'desc'],[6, 'desc']],
		dom: '<f><t>'
    });
	
	$('#tblCentrosEducativos thead').on( 'keyup', '.icon-buscar',function () {
        tablaDatos
            .column( $(this).parent().index() )
            .search( this.value )
            .draw();
    } );
	
	
	
};

let irAlPerfil = (idCEdu) => {
	sessionStorage.setItem('padreVerPerfilCEdu', idCEdu);
    location.replace('./perfilCentroPadre.html')
};

let cargarCEdu = () => {
    listarCEdu((pSuccess, pMessage)  => {
        if (pSuccess) {
            if ('object' == typeof (pMessage)) {
                pMessage.forEach(obj => {
                    let tr_fila = tablaCuerpo.insertRow();
						
						if(obj['fotoCentro'] && obj['fotoCentro'].length > 0){
							tr_fila.insertCell().innerHTML = '<img alt=" " src="'+obj['fotoCentro']+'">';
						}else{
							tr_fila.insertCell().innerHTML = '';
						}
						
						
						if(obj['nombreComercial'] && obj['nombreComercial'].length > 0){
							tr_fila.insertCell().innerHTML = obj['nombreComercial'];
						}else{
						    tr_fila.insertCell().innerHTML = '';
						}
						
						
						
						if(obj['direccion']){
						let provincia = '';
						let canton = '';
						let distrito = '';
						let direccion = '';
					    obj['direccion'].forEach(obj2 => {
							provincia = obtenerProvinciaPorID(obj2['idProvincia']);
							canton = obtenerCantonPorID(obj2['idCanton']);
							distrito = obtenerDistritoPorID(obj2['idDistrito']);
							
							direccion = obj2['sennas'];
						});
							
							
							
							tr_fila.insertCell().innerHTML = provincia;
							tr_fila.insertCell().innerHTML = canton;
							tr_fila.insertCell().innerHTML = distrito;
							tr_fila.insertCell().innerHTML = direccion;
						}else{
						    tr_fila.insertCell().innerHTML = '';
						    tr_fila.insertCell().innerHTML = '';
						    tr_fila.insertCell().innerHTML = '';
						    tr_fila.insertCell().innerHTML = '';
						}
						
						if(obj['calificacion'] && Object.keys(obj['calificacion']).length >0){
						obj['calificacion'].forEach(obj3 => {
							tr_fila.insertCell().innerHTML = obj3['padres'];
							tr_fila.insertCell().innerHTML = obj3['mep'];
							});
						}else{
							tr_fila.insertCell().innerHTML = '0';
						    tr_fila.insertCell().innerHTML = '0';
						}
						
						tr_fila.insertCell().innerHTML = '<button class="btn btn--amarillo" onClick="irAlPerfil('+obj['_id']+'); return false;">Ver m&aacute;s</button>';
                });
				
				cargarDataTable();
				
            } else {
                Swal.fire({
                    toast: false,
                    type: 'warning',
                    position: 'top',
                    animation: false,
                    customClass: 'animated tada',
                    showConfirmButton: true,
                    title: pMessage
                });
            }
        } else {
            Swal.fire({
                toast: false,
                type: 'warning',
                position: 'top',
                animation: false,
                customClass: 'animated tada',
                showConfirmButton: true,
                title: pMessage
            });

        }
    });
};

window.onload = () => {
     cargarCEdu();
};

