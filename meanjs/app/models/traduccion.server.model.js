'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Traduccion Schema
 */
var TraduccionSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	palabra: {
		type: Schema.ObjectId,
		ref: 'Palabra'
	},
	traduccion: {
		type: String,
		default: '',
		trim: true,
		required: 'Traduccion debe ser completado'
	},
	esCorrecto: {
		type: Boolean,
		default: false
	}
});

mongoose.model('Traduccion', TraduccionSchema);