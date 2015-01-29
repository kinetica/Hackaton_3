'use strict';

// Setting up route
angular.module('palabras').config(['$stateProvider',
	function($stateProvider) {
		// Palabras state routing
		$stateProvider.
		state('listPalabras', {
			url: '/palabras',
			templateUrl: 'modules/palabras/views/list-palabras.client.view.html'
		}).
		state('viewPalabra', {
			url: '/palabras/:palabraId',
			templateUrl: 'modules/palabras/views/view-palabra.client.view.html'
		})/*.
		state('createArticle', {
			url: '/articles/create',
			templateUrl: 'modules/articles/views/create-article.client.view.html'
		}).
		state('editArticle', {
			url: '/articles/:articleId/edit',
			templateUrl: 'modules/articles/views/edit-article.client.view.html'
		})*/;
	}
]);