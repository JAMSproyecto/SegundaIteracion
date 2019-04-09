'use strict';

const tabla = document.querySelector('#tbl_rubros tbody');
const input_filtrar = document.querySelector('#txt_filtrar');
const boton_agregar = document.querySelector('#btn_agregar');

let rubros = listar_rubros();


let mostrar_datos = () =>{ 

    let filtro = input_filtrar.value;

    tabla.innerHTML = '';

    for (let i = 0; i < rubros.length; i++) {
      if ((rubros[i]['rubro'].toLowerCase().includes(filtro.toLowerCase()))) {
        let fila = tabla.insertRow();
        fila.insertCell().innerHTML = rubros[i]['rubro'];

        let input_seleccionar = document.createElement('input');

        input_seleccionar.type = 'checkbox';
        input_seleccionar.value = rubros[i]['_id'];
        fila.insertCell().appendChild(input_seleccionar);
      }  
    }
};
input_filtrar.addEventListener('keyup', mostrar_datos);
mostrar_datos();

 

let seleccionar_rubros =() =>{
  let id_lista_rubros = sessionStorage.getItem('id');

  console.log(id_lista_rubros);

  let rubros_seleccionados = document.querySelectorAll('input[type=checkbox]:checked');

  
  for (let i = 0; i < rubros_seleccionados.length; i++) {

      agregar_rubro(id_lista_rubros, rubros_seleccionados[i].value);
      rubros_seleccionados[i].checked = false;
      rubros_seleccionados[i].disabled =true;
    }

  if(rubros_seleccionados.length <= 0){
    swal.fire({
      type: 'warning',
      title: 'Error de selección',
      text: 'Debe de seleccionar al menos un rubro a evaluar'
    });
  }else{
    swal.fire({
      type: 'success',
      title: 'Rubros registrados',
      text: 'Todos los rubros fueron registrados con éxito'
    });
  }

 
};

btn_agregar.addEventListener('click', seleccionar_rubros);
