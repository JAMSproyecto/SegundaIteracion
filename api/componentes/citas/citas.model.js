'uset strict';

const mongoose = require('mongoose');

let schema_cita = new mongoose.Schema(
    {

        Nombre: { type: String, required: true },
        Apellidos: { type: String, required: true },
        Telefono: { type: String, required: true },
        Correo: { type: String, required: true },
        Fecha: { type: String, required: true },
        Hora: { type: String, required: true },
        Motivo: { type: String, required: true },
        Comentario: { type: String, require: true },
        Centro_asociado: { type: String, require: true }

    }
);

module.exports = mongoose.model('Cita', schema_cita);
