'use strict';

const tabla = document.querySelector('#tbl_articulos tbody');
const input_filtrar = document.querySelector('#txt_filtrar');
const boton_agregar = document.querySelector('#btn_agregar');

let articulos = obtener_articulos();

//funcion para mostrar los articulos en la tabla 
let mostrar_datos = () =>{ 
    //variable para filtrar 
    let filtro = input_filtrar.value;
    //limpiar el html despues cada vez que filtra 
    tabla.innerHTML = '';

    for (let i = 0; i < articulos.length; i++) {
      //if para filtrar 
      if ((articulos[i]['nombre'].toLowerCase().includes(filtro.toLowerCase())) ||
         articulos[i]['descripcion'].toLowerCase().includes(filtro.toLowerCase())) {

        let fila = tabla.insertRow();
        fila.insertCell().innerHTML = articulos[i]['nombre'];
        fila.insertCell().innerHTML = articulos[i]['descripcion'];

        let input_cantidad = document.createElement('input');
        let input_seleccionar = document.createElement('input');

        input_cantidad.type = 'number';
        input_cantidad.min = '0';
        input_seleccionar.type = 'checkbox';
        input_seleccionar.value = articulos[i]['_id'];
        fila.insertCell().appendChild(input_cantidad);
        fila.insertCell().appendChild(input_seleccionar);
      }  
    }
};
input_filtrar.addEventListener('keyup', mostrar_datos);
mostrar_datos();



//función seleccionar los artículos que se quieren 
let seleccionar_articulos =() =>{
  let id_lista = localStorage.getItem('lista');
  let articulos_seleccionados = document.querySelectorAll('input[type=checkbox]:checked');
  console.log(articulos_seleccionados);
  let error =false;

  
  for (let i = 0; i < articulos_seleccionados.length; i++) {
   
    //se accede a ala celda de la cantidad (padre al hijo )
    let input_cantidad = articulos_seleccionados[i].parentNode.previousSibling.firstChild;
    if (input_cantidad.value == '' || input_cantidad.value <= 0) {
      input_cantidad.classList.add('error_input');
      error = true;
    }else{
     
      input_cantidad.classList.remove('error_input');
      //se llama al metodo de agregar articulo en el servicio lista utiles 
      //con el id de la lista, los articulos seleccionados y la cantidad
      agregar_articulo(id_lista,articulos_seleccionados[i].value, input_cantidad.value);
      articulos_seleccionados[i].checked = false;
      articulos_seleccionados[i].disabled =true;
      input_cantidad.value = '';
      input_cantidad.disabled = true;
    }
  }
  if(error || articulos_seleccionados.length <= 0){
    swal.fire({
      type: 'warning',
      title: 'Uno o más artículos no fueron registrados o seleccionados',
      text: 'Verifique los campos señalados en rojo o seleccione los artículos deseados'
    });
  }else{
    swal.fire({
      type: 'success',
      title: 'Artículos registrados',
      text: 'Todos los artículos fueron registrados con éxito'
    });
  }
  
 
};

btn_agregar.addEventListener('click', seleccionar_articulos);