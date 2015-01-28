'use strict';

/**
 * Module dependencies.
 */
var respuestas = require('../../app/controllers/respuestas.server.controller');

module.exports = function(app) {
	// respuestas Routes
	app.route('/respuestas')
		/*.get(palabras.list);*/
		.post(respuestas.create);

	/*app.route('/respuestas/:palabraId')
		.get(traducciones.read);*/
		/*.put(users.requiresLogin, articles.hasAuthorization, articles.update)
		.delete(users.requiresLogin, articles.hasAuthorization, articles.delete)*/

	// Finish by binding the traducciones middleware
	/*app.param('palabraId', traducciones.traduccionesByPalabraID);*/
};