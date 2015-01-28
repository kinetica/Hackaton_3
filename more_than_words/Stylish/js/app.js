App = Ember.Application.create();

var languages = [
		{
			id: '1',
			name : 'Español',
			words : [{
				id : '1',
				word : 'perro',
				translation : 'dog'
			},{
				id : '2',
				word : 'gato',
				translation : 'cat'
			}]
		},
		{
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
			},{
				id : '4',
				word : 'duck',
				translation : 'pato'
			},{
				id : '5',
				word : 'food',
				translation : 'comida'
			},{
				id : '6',
				word : 'oven',
				translation : 'horno'
			},{
				id : '7',
				word : 'rain',
				translation : 'lluvia'
			},{
				id : '8',
				word : 'chair',
				translation : 'silla'
			},{
				id : '9',
				word : 'screen',
				translation : 'pantalla'
			},{
				id : '10',
				word : 'mouse',
				translation : 'ratón'
			}
		]
	}
];

App.Router.map(function () {
	this.resource('languages', function(){
		this.resource('language', { path: '/:language_id' });
	});
	
	this.resource('about');
	this.resource('play');
});

App.WordView = Ember.View.extend({
	templateName: "word"
});



Word = Ember.Object.extend({
	word: '', 
	translations: []
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

var currentword = new Word();

App.PlayRoute = Ember.Route.extend({
	model: function(){
		PlayService.nextWord();
		currentword.set("word", PlayService.currentWord.word); 
		currentword.set("translations", PlayService.currentWord.translations); 
		
		return currentword;
	}
});


App.PlayController = Ember.ObjectController.extend({
	result: '',
	actions:{
		test: function(a){
			if(a == PlayService.currentWord.word.translation){
				this.set("result", 'Correct!');
				PlayService.nextWord();
				currentword.set("word", PlayService.currentWord.word); 
				currentword.set("translations", PlayService.currentWord.translations); 
			}else{
				this.set("result", 'Wrong :(');
			
			}
			


		}
	}
});

var PlayService = {};

PlayService.currentLanguage = languages[0];
PlayService.currentIndex = 0;


PlayService.nextWord = function(){
	var word = this.currentLanguage.words[this.currentIndex];
	var currentWord = this.currentLanguage.words[this.currentIndex];
	var maxLength = this.currentLanguage.words.length;
	
	this.getRandomTranslations = function(exclude){
		randomIndex = this.currentIndex;
		
		do{
			randomIndex = Math.round( Math.random(10) * maxLength - 1);
		}while(randomIndex == this.currentIndex);
		
		console.log(randomIndex);
		
		return randomIndex;
	}
	
	var randomIndex1 = this.getRandomTranslations();
	var randomTranslation1 = this.currentLanguage.words[randomIndex1];	
	var randomTranslation2 = this.currentLanguage.words[this.getRandomTranslations(randomIndex1)];

	this.currentIndex++;
	if(this.currentIndex == maxLength) this.currentIndex = 0;
	
	
	var translations = [
		word.translation,
		randomTranslation1.translation,
		randomTranslation2.translation
	];
	
	translations.sort();
	
	
	this.currentWord = { word: word, translations: translations};
	
};



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

	});


Ember.Handlebars.helper('format-markdown', function(input) {
  return new Handlebars.SafeString(showdown.makeHtml(input));
});

Ember.Handlebars.helper('format-date', function(date) {
  return moment(date).fromNow();
});