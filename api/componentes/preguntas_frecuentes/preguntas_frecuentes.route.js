'use strict';
const express = require('express');
const router = express.Router();
const pregunta_frecuente_api = require('./preguntas_frecuentes.api');

router.route('/registrar_preguntaFrecuente_centroEducativo')
    .post(
        function (req, res) {
            pregunta_frecuente_api.registrar_PreguntaFrecuente_CentroEducativo(req, res);
        }
    );

router.route('/obtener_preguntaFrecuente_centroEducativo')
    .post(
        function (req, res) {
            pregunta_frecuente_api.obtener_PreguntaFrecuente_CentroEducativo(req, res);
        }
    );


router.route('/registrar_preguntaFrecuente_general')
    .post(
        function (req, res) {
            pregunta_frecuente_api.registrar_PreguntaFrecuente_General(req, res);
        }
    );

router.route('/obtener_preguntaFrecuente_general')
    .get(
        function (req, res) {
            pregunta_frecuente_api.obtener_PreguntaFrecuente_General(req, res);
        }
    );
module.exports = router;