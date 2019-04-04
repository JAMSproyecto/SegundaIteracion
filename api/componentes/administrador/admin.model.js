'use strict';

const Mongoose = require('mongoose');
const TiposEsquema = Mongoose.Schema.Types;
const AutoIncrementar = require('mongoose-plugin-autoinc');
const NombreTabla = 'administrador_';

let schemaAdmin = new Mongoose.Schema(
    {
        correo: {
            type: TiposEsquema.String,
            required: true,
            unique: true,
            trim: true
        },
        nombre1: {
            type: TiposEsquema.String,
            required: true,
            trim: true,
        },
        nombre2: {
            type: TiposEsquema.String,
            required: false,
            trim: true,
            default: ''
        },
        apellido1: {
            type: TiposEsquema.String,
            required: true,
            trim: true
        },
        apellido2: {
            type: TiposEsquema.String,
            required: false,
            trim: true,
            default: ''
        },
        telefono: {
            type: TiposEsquema.Number,
            required: true
        },
		extension: {
            type: TiposEsquema.Number,
            required: false,
            default: 0
        },
        puesto: {
            type: TiposEsquema.String,
            required: true,
            trim: true,
        }
    }
);

schemaAdmin.plugin(AutoIncrementar.plugin, {
    model: NombreTabla,
    field: '_id',
    startAt: 1,
    incrementBy: 1
});

module.exports = Mongoose.model(NombreTabla, schemaAdmin);

