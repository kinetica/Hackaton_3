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