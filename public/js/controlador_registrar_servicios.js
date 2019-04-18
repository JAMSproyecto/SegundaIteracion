'use strict';

//constantes que obtienen los datos del formulario
const input_nombre = document.querySelector('#txt_nombre');
const input_descripcion = document.querySelector('#txt_descripcion');
const boton_agregar = document.querySelector('#btn_agregar');


let mostrarAlerta = (mensaje, input) => {
  if (input) {
    input.classList.add('error_input');
  }
  Swal.fire({
    title: mensaje,
    type: 'warning',
    position: 'center',
    //timer: 7000,
    showConfirmButton: true,
    onAfterClose: () => {
      if (input) {
        input.focus();
      }
    }
  });
};

//función que envia los datos al servicio 
let enviarDatos = () => {

  const nombre = input_nombre.value.trim();
  const descripcion = input_descripcion.value.trim();

  if (nombre == '') {
    mostrarAlerta('Digite el nombre del servicio', input_nombre);
    return false;
  } else {
    input_nombre.classList.remove('error_input');
  }

  if (descripcion == '') {
    mostrarAlerta('Digite la descripción del servicio', input_descripcion);
    return false;
  } else {
    input_descripcion.classList.remove('error_input');
  }

  registrar_servicio(nombre, descripcion,
    function (success, msg) {

      //Aquí llegan los resultados que el servicio envía a travez de pEnviaResultado.
      //Los propios parámetros de pEnviaResultado son (success, msg):
      //success es un boolean
      //msg es un string

      if (success) {
        Swal.fire({
          title: '¡' + msg + '!',
          text: '¿Desea agregar otro servicio?',
          type: 'question',
          customClass: {
            icon: 'swal2-spanish-question-mark'
          },
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: false,
          onAfterClose: () => {
            input_nombre.value = '';
            input_descripcion.value = '';
            input_nombre.select();
            input_nombre.focus();
          }
        }).then((result) => {
          if (result.value) { } else {
            location.href = 'listar_servicios.html';
          }
        });
      } else {
        swal.fire({
          type: 'error',
          title: '¡El servicio no fue registrado!',
          text: msg
        });
      }
    });
};

//evento para agregar los datos
if (boton_agregar) {
  boton_agregar.addEventListener('click', enviarDatos);
}

window.onload = () => {
  if (input_nombre) {
    input_nombre.select();
    input_nombre.focus();
  }
};

