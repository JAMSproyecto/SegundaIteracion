'use strict';
const mongoose = require('mongoose');

let schema_noticia = new mongoose.Schema(
    {
        idCentro: {type: Number, ref: 'centro_educativo_', required: true},
        tema : {type : String, required : true},
        noticia : {type : String, required: true},
        autor : {type: String, required: false},
        fecha : {type: String, required: true},
        informacion : {type : String, required : true}
    }
);

module.exports = mongoose.model('noticia_', schema_noticia);