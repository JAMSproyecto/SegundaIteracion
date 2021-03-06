'use strict';
const Express = require('express');
const Router = Express.Router();
const API = require('./calificacion_padre.api');

/* Este método nos permite buscar un parámetro que viene dentro de la url del endPoint, sacandolo del url y metiendolo en el body para poderlo usar. */
Router.param('id', (req, res, next, parametro) => {
	req.body.id = parametro;
	next();
});

Router.param('idInt', (req, res, next, parametro) => {
	try {
		const n = parseInt(parametro, 10);
		if (isNaN(n)) {
			res.json({
				success: false,
				message: 'El parámetro es inválido'
			});
		} else {
			req.body.id = n;
			next();
		}
	} catch (e) {
		res.json({
			success: false,
			message: 'El parámetro es inválido'
		});
	}
});

//Asignar calificación como padre a un centro educativo:
Router.route('/asignar_calificacion_padre').post((req, res) => {
	API.asignar_calificacion_padre(req.body, res);
});

//buscar la información de calificación por el id:
Router.route('/buscar_calificacion_padre_por_id/:id').get((req, res) => {
	API.buscar_calificacion_padre_por_id(req.body.id, res);
});

//buscar todas las calificaciones de a cuerdo al id del centro educativo:
Router.route('/buscar_calificaciones_padre_por_idCentro/:idInt').get((req, res) => {
	API.buscar_calificaciones_padre_por_idCentro(req.body.id, res);
});

//Obtener todas las calificaciones que están asignadas:
Router.route('/obtener_todas_calificaciones_padre').get((req, res) => {
	API.obtener_todas_calificaciones_padre(req, res);
});

//Recibe el id de la calificación que contiene el comentario que hay que actualizar y el comentario nuevo.
Router.route('/actualizar_comentario_calificacion_padre').post((req, res) => {
	API.actualizar_comentario_calificacion_padre(req.body, res);
});

/*
 * Eliminar comentario (No elimina el comentario, sino que se maneja con la variable eliminado como true).
 * Recibe el id de la calificación que contiene el comentario que hay que eliminar.
*/
Router.route('/eliminar_comentario_calificacion_padre/:id').get((req, res) => {
	API.eliminar_comentario_calificacion_padre(req.body.id, res);
});

/*
 * Por medio del id del centro obtiene la calificación total del ranking de los padres de familia. Es decir, el número de  estrellitas del centro educativo del 1 al 5.
*/
Router.route('/obtener_calificacion_padre_de_centro/:idInt').get((req, res) => {
	API.obtener_calificacion_padre_de_centro(req.body.id, res);
});

module.exports = Router;

