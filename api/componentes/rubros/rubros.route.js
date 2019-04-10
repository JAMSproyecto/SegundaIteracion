'use strict';
const express = require('express');
const router = express.Router();
const registro_rubro_api = require('./rubros.api');

/*
router.param('idPadre', function(req,res, next, pIdPadre){
    req.body.idPadre = pIdPadre;

    next();
    }

);*/

router.route('/registrar_Rubro')
    .post(
        function (req, res) {
            registro_rubro_api.registrar_Rubro(req, res);
        }
    ); 

router.route('/listar_Rubros')
    .get(
        function (req, res) {
            registro_rubro_api.listar_Rubros(req, res);
        }
    );



  /*  router.route('/buscar_padre/:idPadre')
    .get(
        function (req, res) {
            registro_rubro_api.buscar_Rubro(req, res);
        }
    ); */

    router.route('/actualizar_Rubros')
    .post(
        function (req, res) {
            registro_rubro_api.actualizar_Rubros(req, res);
        }
    );
    

module.exports = router;