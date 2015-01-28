'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Respuesta = mongoose.model('Respuesta'),
	_ = require('lodash');

/**
 * Create a respuesta
 */
exports.create = function(req, res) {
	var respuesta = new Respuesta(req.body);

	respuesta.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(respuesta);
		}
	});
};

/**
 * Show the current respuesta
 */
exports.read = function(req, res) {
	res.json(req.respuesta);
};

/**
 * Update a respuesta
 */
exports.update = function(req, res) {
	var respuesta = req.respuesta;

	respuesta = _.extend(respuesta, req.body);

	respuesta.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(respuesta);
		}
	});
};

/**
 * respuestas correctas por usuario
 */
exports.respuestasPorUsuario = function(req, res) {
	
	Respuesta.find({user: req.user}).populate('palabra').populate('traduccion').exec(function(err, respuestas) {
		if (!respuestas) {
			return res.status(404).send({
  				message: 'respuestas not found'
  			});
		}
		res.json(respuestas);
	});
};

/**
 * Delete an article
 */
/*exports.delete = function(req, res) {
	var article = req.article;

	article.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(article);
		}
	});
};*/

/**
 * List of Articles
 */
/*exports.list = function(req, res) {
	Article.find().sort('-created').populate('user', 'displayName').exec(function(err, articles) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(articles);
		}
	});
};*/

/**
 * Article middleware
 */
exports.respuestaByID = function(req, res, next, id) {

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'respuesta is invalid'
		});
	}

	Respuesta.findById(id).populate('user', 'displayName').populate('palabra').populate('traduccion').exec(function(err, respuesta) {
		if (err) return next(err);
		if (!respuesta) {
			return res.status(404).send({
  				message: 'respuesta not found'
  			});
		}
		req.respuesta = respuesta;
		next();
	});
};

/**
 * Article authorization middleware
 */
/*exports.hasAuthorization = function(req, res, next) {
	if (req.article.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};*/