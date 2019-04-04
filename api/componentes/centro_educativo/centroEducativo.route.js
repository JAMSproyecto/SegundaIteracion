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

Router.route('/obtener_perfil_centro_educativo/:id').get((req, res) => {
    RegistrarCEduApi.obtener_perfil_centro_educativo(req, res);
});

module.exports = Router;

