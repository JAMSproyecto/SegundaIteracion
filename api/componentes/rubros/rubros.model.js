'use strict';
const mongoose = require('mongoose');

let schema_rubro = new mongoose.Schema(
    {
        rubro : {type : String, required : true},
    }
);

module.exports = mongoose.model('rubro_', schema_rubro);

 