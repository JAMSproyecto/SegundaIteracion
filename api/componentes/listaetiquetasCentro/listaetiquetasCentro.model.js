'use strict';

const mongoose = require('mongoose');

let model_lista_etiqueta = new mongoose.Schema(
    {
        idCentro: {type: Number, ref: 'centro_educativo_', required: true, unique:true},
        etiquetas: [{
            _id: { type: String, required: true },
            nombre: { type: String, required: true}
        }]
    }
);

module.exports = mongoose.model('lista_etiquetas_por_centro_', model_lista_etiqueta); 