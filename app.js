
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')

// Add routes below! pt.1
var index = require('./routes/index.js');
var search = require('./routes/search.js');
var saved = require('./routes/saved.js');
var more = require('./routes/more.js');
var login = require('./routes/login.js');
var scale = require('./routes/scale.js');
var register = require('./routes/register.js');

// Example route
// var user = require('./routes/user');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('IxD secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


// Add routes below! pt.2
app.get('/', index.viewStart);
app.get('/a', index.viewStartAlt);

app.get('/home', index.view);
app.get('/homeLogout', index.viewOut);
app.get('/search', search.view);
app.get('/saved', saved.view);
app.get('/more', more.view);
app.post('/morelogin', more.login);
app.get('/login', login.view)
app.get('/scale', scale.view)
app.get('/register', register.view)

app.get('/getData', index.getData);

// A/B Testing
app.get('/home_page_A', index.viewStart);
app.get('/home_page_B', index.viewStartAlt);


// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
