'use strict';
/*se define el esquema de como se van a guardar los datos
  de los articulos*/
const mongoose = require('mongoose');
const NombreTabla = 'articulo_';

let schema_articulo = new mongoose.Schema(
    {
    nombre : {type : String, required : true},
    descripcion : {type : String, required : true}
    }
);

module.exports = mongoose.model(NombreTabla, schema_articulo);
