'use strict';

const express = require('express');
const router = express.Router();
const registrar_etiqueta_api = require('./listaetiquetasCentro.api');

router.param('idCentro', function (req, res, next, idCentro) {

    req.body.idCentro = idCentro;
    next();

});

router.route('/registrar_lista_etiqueta')
    .post(
        function (req, res) {
            registrar_etiqueta_api.registrar_etiqueta(req, res);
        }
    );

    router.route('/lista_etiquetas_en_centro/:idCentro')
    .get(
        function (req, res) {
            registrar_etiqueta_api.lista_etiquetas_centro(req, res);
        }
    );


router.route('/agregar_a_lista_etiqueta')
    .post(
        function (req, res) {
            registrar_etiqueta_api.agregar_etiquetas(req, res);
        }
    );


router.route('/remover_a_lista_etiqueta')
    .post(
        function (req, res) {
            registrar_etiqueta_api.remover_etiquetas(req, res);
        }
);

module.exports = router;


