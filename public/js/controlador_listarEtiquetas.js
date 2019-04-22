'use strict';

const tabla = document.querySelector('#tabla_etiquetas tbody');
const input_filtrar = document.querySelector('#txt_filtrar');


let etiquetasRegistradas = listar_etiquetas();



let mostrar_datos = () => {
    let filtros = input_filtrar.value;
    tabla.innerHTML = '';
    for (let i = 0; i < etiquetasRegistradas.length; i++) {

        if (etiquetasRegistradas[i]['nombre'].toLowerCase().includes(filtros.toLowerCase())) {

            let fila = tabla.insertRow();

            fila.insertCell().innerHTML = etiquetasRegistradas[i]['nombre'];

            let boton_editar = document.createElement('a');
            boton_editar.innerHTML = '<i class="fas fa-pencil-alt"></i>';
            boton_editar.dataset.id_etiquetas = etiquetasRegistradas[i]['_id'];

            let boton_eliminar = document.createElement('a');
            boton_eliminar.innerHTML = '<i class="fas fa-trash-alt"></i>';
            boton_eliminar.dataset.id_etiquetas = etiquetasRegistradas[i]['_id'];

            fila.insertCell().appendChild(boton_editar);
            boton_editar.addEventListener('click', function () {
              Swal.fire({
                title: 'Realice los cambios necesarios',
                input: 'text',
                inputValue: etiquetasRegistradas[i]['nombre'],
                showCancelButton: true,
                inputValidator: (value) => {
                  if (!value) {
                    return 'Por favor ingrese algún dato';
                  } else {
                    actualizar_etiqueta(this.dataset.id_etiquetas, value);
                  }
                }
              })
    
              etiquetasRegistradas = listar_etiquetas();
                mostrar_datos();
            })

            fila.insertCell().appendChild(boton_eliminar);
            boton_eliminar.addEventListener('click', function () {
                Swal.fire({
                  title: '¿Estas seguro de eliminar el rubro?',
                  text: "Los cambios no serán revertidos",
                  type: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  cancelButtonText: 'No, deseo regresar',
                  confirmButtonText: 'Si, estoy seguro'
                }).then((result) => {
                  if (result.value) {
                    eliminar_etiqueta(this.dataset.id_etiquetas);
                  }
                })
      
                etiquetasRegistradas = listar_etiquetas();
                mostrar_datos();
      
              })

        }
    }
};

input_filtrar.addEventListener('keyup', mostrar_datos);
    mostrar_datos();