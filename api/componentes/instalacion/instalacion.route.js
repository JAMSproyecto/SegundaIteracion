'use strict';

const Express = require('express');
const Router = Express.Router();
const InstalacionApi = require('./instalacion.api');

Router.route('/instalacion').get((req, res) => {
    InstalacionApi.instalacion((req.query.codigo || ''), res);
}).post((req, res) => {
    InstalacionApi.instalacion((req.body.codigo || ''), res);
});

module.exports = Router;

