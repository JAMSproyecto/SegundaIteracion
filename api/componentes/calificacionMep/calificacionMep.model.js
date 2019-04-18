'use strict';
const mongoose = require('mongoose');

let schema_calificacionMEP = new mongoose.Schema(
    {
        idCentro: {type: Number, ref: 'centro_educativo_', required: true},
        calificacionTotal : {type : String, required : true},
        rubro1 : {type : String, required: true},
        calificacionRubro1 : {type : Number, required: true},
        rubro2 : {type : String, required: true},
        calificacionRubro2 : {type : Number, required: true},
        rubro3 : {type : String, required: true},
        calificacionRubro3 : {type : Number, required: true},
        rubro4 : {type : String, required: true},
        calificacionRubro4 : {type : Number, required: true},
        rubro5 : {type : String, required: true},
        calificacionRubro5 : {type : Number, required: true},
        rubro6 : {type : String, required: true},
        calificacionRubro6 : {type : Number, required: true},
        rubro7 : {type : String, required: true},
        calificacionRubro7 : {type : Number, required: true},
        rubro8 : {type : String, required: true},
        calificacionRubro8 : {type : Number, required: true},
        rubro9 : {type : String, required: true},
        calificacionRubro9 : {type : Number, required: true},
        rubro10 : {type : String, required: true},
        calificacionRubro10 : {type : Number, required: true},
        estado : {type : String, required: true}
    }
);

module.exports = mongoose.model('calificacionMEP_', schema_calificacionMEP);