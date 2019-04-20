'use strict';
const express = require('express');
const router = express.Router();
const registrar_actividad_api = require('./registrar_actividad.api');

router.param('idCentro', function(req,res, next, idCentro){
    req.body.idCentro = idCentro;

    next();
});

router.route('/registrar_actividad')
    .post(
        function (req, res) {
            registrar_actividad_api.registrar_actividad(req, res);
        }
    );

router.route('/actualizar_actividad')
    .post(
        function (req, res) {
            registrar_actividad_api.actualizar_actividad(req, res);
        }
    );

router.route('/listar_todas_actividades/:idCentro') 
    .get(
        function (req, res) {
            registrar_actividad_api.listar_todas_actividades(req, res);
        }
    );



router.route('/buscar_actividad/:idCentro')
    .get(
        function (req, res) {
            registrar_actividad_api.buscar_por_id(req, res);
        }
    );



    router.route('/eliminar_actividad')
    .post(
        function (req, res) {
            registrar_actividad_api.eliminar(req, res);
        }
    );

module.exports = router;