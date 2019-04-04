'use strict';

const Mongoose = require('mongoose');
const NombreTabla = 'bitacora_';

let schemaBitacora = new Mongoose.Schema({
    accion: {type: Mongoose.Schema.Types.String, required: true, trim: true},
    realizadaPor: {
        type: Mongoose.Schema.Types.String, required: true, trim: true,
        enum: ['Instalador', 'SuperAdmin', 'CentroEducativo', 'PadreFamilia']
    },
    fecha: {type: Mongoose.Schema.Types.String, trim: true, required: true}
});
module.exports = Mongoose.model(NombreTabla, schemaBitacora);

