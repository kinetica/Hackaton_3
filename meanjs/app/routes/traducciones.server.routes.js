'use strict';

/**
 * Module dependencies.
 */
var traducciones = require('../../app/controllers/traducciones.server.controller');

module.exports = function(app) {
	// Traducciones Routes
	/*app.route('/traducciones')
		.get(palabras.list);*/
		/*.post(users.requiresLogin, articles.create)*/

	app.route('/traducciones/:palabraId')
		.get(traducciones.read);
		/*.put(users.requiresLogin, articles.hasAuthorization, articles.update)
		.delete(users.requiresLogin, articles.hasAuthorization, articles.delete)*/

	// Finish by binding the traducciones middleware
	app.param('palabraId', traducciones.traduccionesByPalabraID);
};