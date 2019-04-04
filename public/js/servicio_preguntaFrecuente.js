'use strict';

//Preguntas frecuentes centro educativo
let post_registrarPreguntaFrecuente = (pPregunta, pRespuesta, pIdCentroEducativo) => {
    let request = $.ajax(
        {
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
            swal.fire(
                {
                    type: 'success',
                    title: 'Los datos fueron guardados exitosamente',
                    text: 'Nos comunicaremos con usted tan pronto como sea posible'
                }
            );
        } else {
            swal.fire(
                {
                    type: 'error',
                    title: 'Los datos no fueron guardados exitosamente',
                    text: 'Error'
                }
            );
        }
    }
    );
 
    request.fail(function (jqXHR, textStatus) {
        swal.fire(
            {
                type: 'error',
                title: 'Los datos no se lograron guardar',
                text: 'Error de conexión'
            }
        );
    }
    );
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
       async : false
     });
   
     request.done(function (res) {
        if(res.exito){
            for(let i = 0; i < res.preguntasFrecuentes.length; i++){
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

                //Acciones
                // cell = document.createElement('td');
                    
                // cell.innerHTML = '<>';
    
                // row.appendChild(cell);
    
    
                //Filtros
                

                tabla_PreguntaFrecuente.appendChild(row);
            }
        }
        else{
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
    let request = $.ajax(
        {
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
            swal.fire(
                {
                    type: 'success',
                    title: 'Los datos fueron guardados exitosamente',
                    text: 'Nos comunicaremos con usted tan pronto como sea posible'
                }
            );
        } else {
            swal.fire(
                {
                    type: 'error',
                    title: 'Los datos no fueron guardados exitosamente',
                    text: 'Error'
                }
            );
        }
    }
    );
 
    request.fail(function (jqXHR, textStatus) {
        swal.fire(
            {
                type: 'error',
                title: 'Los datos no se lograron guardar',
                text: 'Error de conexión'
            }
        );
    }
    );
};


let get_ListarPreguntasFrecuentesGenerales = (tabla_PreguntaFrecuente) => {
    
    let request = $.ajax({
      url: "http://localhost:4000/api/obtener_preguntaFrecuente_general",
      method: "GET",
      data: {},
      dataType: "json",
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      async : false
    });
  
    request.done(function (res) {
       if(res.exito){
           for(let i = 0; i < res.preguntasFrecuentes.length; i++){
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

               //Acciones
               // cell = document.createElement('td');
                   
               // cell.innerHTML = '<>';
   
               // row.appendChild(cell);
   
   
               //Filtros
               

               tabla_PreguntaFrecuente.appendChild(row);
           }
       }
       else{
           swal.fire({
               type: 'error',
               title: 'No se encontraron preguntas frecuentes'
             });
       }
      
    });
  
    request.fail(function (jqXHR, textStatus) {
      
    });
       
   
  };