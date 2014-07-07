//var fs = require('fs');
var async = require('async');

var traverseDir = require('./tree/traverseDir');
var blacklist = require('./tree/blacklist');




	


function walkTheWalk (pathToJekyll) {

	traverseDir(pathToJekyll, function (err, rawDir) {
		if (err) throw err;
		async.filter(rawDir, blacklist, function (cleanDir) {
			console.log(cleanDir);
		})
	})

}


walkTheWalk('./example')
