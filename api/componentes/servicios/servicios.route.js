'use strict';
/*se definen las rutas */
const express = require('express');
const router = express.Router();
const servicio_api = require('./servicios.api');

/*este metodo nos permite buscar un parametro que viene dentro de url del end point 
 sacandolo del url(header) y metiendolo en el cuerpo para poderlo usar*/
 router.param('codigo', function(req,res, next, codigo){
    req.body.codigo = codigo;

        next();
     }
    );

router.route('/registrar_servicio')
    .post(
        function(req, res){
            servicio_api.registrar_servicio(req, res);
        }
    );

router.route('/obtener_servicios_id/:codigo')
        .get(
            function(req,res)
            {
                servicio_api.obtener_servicios_id(req,res);
            }
        );


router.route('/obtener_nombre_centro_id/:codigo')
            .get(
              function(req,res) 
              {
                  servicio_api.obtener_nombre_centro_id(req,res);
              } 
            );

//end point para modificar la lista de utiles 
router.route('/modificar_servicios')
            .post(
                function(req, res)
                {
                 servicio_api.modificar_servicios(req, res);
                }
            );

//para eliminar servicios
router.route('/eliminar_servicios/:codigo')
            .get(
                function(req, res){
                 servicio_api.eliminar_servicio(req, res);
                }
            );

module.exports = router;