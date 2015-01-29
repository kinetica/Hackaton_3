'use strict';

/**
 * Module dependencies.
 */
var palabras = require('../../app/controllers/palabras.server.controller');

module.exports = function(app) {
	// Palabras Routes
	app.route('/palabras')
		.get(palabras.list);
		/*.post(users.requiresLogin, articles.create)*/

	app.route('/palabras/:palabraId')
		.get(palabras.read);
		/*.put(users.requiresLogin, articles.hasAuthorization, articles.update)
		.delete(users.requiresLogin, articles.hasAuthorization, articles.delete)*/

	// Finish by binding the palabra middleware
	app.param('palabraId', palabras.palabraByID);
};