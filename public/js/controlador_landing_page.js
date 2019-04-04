'use strict';

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

let cargarCEdu = (idInputTabla, ordenar, esZA) => {
    listarCEdu((pSuccess, pMessage)  => {
        if (pSuccess) {
            if ('object' == typeof (pMessage)) {
	const tablaCuerpo = document.querySelector('#'+idInputTabla+' tbody');

if(ordenar === true){
	pMessage.sort(ordenarPor('nombreComercial', esZA, null));
}
                let i = 0;
                pMessage.forEach(elObjecto => {
					if(i < 10){
					
                    let tr_fila = tablaCuerpo.insertRow();
						
						if(elObjecto['fotoCentro'] && elObjecto['fotoCentro'].length > 0){
							tr_fila.insertCell().innerHTML = '<img alt=" " src="'+elObjecto['fotoCentro']+'">';
						}else{
							tr_fila.insertCell().innerHTML = '';
						}
						
						
						if(elObjecto['nombreComercial'] && elObjecto['nombreComercial'].length > 0){
							tr_fila.insertCell().innerHTML = elObjecto['nombreComercial'];
						}else{
						    tr_fila.insertCell().innerHTML = '';
						}
						++i;
					}
                });
				
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
     cargarCEdu('tblCentrosEducativosPub', true, false);
     cargarCEdu('tblCentrosEducativosPriv', true, true);
};

