'use strict';

const express = require('express');
const router =  express.Router();
const registrar_etiqueta_api = require('./etiquetas.api');


router.route('/registrar_etiqueta')
    .post(
        function(req, res){
            registrar_etiqueta_api.registrar_etiqueta(req, res);
        }
    );
 

module.exports = router;