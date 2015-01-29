'use strict';

angular.module('palabras').controller('PalabrasController', ['$scope', '$stateParams', '$location', 'Authentication', 'Palabras', 'Traducciones', 'Respuestas',
	function($scope, $stateParams, $location, Authentication, Palabras, Traducciones, Respuestas) {
		$scope.authentication = Authentication;

		/*$scope.create = function() {
			var article = new Articles({
				title: this.title,
				content: this.content
			});
			article.$save(function(response) {
				$location.path('articles/' + response._id);

				$scope.title = '';
				$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(article) {
			if (article) {
				article.$remove();

				for (var i in $scope.articles) {
					if ($scope.articles[i] === article) {
						$scope.articles.splice(i, 1);
					}
				}
			} else {
				$scope.article.$remove(function() {
					$location.path('articles');
				});
			}
		};

		$scope.update = function() {
			var article = $scope.article;

			article.$update(function() {
				$location.path('articles/' + article._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};*/

		$scope.find = function() {
			$scope.palabras = Palabras.query();
		};

		$scope.findOne = function() {
			$scope.palabra = Palabras.get({
				palabraId: $stateParams.palabraId
			});
			$scope.obtenerTraduccionesParaPalabra();
		};
		
		$scope.obtenerTraduccionesParaPalabra = function() {
			$scope.traducciones = Traducciones.get({
				palabraId: $stateParams.palabraId
			});
		};
		
		$scope.seleccionarTraduccion = function(traduccionId) {
			$scope.traduccionSeleccionada = traduccionId;
		};
		
		$scope.aplicarRespuesta = function() {
			if (!$scope.traduccionSeleccionada){
				console.log('debe seleccionar una traduccion');
				return;
			}
			
			var respuesta = new Respuestas({
				user: $scope.authentication.user._id,
				palabra: $scope.palabra._id,
				traduccion: $scope.traduccionSeleccionada
			});
			
			respuesta.$save(function(response) {
				$location.path('palabras');
			}, function(errorResponse) {
				//$scope.error = errorResponse.data.message;
			});
		};
	}
]);