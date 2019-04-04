'use strict';

const mongoose = require('mongoose');
const NombreTabla = 'lista_utiles_';

let schema_utiles = new mongoose.Schema(
    {  
        codigo :{type : mongoose.Schema.Types.Number, require : true, index : true},
        tipo: {type :String, required : true},
        nombre : {type : String, required : true},
        anno : {type : String, required : false},
        articulos : [
            {
                codigo : {type : String},
                descripcion : {type : String},
                cantidad :{type : Number}
            }
        ]
    }
);

module.exports = mongoose.model(NombreTabla, schema_utiles);