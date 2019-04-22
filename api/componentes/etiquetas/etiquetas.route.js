'use strict';

const express = require('express');
const router = express.Router();
const registrar_etiqueta_api = require('./etiquetas.api');


router.route('/registrar_etiqueta')
    .post(
        function (req, res) {
            registrar_etiqueta_api.registrar_etiqueta(req, res);
        }
    );

router.route('/listar_etiquetas_en_admin')
    .get(
        function (req, res) {
            registrar_etiqueta_api.listar_etiquetas(req, res);
        }
    );

router.route('/eliminar_etiqueta')
    .post(
        function (req, res) {
            registrar_etiqueta_api.eliminar_etiquetas(req, res);
        }
    );

router.route('/actualizar_etiqueta')
    .post(
        function (req, res) {
            registrar_etiqueta_api.actualizar_etiquetas(req, res);
        }
    );

module.exports = router;