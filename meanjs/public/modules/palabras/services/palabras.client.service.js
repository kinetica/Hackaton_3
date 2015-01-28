'use strict';

//Palabras service used for communicating with the palabras REST endpoints
angular.module('palabras').factory('Palabras', ['$resource',
	function($resource) {
		return $resource('palabras/:palabraId', {
			palabraId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);

//Traducciones service used for communicating with the palabras REST endpoints
angular.module('palabras').factory('Traducciones', ['$resource',
	function($resource) {
		return $resource('traducciones/:palabraId', {
			palabraId: '@_id'
		}, 
		{ 'get':  { 
			method: 'GET', 
			isArray: true
			    }
		});
	}
]);

//Respuestas service used for communicating with the palabras REST endpoints
angular.module('palabras').factory('Respuestas', ['$resource',
	function($resource) {
		return $resource('respuestas/:palabraId', {
			palabraId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);