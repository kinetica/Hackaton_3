App = Ember.Application.create();

var languages = [{
		id : '3',
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
	this.resource('languages', function(){
		this.resource('language', { path: '/:language_id' });
	});
});

App.WordView= Ember.View.extend({
	templateName: 'word',
});

App.WordController = Ember.ObjectController.extend({
  isEditing: false,
  
  actions: {
    edit: function() {
      this.set('isEditing', true);
    },

    doneEditing: function() {
      this.set('isEditing', false);
    }
  }
});

App.WordRoute = Ember.Route.extend({
	model: function(){
		return {word: 'test', translation: 'prueba'};
	}
});

App.LanguagesRoute = Ember.Route.extend({
	model: function(){
		return languages;
	}
});

App.LanguageRoute = Ember.Route.extend({
	model: function(values){
		var X = languages.filter(function (item){
			return item.id == values.language_id;
		})[0];
		return X;
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
