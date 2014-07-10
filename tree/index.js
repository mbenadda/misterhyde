var async = require('async');

var traverseDir = require('./_traverseDir');
var branches = require('./branches');
var transform = require('./transform');

function walkTheSite (pathToJekyll, callback) {

	traverseDir(pathToJekyll, function (err, rawDir) {
		if (err) throw err;
		
		// Remove blacklisted dirs and files from the list
		async.filter(rawDir, require('./_filter')('blacklist'), function (index) {
			
			branches.build(index, function (err, site) {
				transform(site);

				callback(null, site);
			});

		})
	})
}

module.exports = walkTheSite;