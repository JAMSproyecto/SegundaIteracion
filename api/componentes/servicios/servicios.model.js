'use strict';
/*se define el esquema de como se van a guardar los datos
  de los servicios*/
  const mongoose = require('mongoose');
  const NombreTabla = 'servicio_';

  let schema_servicio = new mongoose.Schema(
      {
        nombre : {type : String, required : true},
        descripcion : {type : String, required : true }
      }
  );

  module.exports = mongoose.model(NombreTabla, schema_servicio);