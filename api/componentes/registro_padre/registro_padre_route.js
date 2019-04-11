'use strict';
const express = require('express');
const router = express.Router();
const registro_Padre_Api = require('./registro_padre_api');

router.param('idPadre', function(req,res, next, pIdPadre){
    req.body.idPadre = pIdPadre;

    next();
    }

);

router.route('/registrar_Padre')
    .post(
        function (req, res) {
            registro_Padre_Api.registrar_Padre(req, res);
        }
    );

router.route('/listar_Padres')
    .get(
        function (req, res) {
            registro_Padre_Api.listar_Padres(req, res);
        }
    );



    router.route('/buscar_padre/:idPadre')
    .get(
        function (req, res) {
            registro_Padre_Api.buscar_padre(req, res);
        }
    ); 

    router.route('/actualizar_Padre')
    .post(
        function (req, res) {
            registro_Padre_Api.actualizar(req, res);
        }
    );
    

module.exports = router;