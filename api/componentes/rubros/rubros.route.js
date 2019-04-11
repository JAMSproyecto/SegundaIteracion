'use strict';
const express = require('express');
const router = express.Router();
const registro_rubro_api = require('./rubros.api');

router.param('id_rubro', function(req, res, next, id_rubro){
    req.body.id_rubro = id_rubro;
    next();
});

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

    router.route('/actualizar_Rubros')
    .post(
        function (req, res) {
            registro_rubro_api.actualizar_Rubros(req, res);
        }
    );
    


    router.route('/desactivar_Rubros')
.post(
    function(req , res){
        registro_rubro_api.desactivar(req, res);
    }
);

router.route('/activar_Rubros')
.post(
    function(req , res){
        registro_rubro_api.activar(req, res);
    }
);

module.exports = router;