'use strict';
const express = require('express');
const router = express.Router();
const registrarCalificacionMEP_api = require('./calificacionMep.api');

router.param('id', (req, res, next, id) => {
    req.body.id = id;
    next();
});


router.route('/registrar_calificacionMEP')
    .post(
        function (req, res) {
            registrarCalificacionMEP_api.registrar_calificacionMEP(req, res);
        }
    );


    module.exports = router;