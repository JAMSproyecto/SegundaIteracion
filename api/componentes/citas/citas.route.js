'uset strict';
const express = require('express');
const router = express.Router();
const citas_api = require('./citas.api');

/**
 * Parametros
 */
router.param('id', (req, res, next, id) => {
    req.body.id = id;
    next();
});

/**
 * Rutas
 */
router.route('/registrar_cita')
    .post(
        function (req, res) {
            citas_api.registrar(req, res);
        }
    );


router.route('/obtener_citasCentro/:id')
    .get(
        function(req, res){
           citas_api.obtener_citasCentro(req, res);
        }
    )

module.exports = router;