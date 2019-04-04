'use strict';

const Mongoose = require('mongoose');
const TiposEsquema = Mongoose.Schema.Types;
const AutoIncrementar = require('mongoose-plugin-autoinc');
const NombreTabla = 'usuarios_';

let schemaUsuarios = new Mongoose.Schema(
    {
        correo: {
            type: TiposEsquema.String,
            required: true,
            unique: true,
            trim: true
        },
        contrasena: {
            type: TiposEsquema.String,
            required: false,
            trim: true,
            default: ''
        },
        tipo: {
            type: TiposEsquema.String,
            required: true,
            trim: true,
            enum: ['SuperAdmin', 'CentroEducativo', 'PadreFamilia']
        },
        aprobado: {
            type: TiposEsquema.Boolean,
            required: true,
            default: false
        },
        activo: {
            type: TiposEsquema.Boolean,
            required: true,
            default: false
        },
        pin: {
            type: TiposEsquema.String,
            trim: true,
            required: true
        },
        fechaCreado: {
            type: TiposEsquema.String,
            trim: true,
            required: true
        },
        fechaActualizado: {
            type: TiposEsquema.String,
            trim: true,
            required: false,
            default: ''
        }
    }
);

schemaUsuarios.plugin(AutoIncrementar.plugin, {
    model: NombreTabla,
    field: '_id',
    startAt: 1,
    incrementBy: 1
});

module.exports = Mongoose.model(NombreTabla, schemaUsuarios);

