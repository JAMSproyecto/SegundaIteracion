'use strict';
/*se definen las rutas */
const express = require('express');
const router = express.Router();
const servicio_api = require('./servicios.api');

/*es metodo nos permite buscar un parametro que viene dentro de url del end point 
 sacandolo del url(header) y metiendolo en el cuerpo para poderlo usar*/
 router.param('id', function(req,res, next, id){
    req.body.id = id;

    next();
    }
);

router.route('/registrar_servicio')
    .post(
        function(req, res){
            servicio_api.registrar(req, res);
        }
    );

module.exports = router;