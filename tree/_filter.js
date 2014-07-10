
var app = require('../app');

// List of blacklisted directories
// Hardcoded for now, should be stored someplace later
var blacklisted = [
		'_site',
		'bower_components',
		'node_modules',
		'Gemfile',
		'Gruntfile.js',
		'package.json',
		'bower.json',
		'.gitignore',
		'.htaccess'
	];


//var regex = /node_modules|bower_components|_site|\/\./

module.exports = function (command) {

	var regex;
	var pathToJekyll = app.get('pathToJekyll');

	pathToJekyll = pathToJekyll.replace('.', '\\.');
	pathToJekyll = pathToJekyll.replace('/', '\\/');

	switch (command) {
		case 'blacklist':
			regex = new RegExp(
				blacklisted.join('|')
				+ '|\\/\\.'
				, '');
			break;

		case '_posts':
			regex = new RegExp(
				pathToJekyll
				+ '\\/\\_posts\\/'
				, '');
			break;
	
	}

	return function (item, callback) {
		if (command === 'blacklist') {
			callback(!regex.test(item));
		} else {
			callback(regex.test(item));
		}
		
	}
}