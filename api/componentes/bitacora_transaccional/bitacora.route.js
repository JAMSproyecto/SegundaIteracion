'use strict';

const Express = require('express');
const Router = Express.Router();
const BitacoraApi = require('./bitacora.api');

Router.route('/obtener_todos_bitacora').get((req, res) => {
    BitacoraApi.obtener_todos_bitacora(req, res);
});

module.exports = Router;

