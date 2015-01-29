'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Respuesta Schema
 */
var RespuestaSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	palabra: {
		type: Schema.ObjectId,
		ref: 'Palabra'
	},
	traduccion: { 
		type: Schema.ObjectId,
		ref: 'Traduccion'
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Respuesta', RespuestaSchema);