'use strict';

const Mongoose = require('mongoose');
const TiposEsquema = Mongoose.Schema.Types;
const NombreTabla = 'calificacion_padre_';

// El padre califica al centro educativo y adicionalmente puede realizar un comentario.

let schemaCalificacion = new Mongoose.Schema({
	idPadre: { type: TiposEsquema.Number, ref: 'padres_familia_', required: true },
	idCentro: { type: TiposEsquema.Number, ref: 'centro_educativo_', required: true },
	calificacion: { type: TiposEsquema.Number, min: 0, max: 5, default: 0, required: true },
	comentario: { type: TiposEsquema.String, default: '', trim: true, required: false },
	fecha: { type: TiposEsquema.String, required: true },
	
	//eliminado es sólo para el comentario, no para eliminar toda la calificación
	eliminado: { type: TiposEsquema.Boolean, default: false, required: false }
});

module.exports = Mongoose.model(NombreTabla, schemaCalificacion);

