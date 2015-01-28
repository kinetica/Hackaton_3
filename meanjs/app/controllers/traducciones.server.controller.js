'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Traduccion = mongoose.model('Traduccion'),
	_ = require('lodash');

/**
 * Create a article
 */
/*exports.create = function(req, res) {
	var article = new Article(req.body);
	article.user = req.user;

	article.save(function(err) {
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
 * Show the current article
 */
/*exports.read = function(req, res) {
	res.json(req.article);
};*/

/**
 * Update a article
 */
/*exports.update = function(req, res) {
	var article = req.article;

	article = _.extend(article, req.body);

	article.save(function(err) {
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
 * Lista de Traducciones
 */
/*exports.list = function(req, res) {
	Traduccion.find().sort('-created').exec(function(err, traducciones) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(traducciones);
		}
	});
};*/

/**
 * Traduccion middleware
 */
/*exports.traduccionByID = function(req, res, next, id) {

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'Traduccion is invalid'
		});
	}

	Palabra.findById(id).exec(function(err, palabra) {
		if (err) return next(err);
		if (!palabra) {
			return res.status(404).send({
  				message: 'Palabra not found'
  			});
		}
		req.palabra = palabra;
		next();
	});
};*/

exports.traduccionesByPalabraID = function(req, res, next, palabraId) {

	if (!mongoose.Types.ObjectId.isValid(palabraId)) {
		return res.status(400).send({
			message: 'palabra Id is invalid'
		});
	}

	Traduccion.find({ palabra:  mongoose.Types.ObjectId(palabraId)}).exec(function(err, traducciones) {
		if (err) return next(err);
		if (!traducciones) {
			return res.status(404).send({
  				message: 'traducciones not found'
  			});
		}
		req.traducciones = traducciones;
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