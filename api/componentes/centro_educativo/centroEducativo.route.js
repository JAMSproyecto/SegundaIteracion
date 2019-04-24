'use strict';
const Express = require('express');
const Router = Express.Router();
const API = require('./centroEducativo.api');

Router.param('id', (req, res, next, parametro) => {
    req.body.id = parametro;
    next();
});

Router.route('/registrar_centro_educativo').post((req, res) => {
    API.registrar_centro_educativo(req, res);
});

Router.route('/obtener_todos_centro_educativo').get((req, res) => {
    API.obtener_todos_centro_educativo(req, res);
});

Router.route('/obtener_centros_educativos_sin_aprobar').get((req, res) => {
    API.obtener_centros_educativos_sin_aprobar(req, res);
});

Router.route('/obtener_centro_por_id/:id').get((req, res) => {
    API.obtener_centro_por_id(req, res);
});

Router.route('/aprobar_centro_educativo/:id').get((req, res) => {
    API.aprobar_centro_educativo(req.body.id, res);
});

module.exports = Router;

