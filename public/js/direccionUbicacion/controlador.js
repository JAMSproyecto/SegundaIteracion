'use strict';

const sltProvincia = document.querySelector('#sltProvincia');
const sltCanton = document.querySelector('#sltCanton');
const sltDistrito = document.querySelector('#sltDistrito');
const contenedorMapa = document.querySelector('#contenedorMapa');

let mapaTipos;
if ('undefined' !== typeof H) {
    const mapaPlataforma = new H.service.Platform({
        'app_id': 'khwWZ9nlsn7bfe5F7klu',
        'app_code': 'gRIT1ZrN3maCeoxjUKgAbw',
        useHTTPS: true
    });
    mapaTipos = mapaPlataforma.createDefaultLayers();  
}

let llenarProvincias = () => {
    if (objProvincias && !!Object.keys(objProvincias).length) {
        const hasProperty = Object.prototype.hasOwnProperty;
        let key;
        for (key in objProvincias) {
            if (!hasProperty.call(objProvincias, key)) continue;
            let nuevaOpcion = new Option(objProvincias[key]['nombre']);
            nuevaOpcion.value = objProvincias[key]['idProvincia'];
            sltProvincia.appendChild(nuevaOpcion);
        }
    }
};

let obtenerLatitud = (pIdProvincia) => {
    let lat = 0;
    if (objProvincias && !!Object.keys(objProvincias).length) {
		const hasProperty = Object.prototype.hasOwnProperty;
        let key;
        for (key in objProvincias) {
            if (!hasProperty.call(objProvincias, key)) continue;
            if (objProvincias[key]['idProvincia'] == pIdProvincia) {
                lat = objProvincias[key]['lat'];
                break;
            }
        }
    }
    return lat;
};
let obtenerLongitud = (pIdProvincia) => {
    let lng = 0;
    if (objProvincias && !!Object.keys(objProvincias).length) {
		const hasProperty = Object.prototype.hasOwnProperty;
        let key;
        for (key in objProvincias) {
            if (!hasProperty.call(objProvincias, key)) continue;
            if (objProvincias[key]['idProvincia'] == pIdProvincia) {
                lng = objProvincias[key]['lng'];
                break;
            }
        }
    }
    return lng;
};

let cambioProvincia = () => {
    if (objProvincias && !!Object.keys(objProvincias).length) {
        const idProvincia = parseInt(sltProvincia.value, 10) || 0;
        let lat = obtenerLatitud(idProvincia);
        let lng = obtenerLongitud(idProvincia);

        contenedorMapa.innerHTML = '';

        if ('undefined' !== typeof H) {
            if (lat !== 0 && lng !== 0) {

                const mapa = new H.Map(
                    document.getElementById('contenedorMapa'),
                    mapaTipos.normal.map,
                    {
                        zoom: 10,
                        center: {lng: lng, lat: lat}
                    });
            }
        }


        sltCanton.innerHTML = '<option disabled selected>Seleccione un cant&oacute;n...</option>';
		
		sltDistrito.innerHTML = '<option disabled selected>Seleccione un distrito...</option>';

        if (objCantones && !!Object.keys(objCantones).length) {
			const hasProperty = Object.prototype.hasOwnProperty;
            let key;
            for (key in objCantones) {
                if (!hasProperty.call(objCantones, key)) continue;
                if (objCantones[key]['idProvincia'] == idProvincia) {
                    let nuevaOpcion = new Option(objCantones[key]['nombre']);
                    nuevaOpcion.value = objCantones[key]['idCanton'];
                    sltCanton.appendChild(nuevaOpcion);
                }
            }

        }
    }
};


let obtenerDistritos = () => {
    let idCanton = parseInt(sltCanton.value, 10) || 0;
    sltDistrito.innerHTML = '<option disabled selected>Seleccione un distrito...</option>';

    if (objDistritos && !!Object.keys(objDistritos).length) {
		const hasProperty = Object.prototype.hasOwnProperty;
        let key = '';
        for (key in objDistritos) {
            if (!hasProperty.call(objDistritos, key)) continue;
            if (objDistritos[key]['idCanton'] == idCanton) {
                let nuevaOpcion = new Option(objDistritos[key]['nombre']);
                nuevaOpcion.value = objDistritos[key]['idDistrito'];
                sltDistrito.appendChild(nuevaOpcion);
            }
        }
    }
};

if(sltProvincia){
	sltProvincia.addEventListener('change', cambioProvincia, false);
}

if(sltCanton){
 sltCanton.addEventListener('change', obtenerDistritos, false);
}



