var express = require('express');
var stormpath = require('express-stormpath');
var consolidate = require('consolidate'); // Templating library adapter for Express
var dbClient = require('mongodb').MongoClient;

var app = express();

app.engine('html', consolidate.swig);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

var stormpathMiddleware = stormpath.init(app, {
  apiKeyFile: './resources/apiKey-2MBU8QFE9GAZZGNURZ47DSC7K.properties',
  application: 'https://api.stormpath.com/v1/applications/3dDvp8NYXLU7Ftu6rn3WbH',
  secretKey: 'some_long_random_string',
  expandCustomData: true,
  enableForgotPassword: true
});

app.use(stormpathMiddleware);

dbClient.connect('mongodb://localhost:27017/happiness', function(err, db) {
    if(err) throw err;

    app.get('/', function(req, res) {
		db.collection('votos').find().toArray(function(err, docs) {
            if(err) throw err;
			
			var votos = [];

            if (docs) {
				votos = docs;
            }
			
			var cantVotos = votos.length;
			for(var i=0; i<cantVotos; i++) {
				var puntaje = votos[i].puntaje;
				votos[i].puntaje = [];
				for(var j=0; j<puntaje; j++) {
					votos[i].puntaje.push(j);
				}
			}

			res.render('index', { votos: votos });
        });
	});

	//app.use('/profile', require('./profile')());

	app.listen(3000);
});

