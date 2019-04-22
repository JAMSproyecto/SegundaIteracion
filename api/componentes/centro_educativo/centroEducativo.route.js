'use strict';
const Express = require('express');
const Router = Express.Router();
const RegistrarCEduApi = require('./centroEducativo.api');

Router.param('id', (req, res, next, id) => {
    req.body.id = id;
    next();
});

Router.route('/registrar_centro_educativo').post((req, res) => {
    RegistrarCEduApi.registrar_centro_educativo(req, res);
});

Router.route('/obtener_todos_centro_educativo').get((req, res) => {
    RegistrarCEduApi.obtener_todos_centro_educativo(req, res);
});

Router.route('/obtener_centros_educativos_sin_aprobar').get((req, res) => {
    RegistrarCEduApi.obtener_centros_educativos_sin_aprobar(req, res);
});

Router.route('/obtener_centro_por_id/:id').get((req, res) => {
    RegistrarCEduApi.obtener_centro_por_id(req, res);
});

module.exports = Router;

