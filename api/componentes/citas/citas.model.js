'uset strict';

const mongoose = require('mongoose');

let shema_cita = new mongoose.Schema(
    {

        idCentro: { type: mongoose.Schema.Types.Number, require: true, index: true },
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

module.exports = mongoose.model('Cita', shema_cita);
