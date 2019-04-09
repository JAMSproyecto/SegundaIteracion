'use strict';

const mongoose = require('mongoose');
const NombreTabla = 'lista_rubros_';

let schema_listaRubros = new mongoose.Schema(
    {
        id: { type: mongoose.Schema.Types.Number, require: true, index: true },
        rubro: { type: String, require: true }
    }
);

module.exports = mongoose.model(NombreTabla, schema_listaRubros);