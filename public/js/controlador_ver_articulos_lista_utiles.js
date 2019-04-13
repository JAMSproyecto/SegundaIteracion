'use strict';

//variable para agregar los datos a la tabla dinamicamente
const tabla = document.querySelector('#tbl_articulos tbody');
//variables para agregarlos titulos dnamicamente 
const titulo = document.querySelector('#titulo');
const titulo2 = document.querySelector('#titulo2');
const input_filtrar = document.querySelector('#txt_filtrar');
//variable para guardar información por tiempo indefinido, en este caso el id de lista Utiles
let id_lista = localStorage.getItem('lista');
// se envia el id de lista utiles, por parametro a la función en el api, para traer el id del articulo
let lista = buscar_por_id(id_lista);

//función para mostrar los articulos agregados dentro lista utiles
let mostrar_datos = () => {
  let filtro = input_filtrar.value;
  tabla.innerHTML = '';
  for (let i = 0; i < lista[0]['articulos'].length; i++) {
    let fila = tabla.insertRow();
    //se inserta el nombre de la base de datos dinamicamente 
    titulo2.innerHTML = lista[0]['nombre'];
    titulo.innerHTML = lista[0]['anno'];

    /*llamar al servicio de articulos funcion buscar articulo por id y pasarle
      el id del articulo que viene en lista[0]['articulos'][i]['_id']*/
    let articulo = buscar_articulo_por_id(lista[0]['articulos'][i]['codigo']);


    if (articulo[0]['nombre'].toLowerCase().includes(filtro.toLowerCase()) ||
      articulo[0]['descripcion'].toLowerCase().includes(filtro.toLowerCase())) {
      fila.insertCell().innerHTML = articulo[0]['nombre'];
      fila.insertCell().innerHTML = articulo[0]['descripcion'];
      fila.insertCell().innerHTML = lista[0]['articulos'][i]['cantidad'];

      //boton de modificar la cantidad de articulos 
      let btn_modificar = document.createElement('a');
      btn_modificar.dataset.id_articulo = articulo[0]['_id'];
      btn_modificar.href = '#';
      btn_modificar.classList.add('fas', 'fa-pencil-alt');

      //funcion para modificar articulos de la lista de utiles 
      btn_modificar.addEventListener('click', function () {
        Swal.fire({
          title: 'Realice los cambios necesarios',
          input: 'text',
          inputValue: lista[0]['articulos'][i]['cantidad'],
          showCancelButton: true,
          inputValidator: (value) => {
            if (!value) {
              return 'Por favor ingrese algún dato'
            } else {
              modificar_articulos_de_lista_utiles(this.dataset.id_articulo, value);
              lista = buscar_por_id(id_lista);
              mostrar_datos();
            }
          }
        })
      });
      fila.insertCell().appendChild(btn_modificar);

      //boton para eliminar articulos de lista de utiles 
      let btn_eliminar = document.createElement('a');
      btn_eliminar.dataset.id_articulo = articulo[0]['_id'];
      btn_eliminar.href = '#';
      btn_eliminar.classList.add('fas', 'fa-trash-alt');
      btn_eliminar.addEventListener('click', eliminar_articulos);
      fila.insertCell().appendChild(btn_eliminar);
    }

  }
};

input_filtrar.addEventListener('keyup', mostrar_datos);
mostrar_datos();

//funcion de eliminar 
function eliminar_articulos() {
  Swal.fire({
    title: '¿Está seguro que desea eliminar?',
    text: "Ésta acción no se puede revertir",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '¡Sí, estoy seguro!'
  }).then((result) => {
    if (result.value) {
      eliminar_articulo_de_lista_utiles(this.dataset.id_articulo);
      lista = buscar_por_id(id_lista);
      mostrar_datos();
      Swal.fire(
        '¡Artículo eliminado!',
        'La lista ya no posee éste artículo',
        'success'
      )
    }
  })



};



