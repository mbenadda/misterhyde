var express = require('express');
var morgan = require('morgan');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var path = require('path');

// Allow for circular dependencies as other modules will need access to app.
var app = module.exports = express();
app.set('port', process.env.PORT || 3001);
// Main app directory, for later use
app.set('maindirectory', __dirname);
app.set('pathToJekyll', './example');

app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(methodOverride()); 
app.use(bodyParser());

var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
    app.use(errorHandler({ dumpExceptions: true, showStack: true }));
}
if ('production' == env) {
    app.use(errorHandler());
}

var duration = new Date();
var site = require('./tree')(app.get('pathToJekyll'), function (err, site) {
	if (err) throw err;
	app.set('jekyll', site)

	console.log('Loaded full Jekyll tree in ' + (new Date() - duration) / 1000 + ' seconds.')
})

var router = require('./router')(app);

// Start the server on specified port
var server = app.listen(app.get('port'), function() {
	console.log('Listening on port %d', server.address().port);
});