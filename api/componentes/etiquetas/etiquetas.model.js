'use strict';
/*se define el esquema de como se van a guardar las etiqeutas*/
const mongoose = require('mongoose');

let model_etiqueta = new mongoose.Schema(
    {
    nombre : {type : String, unique : true, required : true}
    }
);

module.exports = mongoose.model('etiqueta_', model_etiqueta); 