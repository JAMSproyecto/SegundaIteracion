'use strict';

const tabla = document.querySelector('#tbl_rubros tbody');
const tabla_inactivos = document.querySelector('#tbl_rubros_inactivos tbody');
const input_filtrar = document.querySelector('#txt_filtrar');
const input_filtrar_inactivos = document.querySelector('#txt_filtrar_inactivos');
let cantidad_activos = 0;

let rubros = listar_rubros();


let mostrar_datos = () => {



  let filtro = input_filtrar.value;
  let filtro_inactivos = input_filtrar_inactivos.value;

  cantidad_activos = 1;


  tabla.innerHTML = '';
  tabla_inactivos.innerHTML = '';

  for (let i = 0; i < rubros.length; i++) {

    if (rubros[i]['estado'] == 'Activo') {
      if ((rubros[i]['rubro'].toLowerCase().includes(filtro.toLowerCase()))) {
        let fila = tabla.insertRow();
        fila.insertCell().innerHTML = rubros[i]['rubro'];

        let boton_desactivar = document.createElement('a');
        boton_desactivar.innerHTML = '<i class="fas  desactivo fa-user-minus"></i>';
        boton_desactivar.dataset.id_rubro = rubros[i]['_id'];
        fila.insertCell().appendChild(boton_desactivar);
        boton_desactivar.addEventListener('click', function () {
          desactivar_rubro(this.dataset.id_rubro);
          rubros = listar_rubros();
          mostrar_datos();
         
        });
        cantidad_activos++;
      }
    } else {
      if ((rubros[i]['rubro'].toLowerCase().includes(filtro_inactivos.toLowerCase()))) {
        let fila_inactivos = tabla_inactivos.insertRow();
        fila_inactivos.insertCell().innerHTML = rubros[i]['rubro'];


        let boton_activar = document.createElement('a');
        boton_activar.innerHTML = '<i class="fas fa-user-plus"></i>';
        boton_activar.dataset.id_rubro = rubros[i]['_id'];

        let boton_editar = document.createElement('a');
        boton_editar.innerHTML = '<i class="fas fa-pencil-alt"></i>';
        boton_editar.dataset.id_rubro = rubros[i]['_id'];

        let boton_eliminar = document.createElement('a');
        boton_eliminar.innerHTML = '<i class="fas fa-trash-alt"></i>';
        boton_eliminar.dataset.id_rubro = rubros[i]['_id'];

        fila_inactivos.insertCell().appendChild(boton_editar);
        boton_editar.addEventListener('click', function () {
          Swal.fire({
            title: 'Realice los cambios necesarios',
            input: 'text',
            inputValue: rubros[i]['rubro'],
            showCancelButton: true,
            inputValidator: (value) => {
              if (!value) {
                return 'Por favor ingrese algún dato'
              } else {
                actualizar_rubro(value, this.dataset.id_rubro);
              }
            }
          })

          rubros = listar_rubros(),
            mostrar_datos()
        }
        )

        fila_inactivos.insertCell().appendChild(boton_eliminar);
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
              eliminar_rubro(this.dataset.id_rubro);
            }
          })

          rubros = listar_rubros();
          mostrar_datos();

        })

        fila_inactivos.insertCell().appendChild(boton_activar);
        boton_activar.addEventListener('click', function () {
          activar_rubro(this.dataset.id_rubro, cantidad_activos);
          rubros = listar_rubros();
          mostrar_datos();
        })
      }
    }
  }
};

input_filtrar.addEventListener('keyup', mostrar_datos);
input_filtrar_inactivos.addEventListener('keyup', mostrar_datos);
mostrar_datos();



