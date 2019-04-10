'use strict';
const mongoose = require('mongoose');

let schema_rubro = new mongoose.Schema(
    {
        rubro : {type : String, required : true},
        valor : {type : Number, required : false}
    }
);

module.exports = mongoose.model('rubro_', schema_rubro);

 