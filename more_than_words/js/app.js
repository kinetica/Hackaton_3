App = Ember.Application.create();

var languages = [{
		id : '1',
		name : 'English',
		words : [{
				id : '1',
				word : 'dog',
				translation : 'perro'
			},{
				id : '2',
				word : 'cat',
				translation : 'gato'
			},{
				id : '3',
				word : 'bird',
				translation : 'pájaro'
			}
		]
	}

];

App.Router.map(function () {
	// put your routes here
	
	this.resource('languages', function(){
		this.resource('language');			
	});
});

App.LanguagesRoute = Ember.Route.extend({
	model: function(){
		return languages;
	}
});

App.LanguageRoute = Ember.Route.extend({
	model: function(){
		return '';
	}
});

App.IndexRoute = Ember.Route.extend({
		model : function () {
			return ['red', 'yellow', 'blue'];
		}
	});

// Idiomas tienen palabras
// las palabras tienen una traducción

// inglés => palabras => traducción

// castellano
