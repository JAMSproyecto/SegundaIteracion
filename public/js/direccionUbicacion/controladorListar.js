'use strict';

/**
 * @return {Number} pIdProvincia
 * @return {String}
 */
let obtenerProvinciaPorID = (pIdProvincia) => {
	if (objProvincias && !!Object.keys(objProvincias).length) {
        const hasProperty = Object.prototype.hasOwnProperty;
        let propiedad;
        for (propiedad in objProvincias) {
            if (!hasProperty.call(objProvincias, propiedad)) continue;
			if (objProvincias[propiedad]['idProvincia'] === pIdProvincia) {
                return objProvincias[propiedad]['nombre'];
            }
        }
		console.error('No se encontró la provincia: '+pIdProvincia);
		return '';
    }else{
		console.error('No se encontró la lista de provincias');
		return '';
	}
};

/**
 * @return {Number} pIdCanton
 * @return {String}
 */
let obtenerCantonPorID = (pIdCanton) => {
	if (objCantones && !!Object.keys(objCantones).length) {
        const hasProperty = Object.prototype.hasOwnProperty;
        let propiedad;
        for (propiedad in objCantones) {
            if (!hasProperty.call(objCantones, propiedad)) continue;
			if (objCantones[propiedad]['idCanton'] === pIdCanton) {
                return objCantones[propiedad]['nombre'];
            }
        }
		console.error('No se encontró el cantón: '+pIdCanton);
		return '';
    }else{
		console.error('No se encontró la lista de cantones');
		return '';
	}
};

/**
 * @return {Number} pIdDistrito
 * @return {String}
 */
let obtenerDistritoPorID = (pIdDistrito) => {
	if (objDistritos && !!Object.keys(objDistritos).length) {
        const hasProperty = Object.prototype.hasOwnProperty;
        let propiedad;
        for (propiedad in objDistritos) {
            if (!hasProperty.call(objDistritos, propiedad)) continue;
			if (objDistritos[propiedad]['idDistrito'] === pIdDistrito) {
                return objDistritos[propiedad]['nombre'];
            }
        }
		console.error('No se encontró el cantón: '+pIdDistrito);
		return '';
    }else{
		console.error('No se encontró la lista de cantones');
		return '';
	}
};




