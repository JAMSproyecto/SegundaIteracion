'use strict';
const express = require('express');
const router = express.Router();
const registrarCalificacionMEP_api = require('./calificacionMep.api');

router.param('idCentro', function(req,res, next, pidCentro){
    req.body.idCentro = pidCentro;

    next();
    }

);

router.route('/registrar_calificacionMEP')
    .post(
        function (req, res) {
            registrarCalificacionMEP_api.registrar_calificacionMEP(req, res);
        }
    );


    router.route('/listar_calificacionMEP/:idCentro') 
    .get(
        function (req, res) {
            registrarCalificacionMEP_api.listar_calificacionMEP(req, res);
        }
    );





    module.exports = router;