'use strict';

const express = require('express');
const router= express.Router();
const lista_rubros_api = require('./listaEvaluacionMEP.api');

router.param('id_Admin', function(req,res, next , pid){
    req.body.id_Admin = pid;

    next();
}
);

router.route('/agregar_Rubros')
        .post(
            function(req, res)
            {
             lista_rubros_api.agregar_Rubros(req, res);
            }
        );

        module.exports = router;

        router.route('/crear_Lista')
        .post(
            function(req, res)
            {
             lista_rubros_api.crear_Lista(req, res);
            }
        );

        
        router.route('/listar_rubros_seleccionados/:id_Admin')
        .get(
            function(req, res)
            {
             lista_rubros_api.listar_rubros_seleccionados(req, res);
            }
        );


        module.exports = router;