'use strict';
const express = require('express');
const router = express.Router();
const registrar_noticia_api = require('./registrar_noticia.api');

router.param('idCentro', function (req, res, next, idCentro) {

    req.body.idCentro = idCentro;
    next();

});


router.route('/registrar_noticia')
    .post(
        function (req, res) {
            registrar_noticia_api.registrar_noticia(req, res);
        }
    );


router.route('/actualizar_noticia')
    .post(
        function (req, res) {
            registrar_noticia_api.actualizar_noticia(req, res);
        }
    );
router.route('/listar_todas_noticias/:idCentro')
    .get(
        function (req, res) {
            registrar_noticia_api.listar_todas_noticias(req, res);
        }
    );



router.route('/buscar_noticia/:idCentro')
    .get(
        function (req, res) {
            registrar_noticia_api.buscar_por_id(req, res);
        }
    );

    router.route('/eliminar_noticia')
    .post(
        function (req, res) {
            registrar_noticia_api.eliminar(req, res);
        }
    );
 
module.exports = router;