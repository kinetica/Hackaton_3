'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Palabra Schema
 */
var PalabraSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	palabra: {
		type: String,
		default: '',
		trim: true,
		required: 'Palabra debe ser completado'
	}
});

mongoose.model('Palabra', PalabraSchema);