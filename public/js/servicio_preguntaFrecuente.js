'use strict';

//Preguntas frecuentes centro educativo
let post_registrarPreguntaFrecuente = (pPregunta, pRespuesta, pIdCentroEducativo) => {
    let request = $.ajax({
            url: "http://localhost:4000/api/registrar_preguntaFrecuente_centroEducativo",
            method: "POST",
            data: {
                pregunta: pPregunta,
                respuesta: pRespuesta,
                idCentroEducativo: pIdCentroEducativo
            },
            dataType: "json",
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
        }

    );

    request.done(function (msg) {
        if (msg.exito) {
            swal.fire({
                type: 'success',
                title: 'Los datos fueron guardados exitosamente',
                text: 'Nos comunicaremos con usted tan pronto como sea posible'
            }).then((resultado) => {
                window.location.replace('listarPreguntasFrecuentes.html');
            });
        } else {
            swal.fire({
                type: 'error',
                title: 'Los datos no fueron guardados exitosamente',
                text: 'Error'
            });
        }
    });

    request.fail(function (jqXHR, textStatus) {
        swal.fire({
            type: 'error',
            title: 'Los datos no se lograron guardar',
            text: 'Error de conexión'
        });
    });
};



let get_ListarPreguntasFrecuentes = (tabla_PreguntaFrecuente, idCentro) => {

    let request = $.ajax({
        url: "http://localhost:4000/api/obtener_preguntaFrecuente_centroEducativo",
        method: "POST",
        data: {
            idCentroEducativo: idCentro
        },
        dataType: "json",
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        async: false
    });

    request.done(function (res) {
        if (res.exito) {
            tabla_PreguntaFrecuente.innerHTML = '';
            for (let i = 0; i < res.preguntasFrecuentes.length; i++) {
                let row = document.createElement('tr');

                let slt_filtros = document.querySelector('#preguntas');
                let opt_pregunta = document.createElement('option');

                //Obtiene la pregunta
                let pregunta = res.preguntasFrecuentes[i];

                //Pregunta
                let cell = document.createElement('td');

                cell.innerHTML = pregunta.pregunta;

                row.appendChild(cell);

                opt_pregunta.setAttribute('value', pregunta.pregunta);
                slt_filtros.appendChild(opt_pregunta);

                //Respuesta
                cell = document.createElement('td');

                cell.innerHTML = pregunta.respuesta;

                row.appendChild(cell);

                //se agrego el boton para actualizar 
                let btn_actualizar = document.createElement('a');
                btn_actualizar.dataset.id_preguntaFrecuente = pregunta._id;
                btn_actualizar.innerHTML = '<i class="fas fa-pencil-alt"></i>';

                //se llama a la función para actualizar el articulo
                btn_actualizar.addEventListener('click',
                    function () {
                        Swal.fire({
                            title: 'Modificar pregunta frecuente',
                            html : `<input id="swal-input1" class="swal2-input" value = "${pregunta.pregunta}">`+
                            `<input id="swal-input2" class="swal2-input" value = "${pregunta.respuesta}">`,
                            showCancelButton: true,
                            preConfirm: () => {
                                let pregunta = document.querySelector('#swal-input1');
                                let respuesta = document.querySelector('#swal-input2');
                                if(pregunta.value == '' || respuesta.value == ''){
                                    Swal.showValidationMessage(
                                        `Por favor complete todos los campos requeridos`
                                      );
                                }
                                else{
                                    post_actualizarPreguntaFrecuente(pregunta.value, respuesta.value, this.dataset.id_preguntaFrecuente);    
                                    get_ListarPreguntasFrecuentes(Tabla_PreguntaFrecuente); 
                                }
                            }
                          })
                    }
                );
                let celda_actualizar = row.insertCell();
                celda_actualizar.appendChild(btn_actualizar);

                //se agrego el boton para eliminar artículos
                let btn_eliminar = document.createElement('a');
                btn_eliminar.dataset.id_preguntaFrecuente = pregunta._id;
                btn_eliminar.innerHTML = '<i class="fas fa-trash-alt"></i>';

                //se llama a la función para eliminar articulos 
                btn_eliminar.addEventListener('click', function () {
                    eliminar_preguntaFrecuente(this.dataset.id_preguntaFrecuente);

                });
                let celda_eliminar = row.insertCell();
                celda_eliminar.appendChild(btn_eliminar);

                tabla_PreguntaFrecuente.appendChild(row);
            }
        } else {
            swal.fire({
                type: 'error',
                title: 'Error al traer listado de preguntas frecuentes',
                text: 'Ocurrió un error inesperado, por favor intente de nuevo'
            });
        }

    });

    request.fail(function (jqXHR, textStatus) {

    });


};


//Preguntas frecuentes generales 

let post_registrarPreguntaFrecuenteGeneral = (pPregunta, pRespuesta) => {
    let request = $.ajax({
            url: "http://localhost:4000/api/registrar_preguntaFrecuente_general",
            method: "POST",
            data: {
                pregunta: pPregunta,
                respuesta: pRespuesta,
                idCentroEducativo: "General"
            },
            dataType: "json",
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
        }

    );

    request.done(function (msg) {
        if (msg.exito) {
            swal.fire({
                type: 'success',
                title: 'Los datos fueron guardados exitosamente',
                text: 'Nos comunicaremos con usted tan pronto como sea posible'
            }).then((resultado) => {
                window.location.replace('listarPreguntasFrecuentesGenerales.html');
            });
        } else {
            swal.fire({
                type: 'error',
                title: 'Los datos no fueron guardados exitosamente',
                text: 'Error'
            });
        }
    });

    request.fail(function (jqXHR, textStatus) {
        swal.fire({
            type: 'error',
            title: 'Los datos no se lograron guardar',
            text: 'Error de conexión'
        });
    });
};


let get_ListarPreguntasFrecuentesGenerales = (tabla_PreguntaFrecuente) => {

    let request = $.ajax({
        url: "http://localhost:4000/api/obtener_preguntaFrecuente_general",
        method: "GET",
        data: {},
        dataType: "json",
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        async: false
    });

    request.done(function (res) {
        if (res.exito) {
            tabla_PreguntaFrecuente.innerHTML = '';
            for (let i = 0; i < res.preguntasFrecuentes.length; i++) {
                let row = document.createElement('tr');

                let slt_filtros = document.querySelector('#preguntas');
                let opt_pregunta = document.createElement('option');

                //Obtiene la pregunta
                let pregunta = res.preguntasFrecuentes[i];

                //Pregunta
                let cell = document.createElement('td');

                cell.innerHTML = pregunta.pregunta;

                row.appendChild(cell);

                opt_pregunta.setAttribute('value', pregunta.pregunta);
                slt_filtros.appendChild(opt_pregunta);

                //Respuesta
                cell = document.createElement('td');

                cell.innerHTML = pregunta.respuesta;

                row.appendChild(cell);

                //se agrego el boton para actualizar 
                let btn_actualizar = document.createElement('a');
                btn_actualizar.dataset.id_preguntaFrecuente = pregunta._id;
                btn_actualizar.innerHTML = '<i class="fas fa-pencil-alt"></i>';

                //se llama a la función para actualizar el articulo
                btn_actualizar.addEventListener('click',
                    function () {
                        Swal.fire({
                            title: 'Modificar pregunta frecuente',
                            html : `<input id="swal-input1" class="swal2-input" value = "${pregunta.pregunta}">`+
                            `<input id="swal-input2" class="swal2-input" value = "${pregunta.respuesta}">`,
                            showCancelButton: true,
                            preConfirm: () => {
                                let pregunta = document.querySelector('#swal-input1');
                                let respuesta = document.querySelector('#swal-input2');
                                if(pregunta.value == '' || respuesta.value == ''){
                                    Swal.showValidationMessage(
                                        `Por favor complete todos los campos requeridos`
                                      );
                                }
                                else{
                                    post_actualizarPreguntaFrecuente(pregunta.value, respuesta.value, this.dataset.id_preguntaFrecuente);    
                                    get_ListarPreguntasFrecuentesGenerales(Tabla_PreguntaFrecuente); 
                                }
                            }
                          })
                        
                        
                    }
                );
                let celda_actualizar = row.insertCell();
                celda_actualizar.appendChild(btn_actualizar);

                //se agrego el boton para eliminar artículos
                let btn_eliminar = document.createElement('a');
                btn_eliminar.dataset.id_preguntaFrecuente = pregunta._id;
                btn_eliminar.innerHTML = '<i class="far fa-trash-alt"></i>';

                //se llama a la función para eliminar articulos 
                btn_eliminar.addEventListener('click', function () {
                    eliminar_preguntaFrecuente(this.dataset.id_preguntaFrecuente);

                });
                let celda_eliminar = row.insertCell();
                celda_eliminar.appendChild(btn_eliminar);


                tabla_PreguntaFrecuente.appendChild(row);
            }
        } else {
            swal.fire({
                type: 'error',
                title: 'No se encontraron preguntas frecuentes'
            });
        }

    });

    request.fail(function (jqXHR, textStatus) {

    });


};


let post_actualizarPreguntaFrecuente = (pPregunta, pRespuesta, pIdPreguntaFrecuente) => {
    let request = $.ajax({
            url: "http://localhost:4000/api/actualizar_preguntaFrecuente",
            method: "POST",
            data: {
                pregunta: pPregunta,
                respuesta: pRespuesta,
                id: pIdPreguntaFrecuente
            },
            dataType: "json",
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
        }

    );

    request.done(function (msg) {
        if (msg.success) {
            swal.fire({
                type: 'success',
                title: 'Los datos fueron guardados exitosamente',
                text: 'Nos comunicaremos con usted tan pronto como sea posible'
            })
        } else {
            swal.fire({
                type: 'error',
                title: 'Los datos no fueron guardados exitosamente',
                text: 'Error'
            });
        }
    });

    request.fail(function (jqXHR, textStatus) {
        swal.fire({
            type: 'error',
            title: 'Los datos no se lograron guardar',
            text: 'Error de conexión'
        });
    });
};


// Get Listar Pregunta
let get_obtenerPreguntaFrecuente = (pId) => {

    let request = $.ajax({
        url: "http://localhost:4000/api/obtener_preguntaFrecuente",
        method: "POST",
        data: {
            id: pId
        },
        dataType: "json",
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        async: false
    });
    let preguntaFrecuente = "";
    request.done(function (res) {
        if (res.exito) {
            preguntaFrecuente = res.preguntaFrecuente;
        } else {
            swal.fire({
                type: 'error',
                title: 'Error al traer la pregunta frecuente',
                text: 'Ocurrió un error inesperado, por favor intente de nuevo'
            });
        }

    });

    request.fail(function (jqXHR, textStatus) {

    });

    return preguntaFrecuente;
};

//función para eliminar pregunta frecuente
let eliminar_preguntaFrecuente = (pId) => {
    let request = $.ajax({
        url: "http://localhost:4000/api/eliminar_preguntaFrecuente/",
        type: "POST",
        data: {
            id: pId
        },
        dataType: "json",
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        async: false
    });

    request.done(function (res) {
        let tabla = document.querySelector('#tbl_preguntasFrecuentes tbody');
        tabla.innerHTML = '';
        if (localStorage.getItem('tipoUsuario') == 'CentroEducativo') {
            get_ListarPreguntasFrecuentes(tabla, localStorage.getItem('id'));
        } else {
            get_ListarPreguntasFrecuentesGenerales(tabla);
        }
    });

    request.fail(function (jqXHR, textStatus) {

    });

};