'use strict';

const Express = require('express');
const Router = Express.Router();
const ValidarCredencialesApi = require('./credenciales.api');

Router.route('/verificar_credenciales').post((req, res) => {
    ValidarCredencialesApi.verificar_credenciales((req.body || {}), res);
});

module.exports = Router;

