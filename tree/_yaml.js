var yaml = require('js-yaml');
var fs   = require('fs');


function parse (file, callback) {

	fs.stat(file, function (err, stats) {
		if (stats.isDirectory()) {
			callback(null, 'dir');
		} else if (stats.isFile()) {

			fs.readFile(file, 'utf-8', function (err, data) {
				if (err) throw err;

				var docs = [];

				try {
					yaml.safeLoadAll(data, function (doc) {
						docs.push(doc);
					});		
				} catch (e) {
					throw e;
				}
				callback(null, docs);
			})
		}
	})
}
	
module.exports = {
	parse: parse
}