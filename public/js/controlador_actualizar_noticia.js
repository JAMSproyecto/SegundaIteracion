'use strict';
const input_tema = document.querySelector('#txt_tema');
const input_informacion = document.querySelector('#txt_informacion');
const boton_actualizar = document.querySelector('#btn_actualizar');


let get_param = (param) => {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var id = url.searchParams.get(param);

    return id;
}

let id = get_param('idCentro');

console.log(id);

let noticia = buscar_noticia(id);
if (noticia) {
    input_tema.value = noticia[0]['tema'];
    input_informacion.value = noticia[0]['informacion'];
    
}else{
    console.log('noticia: ', noticia);
}
let obtener_datos = () => {
    let tema = input_tema.value;
    let informacion = input_informacion.value;

    actualizar_noticia(tema, informacion, id);
};


boton_actualizar.addEventListener('click', obtener_datos, false);
