var express = require('express');
var stormpath = require('express-stormpath');

var app = express();

app.set('views', './views');
app.set('view engine', 'jade');

var stormpathMiddleware = stormpath.init(app, {
  apiKeyFile: './resources/apiKey-2MBU8QFE9GAZZGNURZ47DSC7K.properties',
  application: 'https://api.stormpath.com/v1/applications/3dDvp8NYXLU7Ftu6rn3WbH',
  secretKey: 'some_long_random_string',
  expandCustomData: true,
  enableForgotPassword: true
});

app.use(stormpathMiddleware);

app.get('/', function(req, res) {
  res.render('home', {
    title: 'Welcome'
  });
});

app.use('/profile', require('./profile')());

app.listen(3000);