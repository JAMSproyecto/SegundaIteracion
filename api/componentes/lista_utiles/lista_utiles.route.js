'use strict';

const express = require('express');
const router= express.Router();
const lista_utiles_api = require('./lista_utiles.api');

/*este metodo nos permite buscar un parametro que viene dentro de url del end point 
 sacandolo del url(header) y metiendolo en el cuerpo para poderlo usar*/
router.param('id', function(req,res, next , id){
    req.body.id = id;

    next();
}
);

router.param('codigo', function(req,res, next , codigo){
    req.body.codigo = codigo;

    next();
}
);

//para registrar la lista de útiles
router.route('/registrar_lista_utiles')
    .post(
        function(req, res){
            lista_utiles_api.registrar(req, res);
        }
    );

//para obtner las lista por id del centro
router.route('/listar_lista_utiles/:codigo')
        .get(
            function(req, res)
            {
            lista_utiles_api.obtener_todos(req, res);
            }
        );

//para obtener todas las listas de útiles
router.route('/listar_lista_utiles_todos')
.get(
    function(req, res)
    {
    lista_utiles_api.obtener_todos_general(req, res);
    }
);

//para agregar articulos a la lista de útiles 
router.route('/agregar_articulo')
        .post(
            function(req, res)
            {
             lista_utiles_api.agregar_articulos(req, res);
            }
        );

router.route('/buscar_lista_id/:id')
            .get(
                function(req, res)
                {
                lista_utiles_api.buscar_por_id(req, res);
                }
            );

//end point para eliminar articulos de la lista de utiles 
router.route('/eliminar_articulo_lista_utiles')
            .post(
                function(req, res)
                {
                 lista_utiles_api.eliminar_articulo_lista(req, res);
                }
            );

//end point para modificar articulos de la lista de utiles 
router.route('/modificar_articulo_lista_utiles')
            .post(
                function(req, res)
                {
                 lista_utiles_api.modificar_articulo_lista(req, res);
                }
            );

//end point para modificar la lista de utiles 
router.route('/modificar_lista_utiles')
            .post(
                function(req, res)
                {
                 lista_utiles_api.modificar_lista_utiles(req, res);
                }
            );
            
//para activar y desactivar lista de utiles 
router.route('/activar_desactivar_lista_utiles')
            .post(
                function(req, res){
                    lista_utiles_api.activar_desactivar(req,res);
                }
            );

//para eliminar lista de útiles 
router.route('/eliminar_lista_utiles/:id')
            .get(
                function(req, res){
                 lista_utiles_api.eliminar_lista(req, res);
                }
            );

module.exports = router;