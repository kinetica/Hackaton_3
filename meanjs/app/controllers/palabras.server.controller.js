'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Palabra = mongoose.model('Palabra'),
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
 * Lista de Palabras
 */
exports.list = function(req, res) {
	Palabra.find().sort('-created').exec(function(err, palabras) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(palabras);
		}
	});
};

/**
 * Palabra middleware
 */
exports.palabraByID = function(req, res, next, id) {

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'Palabra is invalid'
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