'use strict';

/**
 * Subir archivos adjuntos a Dropbox.
 * @param  {File} pArchivo
 * @param  {String} pNombreArchivo
 * @return {Object}
 */
let guardarAdjunto = (pArchivo, pNombreArchivo) => {
    return new Promise((resolve, reject) => {
        let request = $.ajax({
            url: 'https://content.dropboxapi.com/2/files/upload',
            method: 'POST',
            //contentType: false,
			contentType: 'application/octet-stream',
			headers: {
				"Authorization": "Bearer XypEt6kzrXAAAAAAAAAAFAU4YJaeEA88Bu6nPO1J1xw0FaiMt0B2Iupyw6GPqZUv",
				"Dropbox-API-Arg": '{"path": "/'+pNombreArchivo+'","mode": "add","autorename": true,"mute": false}'
			},
            data: pArchivo,
            cache: false,
            processData: false
        });

        request.done(respuesta => {
            console.log('guardarAdjunto respuesta: ' + respuesta);
            resolve(respuesta);
        });

        request.fail((jqXHR, textStatus) => {
            console.log('Error guardarAdjunto: ' + jqXHR.statusText + ' [' + jqXHR.status + ']  -  ' + jqXHR.responseText);
            reject(new DOMException('Problema al subir adjunto.'));
        });
    });
};


let obtenerArchivo = (pId) => {
    return new Promise((resolve, reject) => {
        let request = $.ajax({
            url: 'https://content.dropboxapi.com/2/files/get_preview',
            method: 'POST',
            contentType: false,
			//contentType: 'application/octet-stream',
			headers: {
				'Authorization': 'Bearer XypEt6kzrXAAAAAAAAAAFAU4YJaeEA88Bu6nPO1J1xw0FaiMt0B2Iupyw6GPqZUv',
				'Dropbox-API-Arg': '{"path": "'+pId+'"}'
			},
            cache: false/*,
            processData: false*/
        });

        request.done(respuesta => {
            console.log('obtenerArchivo respuesta: ' + respuesta);
            resolve(respuesta);
        });

        request.fail((jqXHR, textStatus) => {
            console.log('Error obtenerArchivo: ' + jqXHR.statusText + ' [' + jqXHR.status + ']  -  ' + jqXHR.responseText);
            reject(new DOMException('Problema al subir adjunto.'));
        });
    });
};



