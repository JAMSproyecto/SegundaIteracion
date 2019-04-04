'use strict';
/*se define el esquema de como se van a guardar las etiqeutas*/
const mongoose = require('mongoose');

let schema_etiqueta = new mongoose.Schema(
    {
    nombre : {type : String, unique : true, required : true}
    }
);

module.exports = mongoose.model('Etiqueta',schema_etiqueta);