'use strict';

const Express = require('express');
const Router = Express.Router();
const CEduNivelesApi = require('./CEduNiveles.api');

Router.route('/obtener_todos_niveles_cedu').get((req, res) => {
    CEduNivelesApi.obtener_todos_niveles_cedu(req, res);
});

module.exports = Router;

