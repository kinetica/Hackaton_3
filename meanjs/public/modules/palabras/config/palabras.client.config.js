'use strict';

// Configuring the Palabras module
angular.module('palabras').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Palabras', 'palabras', 'dropdown', '/palabras'); //'/articles(/create)?'
		Menus.addSubMenuItem('topbar', 'palabras', 'Listar Palabras', 'palabras');
		//Menus.addSubMenuItem('topbar', 'articles', 'New Article', 'articles/create');
	}
]);