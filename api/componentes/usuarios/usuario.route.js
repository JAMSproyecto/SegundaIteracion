'use strict';

const Express = require('express');
const Router = Express.Router();
const UsuarioApi = require('./usuario.api');

Router.route('/obtener_todos_usuarios').get((req, res) => {
    UsuarioApi.obtener_todos_usuarios(req, res);
});

Router.route('/obtener_usuarios_activos').get((req, res) => {
    UsuarioApi.obtener_usuarios_activos(req, res);
});

Router.route('/obtener_usuarios_pendientes').get((req, res) => {
    UsuarioApi.obtener_usuarios_pendientes(req, res);
});

Router.route('/validar_credenciales').post((req, res) => {
    UsuarioApi.validar_credenciales(req, res);
});

module.exports = Router;

 