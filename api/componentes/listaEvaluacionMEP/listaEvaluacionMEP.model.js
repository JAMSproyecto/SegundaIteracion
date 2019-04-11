'use strict';

const mongoose = require('mongoose');
const NombreTabla = 'lista_rubros_';

let schema_listaRubros = new mongoose.Schema(
    {
        id_Admin: {type : String, required : true},
        rubros: [
            {
                rubros : {type : String},
                estado : {type: Boolean}
            }
        ]
    }
);

module.exports = mongoose.model(NombreTabla, schema_listaRubros);