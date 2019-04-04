'use strict';

const Mongoose = require('mongoose');
const AutoIncrementar = require('mongoose-plugin-autoinc');
const NombreTabla = 'centro_educativo_nivel_';

const schemaCEduNiveles = new Mongoose.Schema(
    {
		nivel: {
            type: Mongoose.Schema.Types.String,
            unique: true,
            required: true,
            trim: true,
            enum: ['Preescolar', 'Primaria', 'Secundaria', 'Superior']
        },
		activo: {type: Mongoose.Schema.Types.Boolean, required: true, default: true}
    }
);

schemaCEduNiveles.plugin(AutoIncrementar.plugin, {
    model: NombreTabla,
    field: '_id',
    startAt: 1,
    incrementBy: 1
});

module.exports = Mongoose.model(NombreTabla, schemaCEduNiveles);

