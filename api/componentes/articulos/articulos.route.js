'use strict';

const express = require('express');
const router = express.Router();
const articulo_api = require('./articulos.api');

/*es metodo nos permite buscar un parametro que viene dentro de url del end point 
 sacandolo del url y metiendolo en el cuerpo para poderlo usar*/
router.param('id', function(req,res, next, id){
    req.body.id = id;

    next();
    }
);

router.route('/registrar_articulo')
    .post(
        function(req, res){
            articulo_api.registrar(req,res);
        }
    );

router.route('/obtener_articulos')
        .get(
            function(req , res)
            {
                articulo_api.listar_todos(req,res);
            }
        );

//este metodo le dice que busque el articulo por ese id  que se le mando por parametro 
router.route('/buscar_articulo_por_id/:id')
            .get(
                function(req, res){
                 articulo_api.buscar_por_id(req, res);
                }
            );

//para actualizar 
router.route('/actualizar_articulo')
    .post(
        function(req, res){
            articulo_api.actualizar(req,res);
        }
    );
    
//para activar o desactivar artículos
router.route('/activar_desactivar_articulo')
    .post(
        function(req, res){
            articulo_api.activar_desactivar(req,res);
        }
    );

//para eliminar articulos 
router.route('/eliminar_articulo/:id')
            .get(
                function(req, res){
                 articulo_api.eliminar_articulo(req, res);
                }
            );


module.exports = router;

