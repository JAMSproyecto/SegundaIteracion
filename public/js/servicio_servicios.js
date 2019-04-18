'usea strict';


//función para registrar los datos con su respectiva ruta
let registrar_servicio = (pnombre, pdescripcion, pEnviaResultado) => {

    //NOTA: pEnviaResultado es una función que viene como parámetro para enviar el resultado al controlador.
    // La función pEnviaResultado recibe sus propios parámetros (en el controlador): success, msg.
  
    let request = $.ajax({
      url: "http://localhost:4000/api/registrar_servicio",
      method: "POST",
      data: {
        codigo : localStorage.getItem('id'),
        nombre: pnombre,
        descripcion: pdescripcion
      },
      dataType: "json",
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
    });
  
    request.done(function (res) {
  
      //Enviamos los resultados que el api retornó, al controlador:
      //Ejecutamos la función pEnviaResultado y le enviamos los propios parámetros:
      pEnviaResultado(res.success, res.msg);
  
    });
  
    request.fail(function (jqXHR, textStatus) {
      pEnviaResultado(false, 'Ocurrió un error inesperado, por favor intente de nuevo');
    });
  };